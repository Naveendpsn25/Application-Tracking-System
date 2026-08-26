from datetime import timedelta

from django.db import transaction
from django.utils import timezone

from accounts.models import OTP
from accounts.otp_choices import OTPType
from accounts.utils.otp_generator import generate_otp

from accounts.services.email_service import EmailService

class OTPService:
    """
    Service class for handling OTP generation and storage.
    """

    OTP_EXPIRY_MINUTES = 2

    @classmethod
    @transaction.atomic
    def generate_otp(cls, user, otp_type=OTPType.REGISTRATION):

        OTP.objects.filter(
            user=user,
            otp_type=otp_type,
            is_used=False,
        ).update(is_used=True)

        otp = OTP.objects.create(
            user=user,
            otp=generate_otp(),
            otp_type=otp_type,
            expires_at=timezone.now()
            + timedelta(minutes=cls.OTP_EXPIRY_MINUTES),
        )

        if otp_type == OTPType.REGISTRATION:
            EmailService.send_email_verification_otp(
                user=user,
                otp=otp,
            )

        return otp