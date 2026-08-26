from django.db import models


class RejectionStage(models.TextChoices):
    """
    Defines the stage at which the candidate was rejected.
    """

    APPLICATION_REVIEW = "APPLICATION_REVIEW", "Application Review"
    HR_SCREENING = "HR_SCREENING", "HR Screening"
    TECHNICAL_INTERVIEW = "TECHNICAL_INTERVIEW", "Technical Interview"
    MANAGERIAL_INTERVIEW = "MANAGERIAL_INTERVIEW", "Managerial Interview"
    FINAL_INTERVIEW = "FINAL_INTERVIEW", "Final Interview"
    OFFER_STAGE = "OFFER_STAGE", "Offer Stage"


class RejectionReason(models.TextChoices):
    """
    Defines the standard rejection reasons.
    """

    SKILLS_MISMATCH = "SKILLS_MISMATCH", "Skills Mismatch"
    EXPERIENCE_MISMATCH = "EXPERIENCE_MISMATCH", "Experience Mismatch"
    EDUCATION_MISMATCH = "EDUCATION_MISMATCH", "Education Mismatch"
    COMMUNICATION_SKILLS = "COMMUNICATION_SKILLS", "Communication Skills"
    TECHNICAL_KNOWLEDGE = "TECHNICAL_KNOWLEDGE", "Technical Knowledge"
    CULTURAL_FIT = "CULTURAL_FIT", "Cultural Fit"
    SALARY_EXPECTATION = "SALARY_EXPECTATION", "Salary Expectation"
    POSITION_FILLED = "POSITION_FILLED", "Position Filled"
    CANDIDATE_WITHDREW = "CANDIDATE_WITHDREW", "Candidate Withdrew"
    OTHER = "OTHER", "Other"