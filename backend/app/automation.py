from __future__ import annotations

from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from .models import AutomationJob, Lead, MessageLog


FOLLOWUP_PLAN = (
    ("d1", timedelta(days=1)),
    ("d3", timedelta(days=3)),
    ("d7", timedelta(days=7)),
)


def schedule_followups(db: Session, lead: Lead) -> None:
    if lead.is_spam:
        return

    now = datetime.utcnow()
    for job_type, offset in FOLLOWUP_PLAN:
        exists = (
            db.query(AutomationJob)
            .filter(AutomationJob.lead_id == lead.id, AutomationJob.job_type == job_type)
            .first()
        )
        if exists:
            continue
        db.add(
            AutomationJob(
                lead_id=lead.id,
                job_type=job_type,
                run_at=now + offset,
                state="queued",
            )
        )


def process_due_jobs(db: Session, now: datetime | None = None) -> int:
    now = now or datetime.utcnow()
    jobs = (
        db.query(AutomationJob)
        .filter(AutomationJob.state == "queued", AutomationJob.run_at <= now)
        .order_by(AutomationJob.run_at.asc())
        .all()
    )
    processed = 0
    for job in jobs:
        lead = db.query(Lead).filter(Lead.id == job.lead_id).first()
        if not lead or lead.status in {"won", "lost"} or lead.is_spam:
            job.state = "skipped"
            processed += 1
            continue

        # Skeleton only: we log what would be sent.
        db.add(
            MessageLog(
                lead_id=lead.id,
                channel="email",
                template_key=job.job_type,
                scheduled_for=job.run_at,
                sent_at=now,
                delivery_status="queued",
            )
        )
        if lead.consent_sms_email and lead.mobile_phone:
            db.add(
                MessageLog(
                    lead_id=lead.id,
                    channel="sms",
                    template_key=job.job_type,
                    scheduled_for=job.run_at,
                    sent_at=now,
                    delivery_status="queued",
                )
            )

        job.state = "completed"
        processed += 1
    return processed
