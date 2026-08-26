from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from accounts.api.serializers.verify_otp import VerifyOTPSerializer


class VerifyRegistrationOTPView(APIView):

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

        otp.is_used = True
        otp.save(update_fields=["is_used"])

        user.is_verified = True
        user.save(update_fields=["is_verified"])

        return Response(
            {
                "success": True,
                "message": "Email verified successfully.",
            },
            status=status.HTTP_200_OK,
        )