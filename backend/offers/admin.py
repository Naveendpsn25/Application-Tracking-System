from django.contrib import admin

from .models import Offer


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Offer model.
    """

    list_display = (
        "offer_number",
        "application",
        "offered_job_title",
        "offered_salary",
        "currency",
        "joining_date",
        "offer_status",
        "is_active",
    )

    list_filter = (
        "offer_status",
        "currency",
        "is_active",
    )

    search_fields = (
        "offer_number",
        "application__application_number",
        "application__candidate__user__email",
        "application__candidate__user__first_name",
        "application__candidate__user__last_name",
        "offered_job_title",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "sent_at",
        "accepted_at",
        "declined_at",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Offer Information",
            {
                "fields": (
                    "application",
                    "offer_number",
                    "offer_status",
                )
            },
        ),
        (
            "Employment Details",
            {
                "fields": (
                    "offered_job_title",
                    "offered_salary",
                    "currency",
                    "joining_date",
                    "offer_expiry_date",
                )
            },
        ),
        (
            "Offer Letter",
            {
                "fields": (
                    "offer_letter",
                    "hr_notes",
                )
            },
        ),
        (
            "Timeline",
            {
                "fields": (
                    "sent_at",
                    "accepted_at",
                    "declined_at",
                )
            },
        ),
        (
            "Audit Information",
            {
                "fields": (
                    "is_active",
                    "is_deleted",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )