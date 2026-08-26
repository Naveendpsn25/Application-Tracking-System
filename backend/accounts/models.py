from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from common.models import BaseModel

from .choices import UserRole
from .managers import UserManager

from django.conf import settings
from django.utils import timezone

from .otp_choices import OTPType

class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    """
    Stores authentication and basic profile information for all users.

    This custom user model is used for Super Admins, Recruiters,
    and Candidates across the TalentBridge ATS.
    """

    email = models.EmailField(
        unique=True,
        verbose_name="Email Address",
    )

    first_name = models.CharField(
        max_length=100,
        verbose_name="First Name",
    )

    last_name = models.CharField(
        max_length=100,
        verbose_name="Last Name",
    )

    phone_number = models.CharField(
        max_length=15,
        unique=True,
        verbose_name="Phone Number",
    )

    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.CANDIDATE,
        verbose_name="User Role",
    )

    is_verified = models.BooleanField(
        default=False,
        verbose_name="Email Verified",
    )

    is_approved = models.BooleanField(
        default=True,
        verbose_name="Admin Approved",
    )

    is_staff = models.BooleanField(
        default=False,
        verbose_name="Staff Status",
    )

    objects = UserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "phone_number",
    ]

    class Meta:
        db_table = "users"
        verbose_name = "User"
        verbose_name_plural = "Users"
        ordering = ["-created_at"]

    def __str__(self):
        return self.email



class OTP(BaseModel):
    """
    Stores one-time passwords used for user registration
    and forgot password verification.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="otps",
        verbose_name="User",
    )

    otp = models.CharField(
        max_length=6,
        verbose_name="OTP",
    )

    otp_type = models.CharField(
        max_length=30,
        choices=OTPType.choices,
        verbose_name="OTP Type",
    )

    expires_at = models.DateTimeField(
        verbose_name="Expires At",
    )

    is_used = models.BooleanField(
        default=False,
        verbose_name="Is Used",
    )

    class Meta:
        db_table = "otp"
        verbose_name = "OTP"
        verbose_name_plural = "OTPs"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.email} - {self.otp_type}"