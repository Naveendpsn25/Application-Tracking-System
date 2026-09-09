from django.db import models

from accounts.models import User
from common.models import BaseModel
from companies.models import Company
from .choices import Department, Designation

class RecruiterProfile(BaseModel):
    """
    Stores recruiter-specific information for users with the Recruiter role.

    Each recruiter belongs to one company and manages job postings and candidates.
    """

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="recruiter_profile",
        verbose_name="User",
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="recruiters",
        verbose_name="Company",
    )

    employee_id = models.CharField(
        max_length=50,
        unique=True,
        verbose_name="Employee ID",
    )

    designation = models.CharField(
        max_length=100,
        choices=Designation.choices,
        verbose_name="Designation",
    )

    department = models.CharField(
        max_length=100,
        choices=Department.choices,
        verbose_name="Department",
    )

    profile_image = models.ImageField(
        upload_to="recruiters/profile_images/",
        blank=True,
        null=True,
        verbose_name="Profile Image",
    )

    linkedin_url = models.URLField(
        blank=True,
        null=True,
        verbose_name="LinkedIn Profile",
    )

    bio = models.TextField(
        blank=True,
        null=True,
        verbose_name="Biography",
    )

    experience_years = models.PositiveIntegerField(
        default=0,
        verbose_name="Experience (Years)",
    )

    is_primary_recruiter = models.BooleanField(
        default=False,
        verbose_name="Primary Recruiter",
    )

    class Meta:
        db_table = "recruiters"
        verbose_name = "Recruiter"
        verbose_name_plural = "Recruiters"
        ordering = ["user__first_name"]

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}".strip()