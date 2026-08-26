from rest_framework import serializers

from accounts.models import User


class ResendOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "User with this email does not exist."
            )

        if user.is_verified:
            raise serializers.ValidationError(
                "This email is already verified."
            )

        self.user = user

        return value