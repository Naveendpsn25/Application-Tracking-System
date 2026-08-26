from rest_framework import serializers

from accounts.models import OTP, User
from accounts.otp_choices import OTPType


class VerifyOTPSerializer(serializers.Serializer):
    """
    Serializer for verifying the registration OTP.
    """

    email = serializers.EmailField()

    otp = serializers.CharField(
        max_length=6,
        min_length=6,
    )

    def validate(self, attrs):
        email = attrs["email"]
        otp_value = attrs["otp"]

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                {
                    "email": "User with this email does not exist."
                }
            )

        otp = OTP.objects.filter(
            user=user,
            otp=otp_value,
            otp_type=OTPType.REGISTRATION,
            is_used=False,
        ).first()

        if not otp:
            raise serializers.ValidationError(
                {
                    "otp": "Invalid or already used OTP."
                }
            )

        attrs["user"] = user
        attrs["otp_object"] = otp

        return attrs