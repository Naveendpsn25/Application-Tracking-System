from django.db import models


class ApplicationStatus(models.TextChoices):
    """
    Defines the recruitment lifecycle stages of a job application.
    """

    APPLIED = "APPLIED", "Applied"
    SCREENING = "SCREENING", "Screening"
    SHORTLISTED = "SHORTLISTED", "Shortlisted"
    INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED", "Interview Scheduled"
    INTERVIEW_COMPLETED = "INTERVIEW_COMPLETED", "Interview Completed"
    OFFER_RELEASED = "OFFER_RELEASED", "Offer Released"
    HIRED = "HIRED", "Hired"
    REJECTED = "REJECTED", "Rejected"
    WITHDRAWN = "WITHDRAWN", "Withdrawn"
    OFFER_DECLINED = "OFFER_DECLINED", "Offer Declined"


class ApplicationSource(models.TextChoices):
    """
    Defines how the candidate applied for the job.
    """

    COMPANY_PORTAL = "COMPANY_PORTAL", "Company Portal"
    LINKEDIN = "LINKEDIN", "LinkedIn"
    INDEED = "INDEED", "Indeed"
    NAUKRI = "NAUKRI", "Naukri"
    REFERRAL = "REFERRAL", "Employee Referral"
    CAMPUS = "CAMPUS", "Campus Placement"
    WALK_IN = "WALK_IN", "Walk-in"
    OTHER = "OTHER", "Other"