from django.contrib import admin

from .models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Application model.
    """

    list_display = (
        "application_number",
        "candidate",
        "job",
        "application_status",
        "source",
        "is_shortlisted",
        "applied_at",
        "is_active",
    )

    list_filter = (
        "application_status",
        "source",
        "is_shortlisted",
        "is_active",
    )

    search_fields = (
        "application_number",
        "candidate__user__email",
        "candidate__user__first_name",
        "candidate__user__last_name",
        "job__job_title",
        "job__job_code",
    )

    ordering = (
        "-applied_at",
    )

    readonly_fields = (
        "application_number",
        "applied_at",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Application Information",
            {
                "fields": (
                    "application_number",
                    "candidate",
                    "job",
                    "application_status",
                    "source",
                    "applied_at",
                )
            },
        ),
        (
            "Candidate Documents",
            {
                "fields": (
                    "resume_snapshot",
                    "cover_letter",
                )
            },
        ),
        (
            "Recruiter Evaluation",
            {
                "fields": (
                    "rating",
                    "is_shortlisted",
                    "recruiter_notes",
                    "rejection_reason",
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