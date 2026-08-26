from django.db import models

from common.models import BaseModel
from companies.models import Company
from recruiters.models import RecruiterProfile

from .choices import (EmploymentType,ExperienceLevel,JobStatus,WorkplaceType)

class Job(BaseModel):
    """
    Stores job openings posted by recruiters for their companies.

    Candidates apply to these jobs and progress through the recruitment pipeline.
    """

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs",
        verbose_name="Company",
    )

    recruiter = models.ForeignKey(
        RecruiterProfile,
        on_delete=models.CASCADE,
        related_name="jobs",
        verbose_name="Recruiter",
    )

    job_title = models.CharField(
        max_length=255,
        verbose_name="Job Title",
    )

    job_code = models.CharField(
        max_length=30,
        unique=True,
        verbose_name="Job Code",
    )

    employment_type = models.CharField(
        max_length=30,
        choices=EmploymentType.choices,
        verbose_name="Employment Type",
    )

    workplace_type = models.CharField(
        max_length=30,
        choices=WorkplaceType.choices,
        verbose_name="Workplace Type",
    )

    experience_level = models.CharField(
        max_length=30,
        choices=ExperienceLevel.choices,
        verbose_name="Experience Level",
    )

    minimum_experience = models.PositiveIntegerField(
        default=0,
        verbose_name="Minimum Experience",
    )

    maximum_experience = models.PositiveIntegerField(
        default=0,
        verbose_name="Maximum Experience",
    )

    minimum_salary = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        blank=True,
        null=True,
        verbose_name="Minimum Salary",
    )

    maximum_salary = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        blank=True,
        null=True,
        verbose_name="Maximum Salary",
    )

    currency = models.CharField(
        max_length=10,
        default="INR",
        verbose_name="Currency",
    )

    vacancies = models.PositiveIntegerField(
        default=1,
        verbose_name="Vacancies",
    )

    location = models.CharField(
        max_length=150,
        verbose_name="Job Location",
    )

    required_skills = models.TextField(
        verbose_name="Required Skills",
    )

    qualification = models.CharField(
        max_length=100,
        verbose_name="Minimum Qualification",
    )

    job_description = models.TextField(
        verbose_name="Job Description",
    )

    responsibilities = models.TextField(
        blank=True,
        null=True,
        verbose_name="Responsibilities",
    )

    application_deadline = models.DateField(
        blank=True,
        null=True,
        verbose_name="Application Deadline",
    )

    status = models.CharField(
        max_length=20,
        choices=JobStatus.choices,
        default=JobStatus.DRAFT,
        verbose_name="Job Status",
    )

    published_at = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name="Published At",
    )

    is_featured = models.BooleanField(
        default=False,
        verbose_name="Featured Job",
    )

    class Meta:
        db_table = "jobs"
        verbose_name = "Job"
        verbose_name_plural = "Jobs"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.job_title} ({self.company.company_name})"