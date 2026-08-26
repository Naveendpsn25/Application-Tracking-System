from django.db import transaction
from django.utils import timezone

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.api.serializers.otp import VerifyOTPSerializer


class VerifyRegistrationOTPView(APIView):
    """
    Verify the OTP sent to the user's email during registration.
    """

    @transaction.atomic
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.validated_data["user"]
        otp = serializer.validated_data["otp_object"]

        # Check OTP expiration
        if timezone.now() > otp.expires_at:
            return Response(
                {
                    "success": False,
                    "message": "OTP has expired. Please request a new OTP.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Mark OTP as used
        otp.is_used = True
        otp.save(update_fields=["is_used"])

        # Verify user's email
        user.is_verified = True
        user.save(update_fields=["is_verified"])

        return Response(
            {
                "success": True,
                "message": "Email verified successfully.",
            },
            status=status.HTTP_200_OK,
        )