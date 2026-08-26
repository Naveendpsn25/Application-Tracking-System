from django.db import models


class OTPType(models.TextChoices):
    """
    Defines the different OTP verification purposes.
    """

    REGISTRATION = "REGISTRATION", "Registration"
    FORGOT_PASSWORD = "FORGOT_PASSWORD", "Forgot Password"