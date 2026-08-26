from django.contrib import admin

from .models import Interview


@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Interview model.
    """

    list_display = (
        "application",
        "interview_round",
        "interviewer_name",
        "scheduled_date",
        "scheduled_time",
        "interview_mode",
        "interview_status",
        "recommendation",
        "is_active",
    )

    list_filter = (
        "interview_round",
        "interview_mode",
        "interview_status",
        "recommendation",
        "is_active",
    )

    search_fields = (
        "application__application_number",
        "application__candidate__user__email",
        "application__candidate__user__first_name",
        "application__candidate__user__last_name",
        "interviewer_name",
        "interviewer_email",
    )

    ordering = (
        "scheduled_date",
        "scheduled_time",
    )

    readonly_fields = (
        "completed_at",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Interview Information",
            {
                "fields": (
                    "application",
                    "interview_round",
                    "interview_mode",
                    "interview_status",
                )
            },
        ),
        (
            "Schedule",
            {
                "fields": (
                    "scheduled_date",
                    "scheduled_time",
                    "meeting_link",
                    "venue",
                )
            },
        ),
        (
            "Interviewer Details",
            {
                "fields": (
                    "interviewer_name",
                    "interviewer_email",
                )
            },
        ),
        (
            "Evaluation",
            {
                "fields": (
                    "interviewer_feedback",
                    "interviewer_rating",
                    "recommendation",
                    "completed_at",
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