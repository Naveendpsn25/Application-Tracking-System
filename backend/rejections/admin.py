from django.contrib import admin

from .models import Rejection


@admin.register(Rejection)
class RejectionAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Rejection model.
    """

    list_display = (
        "application",
        "rejected_by",
        "rejection_stage",
        "rejection_reason",
        "email_sent",
        "rejected_at",
        "is_active",
    )

    list_filter = (
        "rejection_stage",
        "rejection_reason",
        "email_sent",
        "is_active",
    )

    search_fields = (
        "application__application_number",
        "application__candidate__user__email",
        "application__job__title",
        "rejected_by__email",
        "feedback",
    )

    ordering = (
        "-rejected_at",
    )

    readonly_fields = (
        "rejected_at",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Rejection Information",
            {
                "fields": (
                    "application",
                    "rejected_by",
                    "rejection_stage",
                    "rejection_reason",
                    "feedback",
                )
            },
        ),
        (
            "Notification",
            {
                "fields": (
                    "email_sent",
                )
            },
        ),
        (
            "Audit Information",
            {
                "fields": (
                    "rejected_at",
                    "is_active",
                    "is_deleted",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )