from django.db import models

from accounts.models import User
from common.models import BaseModel

from .choices import AuditAction, AuditModule

class AuditLog(BaseModel):
    """
    Stores an immutable history of important user actions.

    Supports security auditing, compliance,
    and activity tracking across the TalentBridge ATS.
    """

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="audit_logs",
        verbose_name="User",
    )

    action = models.CharField(
        max_length=30,
        choices=AuditAction.choices,
        verbose_name="Action",
    )

    module = models.CharField(
        max_length=50,
        choices=AuditModule.choices,
        verbose_name="Module",
    )

    object_id = models.UUIDField(
        blank=True,
        null=True,
        verbose_name="Object ID",
    )

    object_name = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Object Name",
    )

    description = models.TextField(
        verbose_name="Description",
    )

    ip_address = models.GenericIPAddressField(
        blank=True,
        null=True,
        verbose_name="IP Address",
    )

    user_agent = models.TextField(
        blank=True,
        null=True,
        verbose_name="User Agent",
    )

    class Meta:
        db_table = "audit_logs"
        verbose_name = "Audit Log"
        verbose_name_plural = "Audit Logs"
        ordering = ["-created_at"]

    def __str__(self):
        return (
            f"{self.user.email if self.user else 'System'} - "
            f"{self.action} - {self.module}"
        )