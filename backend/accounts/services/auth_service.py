from django.db import transaction

from accounts.models import User
from accounts.services.email_service import EmailService
from accounts.services.otp_service import OTPService


class AuthService:
    """
    Service class for authentication-related operations.
    """

    @staticmethod
    @transaction.atomic
    def register_user(validated_data):
        """
        Register a new user and send an email verification OTP.
        """

        validated_data.pop("confirm_password")

        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data,
        )

        otp = OTPService.generate_otp(user)

        EmailService.send_email_verification_otp(user, otp)

        return user