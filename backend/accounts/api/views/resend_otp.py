from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from accounts.api.serializers.resend_otp import ResendOTPSerializer
from accounts.otp_choices import OTPType
from accounts.services.otp_service import OTPService
from accounts.services.email_service import EmailService


class ResendRegistrationOTPView(APIView):

    def post(self, request):
        serializer = ResendOTPSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.user

        otp = OTPService.generate_otp(
            user=user,
            otp_type=OTPType.REGISTRATION,
        )

        EmailService.send_email_verification_otp(
            user=user,
            otp=otp,
        )

        return Response(
            {
                "success": True,
                "message": "A new OTP has been sent to your email.",
                "data": {
                    "email": user.email,
                    "expires_at": otp.expires_at,
                },
            },
            status=status.HTTP_200_OK,
        )