from django.db import models

from common.models import BaseModel
from .choices import CompanySize, Industry

class Company(BaseModel):
    """
    Company model stores the organization details that use the TalentBridge ATS.

    Each recruiter and job posting belongs to a company.
    """

    company_name = models.CharField(
        max_length=255,
        unique=True,
        verbose_name="Company Name",
    )

    company_code = models.CharField(
        max_length=20,
        unique=True,
        verbose_name="Company Code",
    )

    company_email = models.EmailField(
        unique=True,
        verbose_name="Company Email",
    )

    company_phone = models.CharField(
        max_length=15,
        unique=True,
        verbose_name="Company Phone",
    )

    website = models.URLField(
        blank=True,
        null=True,
        verbose_name="Website",
    )

    industry = models.CharField(
        max_length=50,
        choices=Industry.choices,
        verbose_name="Industry",
    )

    company_size = models.CharField(
        max_length=50,
        choices=CompanySize.choices,
        verbose_name="Company Size",
    )

    founded_year = models.PositiveIntegerField(
        blank=True,
        null=True,
        verbose_name="Founded Year",
    )

    registration_number = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Registration Number",
    )

    tax_number = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Tax Number",
    )

    address = models.TextField(
        verbose_name="Address",
    )

    city = models.CharField(
        max_length=100,
        verbose_name="City",
    )

    state = models.CharField(
        max_length=100,
        verbose_name="State",
    )

    country = models.CharField(
        max_length=100,
        verbose_name="Country",
    )

    postal_code = models.CharField(
        max_length=20,
        verbose_name="Postal Code",
    )

    logo = models.ImageField(
        upload_to="company_logos/",
        blank=True,
        null=True,
        verbose_name="Company Logo",
    )

    description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Description",
    )

    is_verified = models.BooleanField(
        default=False,
        verbose_name="Verified",
    )

    class Meta:
        db_table = "companies"
        verbose_name = "Company"
        verbose_name_plural = "Companies"
        ordering = ["company_name"]

    def __str__(self):
        return self.company_name