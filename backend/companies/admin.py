from django.contrib import admin

from .models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Company model.
    """

    list_display = (
        "company_name",
        "company_code",
        "industry",
        "company_size",
        "city",
        "country",
        "is_verified",
        "is_active",
    )

    list_filter = (
        "industry",
        "company_size",
        "is_verified",
        "is_active",
        "country",
    )

    search_fields = (
        "company_name",
        "company_code",
        "company_email",
        "city",
        "country",
    )

    ordering = ("company_name",)

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "company_name",
                    "company_code",
                    "description",
                    "logo",
                )
            },
        ),
        (
            "Contact Information",
            {
                "fields": (
                    "company_email",
                    "company_phone",
                    "website",
                )
            },
        ),
        (
            "Business Information",
            {
                "fields": (
                    "industry",
                    "company_size",
                    "founded_year",
                    "registration_number",
                    "tax_number",
                )
            },
        ),
        (
            "Address",
            {
                "fields": (
                    "address",
                    "city",
                    "state",
                    "country",
                    "postal_code",
                )
            },
        ),
        (
            "Status",
            {
                "fields": (
                    "is_verified",
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