from django.db import models

from applications.models import Application
from common.models import BaseModel

from .choices import (InterviewMode,InterviewRound,InterviewStatus,Recommendation)


class Interview(BaseModel):
    """
    Stores interview schedules and evaluation details for a candidate.

    Supports multiple interview rounds for a single application
    and tracks the interview outcome.
    """

    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE,
        related_name="interviews",
        verbose_name="Application",
    )

    interview_round = models.CharField(
        max_length=30,
        choices=InterviewRound.choices,
        verbose_name="Interview Round",
    )

    interviewer_name = models.CharField(
        max_length=255,
        verbose_name="Interviewer Name",
    )

    interviewer_email = models.EmailField(
        blank=True,
        null=True,
        verbose_name="Interviewer Email",
    )

    scheduled_date = models.DateField(
        verbose_name="Scheduled Date",
    )

    scheduled_time = models.TimeField(
        verbose_name="Scheduled Time",
    )

    interview_mode = models.CharField(
        max_length=20,
        choices=InterviewMode.choices,
        verbose_name="Interview Mode",
    )

    meeting_link = models.URLField(
        blank=True,
        null=True,
        verbose_name="Meeting Link",
    )

    venue = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Interview Venue",
    )

    interview_status = models.CharField(
        max_length=30,
        choices=InterviewStatus.choices,
        default=InterviewStatus.SCHEDULED,
        verbose_name="Interview Status",
    )

    interviewer_feedback = models.TextField(
        blank=True,
        null=True,
        verbose_name="Interviewer Feedback",
    )

    interviewer_rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        blank=True,
        null=True,
        verbose_name="Interviewer Rating",
    )

    recommendation = models.CharField(
        max_length=30,
        choices=Recommendation.choices,
        blank=True,
        null=True,
        verbose_name="Recommendation",
    )
    
    completed_at = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name="Completed At",
    )

    class Meta:
        db_table = "interviews"
        verbose_name = "Interview"
        verbose_name_plural = "Interviews"
        ordering = ["scheduled_date", "scheduled_time"]

    def __str__(self):
        return (
            f"{self.application.application_number} - "
            f"{self.interview_round}"
        )