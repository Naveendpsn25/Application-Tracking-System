from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.api.serializers.register import RegisterSerializer

from accounts.models import OTP
from accounts.otp_choices import OTPType

class RegisterAPIView(APIView):
    """
    API for user registration.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            otp = OTP.objects.filter(
                user=user,
                otp_type=OTPType.REGISTRATION,
                is_used=False,
            ).order_by("-created_at").first()

            return Response({
                "success": True,
                "message": "Registration successful. Please verify your email using the OTP.",
                "data": {
                    "user_id": str(user.id),
                    "email": user.email,
                    "expires_at": otp.expires_at,
                },
            })

        return Response(
            {
                "success": False,
                "errors": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )