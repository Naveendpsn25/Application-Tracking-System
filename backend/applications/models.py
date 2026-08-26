from django.db import models

from candidates.models import CandidateProfile
from common.models import BaseModel
from jobs.models import Job

from .choices import ApplicationSource, ApplicationStatus

class Application(BaseModel):
    """
    Stores a candidate's application for a specific job.

    Acts as the central entity connecting candidates, jobs,
    interviews, offers, and the overall recruitment workflow.
    """

    candidate = models.ForeignKey(
        CandidateProfile,
        on_delete=models.CASCADE,
        related_name="applications",
        verbose_name="Candidate",
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications",
        verbose_name="Job",
    )

    application_number = models.CharField(
        max_length=30,
        unique=True,
        verbose_name="Application Number",
    )

    applied_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Applied At",
    )

    application_status = models.CharField(
        max_length=30,
        choices=ApplicationStatus.choices,
        default=ApplicationStatus.APPLIED,
        verbose_name="Application Status",
    )

    source = models.CharField(
        max_length=30,
        choices=ApplicationSource.choices,
        default=ApplicationSource.COMPANY_PORTAL,
        verbose_name="Application Source",
    )

    cover_letter = models.TextField(
        blank=True,
        null=True,
        verbose_name="Cover Letter",
    )

    resume_snapshot = models.FileField(
        upload_to="applications/resumes/",
        blank=True,
        null=True,
        verbose_name="Resume Snapshot",
    )

    recruiter_notes = models.TextField(
        blank=True,
        null=True,
        verbose_name="Recruiter Notes",
    )

    rejection_reason = models.TextField(
        blank=True,
        null=True,
        verbose_name="Rejection Reason",
    )

    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        blank=True,
        null=True,
        verbose_name="Recruiter Rating",
    )

    is_shortlisted = models.BooleanField(
        default=False,
        verbose_name="Shortlisted",
    )

    class Meta:
        db_table = "applications"
        verbose_name = "Application"
        verbose_name_plural = "Applications"
        ordering = ["-applied_at"]

        constraints = [
            models.UniqueConstraint(
                fields=["candidate", "job"],
                name="unique_candidate_job_application",
            )
        ]

    def __str__(self):
        return f"{self.application_number} - {self.candidate.user.get_full_name()}"