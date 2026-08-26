from django.conf import settings
from django.core.mail import send_mail


class EmailService:
    """
    Service class for sending application emails.
    """

    @staticmethod
    def send_email_verification_otp(user, otp):
        """
        Send email verification OTP to the user.
        """

        subject = "TalentBridge - Email Verification OTP"

        message = f"""
            Hello {user.first_name},

            Welcome to TalentBridge!

            Your email verification OTP is: {otp.otp}

            This OTP is valid for 2 minutes.

            If you did not create this account, please ignore this email.

            Regards,
            TalentBridge Team
            """

        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )