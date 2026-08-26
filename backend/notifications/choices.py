from django.db import models


class NotificationType(models.TextChoices):
    """
    Defines the different categories of system notifications.
    """

    SYSTEM = "SYSTEM", "System"
    ACCOUNT = "ACCOUNT", "Account"
    JOB = "JOB", "Job"
    APPLICATION = "APPLICATION", "Application"
    INTERVIEW = "INTERVIEW", "Interview"
    OFFER = "OFFER", "Offer"
    OTP = "OTP", "OTP"
    PASSWORD = "PASSWORD", "Password"
    EMAIL = "EMAIL", "Email"