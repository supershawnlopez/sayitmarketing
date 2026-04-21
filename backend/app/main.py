from __future__ import annotations

import os
import secrets
from datetime import datetime

from fastapi import Depends, FastAPI, HTTPException, Query, Request, status
from fastapi.responses import HTMLResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from .automation import process_due_jobs, schedule_followups
from .database import Base, engine, get_db
from .models import Lead
from .schemas import LeadCreate, LeadOut, LeadStatusUpdate, PipelineResponse, PipelineSummary
from .scoring import score_lead, tag_for_score

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SayIt Lead API", version="0.1.0")
security = HTTPBasic()

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "change-me")
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*")
cors_origins = [origin.strip() for origin in ALLOWED_ORIGINS.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


def require_admin(credentials: HTTPBasicCredentials = Depends(security)) -> str:
    user_ok = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    pass_ok = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (user_ok and pass_ok):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username


@app.post("/api/leads", response_model=LeadOut, status_code=status.HTTP_201_CREATED)
def create_lead(payload: LeadCreate, request: Request, db: Session = Depends(get_db)) -> Lead:
    is_spam = False
    spam_reason = None
    if payload.website_field:
        is_spam = True
        spam_reason = "honeypot"

    lead_score = score_lead(payload)
    lead_tag = "spam" if is_spam else tag_for_score(lead_score)
    consent_at = datetime.utcnow() if payload.consent_sms_email else None
    client_ip = request.client.host if request.client else None

    record = Lead(
        lead_type=payload.lead_type.lower(),
        status="new",
        score=lead_score,
        tag=lead_tag,
        is_spam=is_spam,
        spam_reason=spam_reason,
        full_name=payload.full_name.strip(),
        business_name=payload.business_name,
        email=str(payload.email).lower(),
        mobile_phone=payload.mobile_phone,
        service_interest=payload.service_interest,
        monthly_plan_interest=payload.monthly_plan_interest,
        budget_range=payload.budget_range,
        timeline=payload.timeline,
        primary_goal=payload.primary_goal,
        preferred_contact=payload.preferred_contact,
        website_url=payload.website_url,
        notes=payload.notes,
        utm_source=payload.utm_source,
        utm_medium=payload.utm_medium,
        utm_campaign=payload.utm_campaign,
        landing_page=payload.landing_page,
        referrer=payload.referrer,
        consent_sms_email=payload.consent_sms_email,
        consent_at=consent_at,
        consent_ip=client_ip,
        status_updated_at=datetime.utcnow(),
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    schedule_followups(db, record)
    db.commit()
    return record


@app.patch("/api/leads/{lead_id}/status", response_model=LeadOut)
def update_lead_status(
    lead_id: int,
    payload: LeadStatusUpdate,
    db: Session = Depends(get_db),
    _: str = Depends(require_admin),
) -> Lead:
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")
    lead.status = payload.status.lower().strip()
    lead.status_updated_at = datetime.utcnow()
    db.commit()
    db.refresh(lead)
    return lead


@app.get("/api/pipeline", response_model=PipelineResponse)
def get_pipeline(
    status_filter: str | None = Query(default=None, alias="status"),
    tag: str | None = Query(default=None),
    lead_type: str | None = Query(default=None),
    q: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=25, ge=1, le=100),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin),
) -> PipelineResponse:
    query = db.query(Lead)

    if status_filter:
        query = query.filter(Lead.status == status_filter.lower().strip())
    if tag:
        query = query.filter(Lead.tag == tag.lower().strip())
    if lead_type:
        query = query.filter(Lead.lead_type == lead_type.lower().strip())
    if q:
        term = f"%{q.strip()}%"
        query = query.filter(
            or_(Lead.full_name.ilike(term), Lead.email.ilike(term), Lead.business_name.ilike(term))
        )

    total = query.count()
    items = (
        query.order_by(Lead.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    summary_rows = db.query(Lead.tag, func.count(Lead.id)).group_by(Lead.tag).all()
    tag_counts = {row[0]: row[1] for row in summary_rows}
    summary = PipelineSummary(
        total=db.query(func.count(Lead.id)).scalar() or 0,
        new=db.query(func.count(Lead.id)).filter(Lead.status == "new").scalar() or 0,
        hot=tag_counts.get("hot", 0),
        warm=tag_counts.get("warm", 0),
        cold=tag_counts.get("cold", 0),
        spam=tag_counts.get("spam", 0),
    )
    return PipelineResponse(items=items, page=page, page_size=page_size, total=total, summary=summary)


@app.post("/api/automation/run-due")
def run_due_jobs(
    db: Session = Depends(get_db), _: str = Depends(require_admin)
) -> dict[str, int]:
    processed = process_due_jobs(db)
    db.commit()
    return {"processed": processed}


@app.get("/admin/leads", response_class=HTMLResponse)
def admin_leads(
    status_filter: str | None = Query(default=None, alias="status"),
    tag: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=25, ge=1, le=100),
    db: Session = Depends(get_db),
    _: str = Depends(require_admin),
) -> HTMLResponse:
    query = db.query(Lead)
    if status_filter:
        query = query.filter(Lead.status == status_filter.lower().strip())
    if tag:
        query = query.filter(Lead.tag == tag.lower().strip())
    leads = (
        query.order_by(Lead.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    rows = []
    for lead in leads:
        rows.append(
            f"<tr>"
            f"<td>{lead.created_at:%Y-%m-%d %H:%M}</td>"
            f"<td>{lead.full_name}</td>"
            f"<td>{lead.email}</td>"
            f"<td>{lead.mobile_phone or ''}</td>"
            f"<td>{lead.lead_type}</td>"
            f"<td>{lead.score}</td>"
            f"<td>{lead.tag}</td>"
            f"<td>{lead.status}</td>"
            f"</tr>"
        )

    html = f"""
    <html>
      <head>
        <title>Leads Admin</title>
        <style>
          body{{font-family:Arial,sans-serif;padding:20px}}
          table{{border-collapse:collapse;width:100%}}
          th,td{{border:1px solid #ddd;padding:8px;font-size:14px}}
          th{{background:#f4f4f4;text-align:left}}
          .filters a{{margin-right:10px}}
        </style>
      </head>
      <body>
        <h1>Leads</h1>
        <div class="filters">
          <a href="/admin/leads">All</a>
          <a href="/admin/leads?status=new">New</a>
          <a href="/admin/leads?tag=hot">Hot</a>
          <a href="/admin/leads?tag=warm">Warm</a>
          <a href="/admin/leads?tag=cold">Cold</a>
          <a href="/admin/leads?tag=spam">Spam</a>
        </div>
        <table>
          <thead>
            <tr><th>Created</th><th>Name</th><th>Email</th><th>Phone</th><th>Type</th><th>Score</th><th>Tag</th><th>Status</th></tr>
          </thead>
          <tbody>
            {''.join(rows) if rows else '<tr><td colspan="8">No leads found.</td></tr>'}
          </tbody>
        </table>
      </body>
    </html>
    """
    return HTMLResponse(content=html)
