from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from accounts.api.serializers.login import LoginSerializer


class LoginAPIView(APIView):
    """
    API view for user login.
    """

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data
        )

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = serializer.validated_data["user"]

        tokens = serializer.get_tokens(user)

        return Response(
            {
                "success": True,
                "message": "Login successful.",
                "data": {
                    "user_id": str(user.id),
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role,
                    "is_approved": user.is_approved,
                    "access": tokens["access"],
                    "refresh": tokens["refresh"],
                },
            },
            status=status.HTTP_200_OK,
        )