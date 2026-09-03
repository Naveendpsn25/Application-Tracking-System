from rest_framework import serializers

from accounts.models import User
from candidates.models import CandidateProfile
from candidates.models import Education
from candidates.models import CandidateSkill

class CandidateUserSerializer(serializers.ModelSerializer):
    """
    Serializer for basic candidate user information.
    """
    
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
        )
        read_only_fields = fields


class CandidateProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for candidate profile information.

    Handles:
    - Fresher / Experienced career status
    - Conditional career fields
    - Profile completion calculation
    """

    user = CandidateUserSerializer(
        read_only=True
    )

    phone_number = serializers.CharField(
        source="user.phone_number",
        required=False,
        allow_blank=True,
        allow_null=True,
    )

    profile_completion = serializers.SerializerMethodField()

    class Meta:
        model = CandidateProfile

        fields = (
            "id",
            "user",

            # Personal
            "resume",
            "profile_image",
            "date_of_birth",
            "gender",
            "phone_number",

            # Professional links
            "linkedin_url",
            "github_url",
            "portfolio_url",

            # Education
            "highest_qualification",
            "specialization",
            "college_name",
            "graduation_year",
            "cgpa",

            # Career
            "career_status",
            "experience_years",
            "current_company",
            "current_ctc",
            "expected_ctc",
            "notice_period",

            # Location
            "current_location",
            "preferred_location",

            # Profile
            "skills",
            "summary",

            # Status
            "is_profile_completed",
            "profile_completion",
        )

        read_only_fields = (
            "id",
            "user",
            "is_profile_completed",
        )

    def validate(self, attrs):
        """
        Validate career-specific information.
        """

        career_status = attrs.get(
            "career_status",
            self.instance.career_status
            if self.instance
            else "FRESHER",
        )

        # --------------------------------------------------
        # FRESHER
        # --------------------------------------------------

        if career_status == "FRESHER":

            # Fresher should not have experienced-only data.
            attrs["experience_years"] = 0
            attrs["current_company"] = None
            attrs["current_ctc"] = None
            attrs["notice_period"] = None

        # --------------------------------------------------
        # EXPERIENCED
        # --------------------------------------------------

        elif career_status == "EXPERIENCED":

            experience_years = attrs.get(
                "experience_years",
                self.instance.experience_years
                if self.instance
                else 0,
            )

            if experience_years <= 0:
                raise serializers.ValidationError(
                    {
                        "experience_years": (
                            "Experience must be greater than 0 "
                            "for an experienced candidate."
                        )
                    }
                )

        return attrs

    def update(self, instance, validated_data):
        """
        Update candidate profile and user information.

        User-level fields:
        - phone_number

        CandidateProfile-level fields:
        - date_of_birth
        - gender
        - education
        - career
        - location
        - skills
        - summary
        """

        # --------------------------------------------------
        # User-level fields
        # --------------------------------------------------

        user = instance.user

        user_data = validated_data.pop(
            "user",
            {}
        )

        phone_number = user_data.get(
            "phone_number"
        )

        if phone_number is not None:
            user.phone_number = phone_number
            user.save(
                update_fields=["phone_number"]
            )
        # --------------------------------------------------
        # CandidateProfile fields
        # --------------------------------------------------

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # --------------------------------------------------
        # Career status
        # --------------------------------------------------

        career_status = instance.career_status

        # --------------------------------------------------
        # Common required fields
        # --------------------------------------------------

        required_fields = [
            "resume",
            "date_of_birth",
            "gender",
            "highest_qualification",
            "specialization",
            "college_name",
            "graduation_year",
            "cgpa",
            "current_location",
            "preferred_location",
            "skills",
            "summary",
        ]

        # --------------------------------------------------
        # Career-specific completion
        # --------------------------------------------------

        if career_status == "EXPERIENCED":
            required_fields.extend(
                [
                    "experience_years",
                    "current_company",
                    "current_ctc",
                    "expected_ctc",
                    "notice_period",
                ]
            )

        # --------------------------------------------------
        # Check profile completion
        # --------------------------------------------------

        profile_completed = all(
            self._has_value(
                getattr(instance, field)
            )
            for field in required_fields
        )

        # Phone belongs to User
        phone_completed = self._has_value(
            instance.user.phone_number
        )

        instance.is_profile_completed = (
            profile_completed
            and phone_completed
        )

        instance.save()

        return instance


    def get_profile_completion(self, instance):
        """
        Calculate candidate profile completion
        based on 10 meaningful profile sections.
        """

        items = []

        # --------------------------------------------------
        # 1. Profile Photo
        # --------------------------------------------------
        items.append({
            "key": "profile_photo",
            "label": "Profile Photo",
            "completed": self._has_value(
                instance.profile_image
            ),
        })

        # --------------------------------------------------
        # 2. Personal Information
        # DOB + Gender + Phone
        # --------------------------------------------------
        personal_information_completed = (
            self._has_value(instance.date_of_birth)
            and self._has_value(instance.gender)
            and self._has_value(
                instance.user.phone_number
            )
        )

        items.append({
            "key": "personal_information",
            "label": "Personal Information",
            "completed": personal_information_completed,
        })

        # --------------------------------------------------
        # 3. Education
        # Qualification + Specialization + College
        # Graduation Year + CGPA
        # --------------------------------------------------
        education_completed = (
            self._has_value(
                instance.highest_qualification
            )
            and self._has_value(
                instance.specialization
            )
            and self._has_value(
                instance.college_name
            )
            and self._has_value(
                instance.graduation_year
            )
            and self._has_value(
                instance.cgpa
            )
        )

        items.append({
            "key": "education",
            "label": "Education",
            "completed": education_completed,
        })

        # --------------------------------------------------
        # 4. Career Information
        # --------------------------------------------------
        if instance.career_status == "FRESHER":

            career_completed = True

        elif instance.career_status == "EXPERIENCED":

            career_completed = (
                self._has_value(
                    instance.experience_years
                )
                and self._has_value(
                    instance.current_company
                )
                and self._has_value(
                    instance.current_ctc
                )
                and self._has_value(
                    instance.expected_ctc
                )
                and self._has_value(
                    instance.notice_period
                )
            )

        else:
            career_completed = False

        items.append({
            "key": "career_information",
            "label": "Career Information",
            "completed": career_completed,
        })

        # --------------------------------------------------
        # 5. Current Location
        # --------------------------------------------------
        items.append({
            "key": "current_location",
            "label": "Current Location",
            "completed": self._has_value(
                instance.current_location
            ),
        })

        # --------------------------------------------------
        # 6. Preferred Location
        # --------------------------------------------------
        items.append({
            "key": "preferred_location",
            "label": "Preferred Location",
            "completed": self._has_value(
                instance.preferred_location
            ),
        })

        # --------------------------------------------------
        # 7. Skills
        # --------------------------------------------------
        items.append({
            "key": "skills",
            "label": "Skills",
            "completed": self._has_value(
                instance.skills
            ),
        })

        # --------------------------------------------------
        # 8. Professional Summary
        # --------------------------------------------------
        items.append({
            "key": "professional_summary",
            "label": "Professional Summary",
            "completed": self._has_value(
                instance.summary
            ),
        })

        # --------------------------------------------------
        # 9. Resume
        # --------------------------------------------------
        items.append({
            "key": "resume",
            "label": "Resume",
            "completed": self._has_value(
                instance.resume
            ),
        })

        # --------------------------------------------------
        # 10. Online Presence
        # LinkedIn + GitHub + Portfolio
        # ALL THREE REQUIRED
        # --------------------------------------------------
        online_presence_completed = (
            self._has_value(
                instance.linkedin_url
            )
            and self._has_value(
                instance.github_url
            )
            and self._has_value(
                instance.portfolio_url
            )
        )

        items.append({
            "key": "online_presence",
            "label": "Online Presence",
            "completed": online_presence_completed,
        })

        # --------------------------------------------------
        # Overall percentage
        # --------------------------------------------------
        completed_count = sum(
            1
            for item in items
            if item["completed"]
        )

        total_count = len(items)

        percentage = round(
            (completed_count / total_count) * 100
        )

        return {
            "percentage": percentage,
            "completed_count": completed_count,
            "total_count": total_count,
            "items": items,
        }
    @staticmethod
    def _has_value(value):
        """
        Determine whether a profile field contains
        meaningful data.
        """

        if value is None:
            return False

        if isinstance(value, str):
            return bool(value.strip())

        return bool(value)


class EducationSerializer(serializers.ModelSerializer):
    """
    Serializer for candidate education records.
    """

    class Meta:
        model = Education

        fields = (
            "id",
            "education_level",
            "institution_name",
            "field_of_study",
            "start_year",
            "end_year",
            "grade_type",
            "grade",
        )

        read_only_fields = (
            "id",
        )

    def validate(self, attrs):
        start_year = attrs.get("start_year")
        end_year = attrs.get("end_year")

        if end_year and end_year < start_year:
            raise serializers.ValidationError(
                {
                    "end_year": (
                        "End year cannot be earlier than start year."
                    )
                }
            )

        return attrs


class CandidateSkillSerializer(serializers.ModelSerializer):
    """
    Serializer for candidate skill information.
    """

    class Meta:
        model = CandidateSkill

        fields = (
            "id",
            "skill_name",
            "category",
            "proficiency",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )