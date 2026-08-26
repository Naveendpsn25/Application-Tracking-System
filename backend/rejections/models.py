from django.db import models

from accounts.models import User
from applications.models import Application
from common.models import BaseModel
from .choices import RejectionReason, RejectionStage

class Rejection(BaseModel):
    """
    Stores the rejection details for an application.
    """

    application = models.OneToOneField(
        Application,
        on_delete=models.CASCADE,
        related_name="rejection",
        verbose_name="Application",
    )

    rejected_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="rejections",
        verbose_name="Rejected By",
    )

    rejection_stage = models.CharField(
        max_length=30,
        choices=RejectionStage.choices,
        verbose_name="Rejection Stage",
    )

    rejection_reason = models.CharField(
        max_length=255,
        choices=RejectionReason.choices,
        verbose_name="Rejection Reason",
    )

    feedback = models.TextField(
        blank=True,
        null=True,
        verbose_name="Feedback",
        help_text="Optional feedback visible to the candidate.",
    )

    email_sent = models.BooleanField(
        default=False,
        verbose_name="Email Sent",
    )

    rejected_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Rejected At",
    )

    class Meta:
        db_table = "rejections"
        verbose_name = "Rejection"
        verbose_name_plural = "Rejections"
        ordering = ["-rejected_at"]

    def __str__(self):
        return (
            f"{self.application.application_number} - "
            f"{self.rejection_reason}"
        )