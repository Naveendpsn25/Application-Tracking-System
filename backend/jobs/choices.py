from django.db import models


class EmploymentType(models.TextChoices):
    """
    Defines supported employment types.
    """

    FULL_TIME = "FULL_TIME", "Full Time"
    PART_TIME = "PART_TIME", "Part Time"
    CONTRACT = "CONTRACT", "Contract"
    INTERNSHIP = "INTERNSHIP", "Internship"
    FREELANCE = "FREELANCE", "Freelance"


class WorkplaceType(models.TextChoices):
    """
    Defines supported workplace types.
    """

    ON_SITE = "ON_SITE", "On-site"
    HYBRID = "HYBRID", "Hybrid"
    REMOTE = "REMOTE", "Remote"


class ExperienceLevel(models.TextChoices):
    """
    Defines supported experience levels.
    """

    FRESHER = "FRESHER", "Fresher"
    JUNIOR = "JUNIOR", "Junior"
    MID_LEVEL = "MID_LEVEL", "Mid-Level"
    SENIOR = "SENIOR", "Senior"
    LEAD = "LEAD", "Lead"


class JobStatus(models.TextChoices):
    """
    Defines the lifecycle status of a job posting.
    """

    DRAFT = "DRAFT", "Draft"
    OPEN = "OPEN", "Open"
    CLOSED = "CLOSED", "Closed"
    FILLED = "FILLED", "Filled"
    CANCELLED = "CANCELLED", "Cancelled"