from django.db import models

from accounts.models import User
from common.models import BaseModel

from .choices import NotificationType

class Notification(BaseModel):
    """
    Stores system notifications for users.

    Supports in-app notifications, email tracking,
    and future push notification integration.
    """

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications",
        verbose_name="User",
    )

    title = models.CharField(
        max_length=255,
        verbose_name="Notification Title",
    )

    message = models.TextField(
        verbose_name="Notification Message",
    )

    notification_type = models.CharField(
        max_length=30,
        choices=NotificationType.choices,
        default=NotificationType.SYSTEM,
        verbose_name="Notification Type",
    )

    is_read = models.BooleanField(
        default=False,
        verbose_name="Read",
    )

    sent_email = models.BooleanField(
        default=False,
        verbose_name="Email Sent",
    )

    sent_at = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name="Sent At",
    )

    read_at = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name="Read At",
    )

    class Meta:
        db_table = "notifications"
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.email} - {self.title}"