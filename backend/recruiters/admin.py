from django.contrib import admin

from .models import RecruiterProfile


@admin.register(RecruiterProfile)
class RecruiterProfileAdmin(admin.ModelAdmin):
    """
    Admin configuration for the RecruiterProfile model.
    """
    @admin.display(boolean=True, description="Admin approved")
    def is_approved(self, obj):
        return obj.user.is_approved

    list_display = (
        "user",
        "company",
        "employee_id",
        "designation",
        "department",
        "experience_years",
        "is_primary_recruiter", 
        "is_approved",
        "is_active",
    )

    list_filter = (
        "designation",
        "department",
        "is_primary_recruiter",
        "is_active",
        "company",
        "user__is_approved",
    )

    search_fields = (
        "user__email",
        "user__first_name",
        "user__last_name",
        "employee_id",
        "company__company_name",
    )

    ordering = (
        "company",
        "user__first_name",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Recruiter Information",
            {
                "fields": (
                    "user",
                    "company",
                    "employee_id",
                    "designation",
                    "department",
                )
            },
        ),
        (
            "Profile",
            {
                "fields": (
                    "profile_image",
                    "linkedin_url",
                    "bio",
                    "experience_years",
                )
            },
        ),
        (
            "Status",
            {
                "fields": (
                    "is_primary_recruiter",
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