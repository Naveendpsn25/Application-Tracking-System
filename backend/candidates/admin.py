from django.contrib import admin

from .models import CandidateProfile


@admin.register(CandidateProfile)
class CandidateProfileAdmin(admin.ModelAdmin):
    """
    Admin configuration for the CandidateProfile model.
    """

    list_display = (
        "user",
        "highest_qualification",
        "graduation_year",
        "experience_years",
        "current_location",
        "is_profile_completed",
        "is_active",
    )

    list_filter = (
        "gender",
        "highest_qualification",
        "is_profile_completed",
        "is_active",
    )

    search_fields = (
        "user__email",
        "user__first_name",
        "user__last_name",
        "college_name",
        "current_company",
        "skills",
    )

    ordering = (
        "user__first_name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Candidate Information",
            {
                "fields": (
                    "user",
                    "profile_image",
                    "resume",
                    "summary",
                )
            },
        ),
        (
            "Personal Information",
            {
                "fields": (
                    "date_of_birth",
                    "gender",
                    "phone_number",
                    "linkedin_url",
                    "github_url",
                    "portfolio_url",
                )
            },
        ),
        (
            "Education",
            {
                "fields": (
                    "highest_qualification",
                    "specialization",
                    "college_name",
                    "graduation_year",
                    "cgpa",
                )
            },
        ),
        (
            "Professional Information",
            {
                "fields": (
                    "experience_years",
                    "current_company",
                    "current_ctc",
                    "expected_ctc",
                    "current_location",
                    "preferred_location",
                    "notice_period",
                    "skills",
                )
            },
        ),
        (
            "Status",
            {
                "fields": (
                    "is_profile_completed",
                    "is_active",
                    "is_deleted",
                )
            },
        ),
        (
            "Audit Information",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )