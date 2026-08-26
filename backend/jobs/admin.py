from django.contrib import admin

from .models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Job model.
    """

    list_display = (
        "job_title",
        "job_code",
        "company",
        "recruiter",
        "employment_type",
        "experience_level",
        "status",
        "is_featured",
        "is_active",
    )

    list_filter = (
        "employment_type",
        "workplace_type",
        "experience_level",
        "status",
        "is_featured",
        "company",
        "is_active",
    )

    search_fields = (
        "job_title",
        "job_code",
        "company__company_name",
        "recruiter__user__email",
        "location",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "published_at",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Job Information",
            {
                "fields": (
                    "company",
                    "recruiter",
                    "job_title",
                    "job_code",
                    "status",
                    "is_featured",
                )
            },
        ),
        (
            "Employment Details",
            {
                "fields": (
                    "employment_type",
                    "workplace_type",
                    "experience_level",
                    "minimum_experience",
                    "maximum_experience",
                    "vacancies",
                )
            },
        ),
        (
            "Salary Details",
            {
                "fields": (
                    "minimum_salary",
                    "maximum_salary",
                    "currency",
                )
            },
        ),
        (
            "Location & Qualification",
            {
                "fields": (
                    "location",
                    "qualification",
                    "required_skills",
                )
            },
        ),
        (
            "Job Description",
            {
                "fields": (
                    "job_description",
                    "responsibilities",
                )
            },
        ),
        (
            "Timeline",
            {
                "fields": (
                    "application_deadline",
                    "published_at",
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