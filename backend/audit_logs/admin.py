from django.contrib import admin

from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Audit Log model.
    """

    list_display = (
        "user",
        "action",
        "module",
        "object_name",
        "ip_address",
        "created_at",
    )

    list_filter = (
        "action",
        "module",
        "created_at",
    )

    search_fields = (
        "user__email",
        "user__first_name",
        "user__last_name",
        "object_name",
        "description",
        "ip_address",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Audit Information",
            {
                "fields": (
                    "user",
                    "action",
                    "module",
                    "description",
                )
            },
        ),
        (
            "Affected Object",
            {
                "fields": (
                    "object_id",
                    "object_name",
                )
            },
        ),
        (
            "Request Information",
            {
                "fields": (
                    "ip_address",
                    "user_agent",
                )
            },
        ),
        (
            "Audit Metadata",
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