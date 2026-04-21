from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class LeadCreate(BaseModel):
    lead_type: str = Field(default="quote", min_length=3, max_length=40)
    full_name: str = Field(min_length=2, max_length=120)
    business_name: Optional[str] = Field(default=None, max_length=150)
    email: EmailStr
    mobile_phone: Optional[str] = Field(default=None, max_length=30)

    service_interest: Optional[str] = Field(default=None, max_length=100)
    monthly_plan_interest: Optional[str] = Field(default=None, max_length=100)
    budget_range: Optional[str] = Field(default=None, max_length=50)
    timeline: Optional[str] = Field(default=None, max_length=50)
    primary_goal: Optional[str] = Field(default=None, max_length=120)
    preferred_contact: Optional[str] = Field(default=None, max_length=20)
    website_url: Optional[str] = Field(default=None, max_length=255)
    notes: Optional[str] = Field(default=None, max_length=5000)

    utm_source: Optional[str] = Field(default=None, max_length=100)
    utm_medium: Optional[str] = Field(default=None, max_length=100)
    utm_campaign: Optional[str] = Field(default=None, max_length=150)
    landing_page: Optional[str] = Field(default=None, max_length=255)
    referrer: Optional[str] = Field(default=None, max_length=255)

    consent_sms_email: bool = False
    website_field: Optional[str] = Field(default=None, max_length=120)


class LeadOut(BaseModel):
    id: int
    created_at: datetime
    lead_type: str
    status: str
    score: int
    tag: str
    full_name: str
    business_name: Optional[str]
    email: EmailStr
    mobile_phone: Optional[str]

    class Config:
        from_attributes = True


class LeadStatusUpdate(BaseModel):
    status: str = Field(min_length=2, max_length=20)


class PipelineSummary(BaseModel):
    total: int
    new: int
    hot: int
    warm: int
    cold: int
    spam: int


class PipelineResponse(BaseModel):
    items: list[LeadOut]
    page: int
    page_size: int
    total: int
    summary: PipelineSummary
