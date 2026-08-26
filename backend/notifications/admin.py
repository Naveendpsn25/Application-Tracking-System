from django.contrib import admin

from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Notification model.
    """

    list_display = (
        "title",
        "user",
        "notification_type",
        "is_read",
        "sent_email",
        "created_at",
        "is_active",
    )

    list_filter = (
        "notification_type",
        "is_read",
        "sent_email",
        "is_active",
    )

    search_fields = (
        "title",
        "message",
        "user__email",
        "user__first_name",
        "user__last_name",
    )

    ordering = (
        "-created_at",
    )

    readonly_fields = (
        "sent_at",
        "read_at",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Notification Information",
            {
                "fields": (
                    "user",
                    "title",
                    "message",
                    "notification_type",
                )
            },
        ),
        (
            "Delivery Status",
            {
                "fields": (
                    "sent_email",
                    "sent_at",
                    "is_read",
                    "read_at",
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