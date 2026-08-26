from django.db import transaction
from rest_framework import serializers

from accounts.models import OTP, User
from accounts.choices import UserRole
from accounts.otp_choices import OTPType
from accounts.services.otp_service import OTPService
from candidates.models import CandidateProfile

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """

    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    confirm_password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "confirm_password",
            "first_name",
            "last_name",
            "phone_number",
            "role",
        )

    def validate_email(self, value):
        """
        Ensure email is unique.
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "A user with this email already exists."
            )

        return value


    def validate_phone_number(self, value):
        """
        Ensure phone number is unique.
        """
        if User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError(
                "A user with this phone number already exists."
            )

        return value

    def validate_role(self, value):
        """
        Allow only Candidate and Recruiter registration.
        Super Admin cannot register publicly.
        """

        allowed_roles = {
            UserRole.CANDIDATE,
            UserRole.RECRUITER,
        }

        if value not in allowed_roles:
            raise serializers.ValidationError(
                "Only Candidate and Recruiter registration is allowed."
            )

        return value

    def validate(self, attrs):
        """
        Validate password confirmation.
        """

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password": "Passwords do not match."
                }
            )

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        """
        Create user and registration OTP atomically.
        """

        validated_data.pop("confirm_password")

        password = validated_data.pop("password")

        role = validated_data.get("role")

        if role == UserRole.RECRUITER:
            validated_data["is_approved"] = False
        else:
            validated_data["is_approved"] = True

        user = User.objects.create_user(
            password=password,
            **validated_data,
        )

        if user.role == UserRole.CANDIDATE:
            CandidateProfile.objects.create(
                user=user
            )

        otp = OTPService.generate_otp(
            user=user,
            otp_type=OTPType.REGISTRATION,
        )

        # user.registration_otp_expires_at = otp.expires_at

        # user.save(update_fields=["registration_otp_expires_at"])

        return user