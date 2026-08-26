from django.db import models

from applications.models import Application
from common.models import BaseModel

from .choices import OfferStatus

class Offer(BaseModel):
    """
    Stores the official employment offer issued to a selected candidate.

    Tracks offer details, acceptance status, and the generated offer letter.
    """

    application = models.OneToOneField(
        Application,
        on_delete=models.CASCADE,
        related_name="offer",
        verbose_name="Application",
    )

    offer_number = models.CharField(
        max_length=30,
        unique=True,
        verbose_name="Offer Number",
    )

    offered_job_title = models.CharField(
        max_length=255,
        verbose_name="Offered Job Title",
    )

    offered_salary = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name="Offered Salary",
    )

    currency = models.CharField(
        max_length=10,
        default="INR",
        verbose_name="Currency",
    )

    joining_date = models.DateField(
        verbose_name="Joining Date",
    )

    offer_expiry_date = models.DateField(
        verbose_name="Offer Expiry Date",
    )

    offer_status = models.CharField(
        max_length=20,
        choices=OfferStatus.choices,
        default=OfferStatus.PENDING,
        verbose_name="Offer Status",
    )

    offer_letter = models.FileField(
        upload_to="offer_letters/",
        blank=True,
        null=True,
        verbose_name="Offer Letter",
    )

    hr_notes = models.TextField(
        blank=True,
        null=True,
        verbose_name="HR Notes",
    )

    sent_at = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name="Sent At",
    )

    accepted_at = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name="Accepted At",
    )

    declined_at = models.DateTimeField(
        blank=True,
        null=True,
        verbose_name="Declined At",
    )

    class Meta:
        db_table = "offers"
        verbose_name = "Offer"
        verbose_name_plural = "Offers"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.offer_number} - {self.application.application_number}"