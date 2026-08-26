from django.contrib.auth.base_user import BaseUserManager

from .choices import UserRole


class UserManager(BaseUserManager):
    """
    Handles the creation of regular users and superusers.
    """

    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and returns a regular user with an email and password.
        """

        if not email:
            raise ValueError("Email address is required.")

        email = self.normalize_email(email)

        extra_fields.setdefault("is_active", True)

        user = self.model(email=email, **extra_fields)

        user.set_password(password)

        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and returns a superuser with full administrative privileges.
        """

        extra_fields.setdefault("role", UserRole.SUPER_ADMIN)

        extra_fields.setdefault("is_staff", True)

        extra_fields.setdefault("is_superuser", True)

        extra_fields.setdefault("is_verified", True)

        extra_fields.setdefault("is_approved", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)