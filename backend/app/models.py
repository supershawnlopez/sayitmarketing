from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)
    lead_type: Mapped[str] = mapped_column(String(40), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="new", index=True)
    score: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    tag: Mapped[str] = mapped_column(String(20), nullable=False, default="cold", index=True)
    is_spam: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False, index=True)
    spam_reason: Mapped[str] = mapped_column(String(120), nullable=True)

    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    business_name: Mapped[str] = mapped_column(String(150), nullable=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    mobile_phone: Mapped[str] = mapped_column(String(30), nullable=True)

    service_interest: Mapped[str] = mapped_column(String(100), nullable=True)
    monthly_plan_interest: Mapped[str] = mapped_column(String(100), nullable=True)
    budget_range: Mapped[str] = mapped_column(String(50), nullable=True)
    timeline: Mapped[str] = mapped_column(String(50), nullable=True)
    primary_goal: Mapped[str] = mapped_column(String(120), nullable=True)
    preferred_contact: Mapped[str] = mapped_column(String(20), nullable=True)
    website_url: Mapped[str] = mapped_column(String(255), nullable=True)
    notes: Mapped[str] = mapped_column(Text, nullable=True)

    utm_source: Mapped[str] = mapped_column(String(100), nullable=True)
    utm_medium: Mapped[str] = mapped_column(String(100), nullable=True)
    utm_campaign: Mapped[str] = mapped_column(String(150), nullable=True)
    landing_page: Mapped[str] = mapped_column(String(255), nullable=True)
    referrer: Mapped[str] = mapped_column(String(255), nullable=True)

    consent_sms_email: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    consent_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    consent_ip: Mapped[str] = mapped_column(String(64), nullable=True)
    status_updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)


class AutomationJob(Base):
    __tablename__ = "automation_jobs"
    __table_args__ = (UniqueConstraint("lead_id", "job_type", name="uq_job_lead_type"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("leads.id"), nullable=False, index=True)
    job_type: Mapped[str] = mapped_column(String(20), nullable=False, index=True)
    run_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, index=True)
    state: Mapped[str] = mapped_column(String(20), nullable=False, default="queued", index=True)
    attempts: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    last_error: Mapped[str] = mapped_column(Text, nullable=True)


class MessageLog(Base):
    __tablename__ = "message_logs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    lead_id: Mapped[int] = mapped_column(ForeignKey("leads.id"), nullable=False, index=True)
    channel: Mapped[str] = mapped_column(String(20), nullable=False)
    template_key: Mapped[str] = mapped_column(String(40), nullable=False)
    scheduled_for: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    sent_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    delivery_status: Mapped[str] = mapped_column(String(20), nullable=False, default="queued", index=True)
    provider_id: Mapped[str] = mapped_column(String(120), nullable=True)
    error: Mapped[str] = mapped_column(Text, nullable=True)
