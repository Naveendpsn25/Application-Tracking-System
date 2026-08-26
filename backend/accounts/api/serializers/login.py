from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User


class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    """

    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(
            username=email,
            password=password,
        )

        if user is None:
            raise serializers.ValidationError(
                {
                    "detail": "Invalid email or password."
                }
            )

        # Email verification check
        if not user.is_verified:
            raise serializers.ValidationError(
                {
                    "detail": "Please verify your email before logging in."
                }
            )

        # Account active check
        if not user.is_active:
            raise serializers.ValidationError(
                {
                    "detail": "Your account is inactive."
                }
            )

        attrs["user"] = user

        return attrs

    def get_tokens(self, user):
        """
        Generate JWT access and refresh tokens.
        """

        refresh = RefreshToken.for_user(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }