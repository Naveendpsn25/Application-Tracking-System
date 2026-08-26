from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import OTP, User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """
    Admin configuration for the custom User model.
    """

    list_display = (
        "email",
        "first_name",
        "last_name",
        "role",
        "is_verified",
        "is_approved",
        "is_active",
        "is_staff",
    )

    list_filter = (
        "role",
        "is_verified",
        "is_approved",
        "is_active",
        "is_staff",
    )

    search_fields = (
        "email",
        "first_name",
        "last_name",
        "phone_number",
    )

    ordering = ("email",)

    readonly_fields = (
        "last_login",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        (
            "Authentication",
            {
                "fields": (
                    "email",
                    "password",
                )
            },
        ),
        (
            "Personal Information",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "phone_number",
                    "role",
                )
            },
        ),
        (
            "Verification",
            {
                "fields": (
                    "is_verified",
                    "is_approved",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (
            "Audit Information",
            {
                "fields": (
                    "last_login",
                    "created_at",
                    "updated_at",
                    "is_deleted",
                )
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "phone_number",
                    "role",
                    "password1",
                    "password2",
                ),
            },
        ),
    )


@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    """
    Admin configuration for the OTP model.
    """

    list_display = (
        "user",
        "otp_type",
        "otp",
        "expires_at",
        "is_used",
    )

    list_filter = (
        "otp_type",
        "is_used",
    )

    search_fields = (
        "user__email",
        "otp",
    )

    ordering = ("-created_at",)

    readonly_fields = (
        "created_at",
        "updated_at",
    )