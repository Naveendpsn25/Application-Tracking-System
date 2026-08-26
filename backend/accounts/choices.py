from django.db import models


class UserRole(models.TextChoices):
    """
    Defines the available user roles in the TalentBridge ATS.
    """

    SUPER_ADMIN = "SUPER_ADMIN", "Super Admin"
    RECRUITER = "RECRUITER", "Recruiter"
    CANDIDATE = "CANDIDATE", "Candidate"