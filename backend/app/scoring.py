from __future__ import annotations

from .schemas import LeadCreate


def score_lead(payload: LeadCreate) -> int:
    score = 0

    budget_map = {"2500+": 30, "1000-2500": 20}
    timeline_map = {"asap": 25, "2-4 weeks": 15}

    if payload.budget_range:
        score += budget_map.get(payload.budget_range.strip().lower(), 0)

    if payload.timeline:
        score += timeline_map.get(payload.timeline.strip().lower(), 0)

    if payload.lead_type.lower() in {"checkout", "start-now"}:
        score += 30

    if payload.service_interest and "website" in payload.service_interest.lower():
        if payload.monthly_plan_interest and "hosting + care" in payload.monthly_plan_interest.lower():
            score += 20

    if payload.mobile_phone and payload.consent_sms_email:
        score += 10

    if not payload.budget_range or not payload.timeline:
        score -= 15

    return score


def tag_for_score(score: int) -> str:
    if score >= 70:
        return "hot"
    if score >= 40:
        return "warm"
    return "cold"
