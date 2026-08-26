from rest_framework import serializers

from candidates.models import CandidateProfile


class OnlinePresenceSerializer(serializers.ModelSerializer):
    """
    Serializer for candidate online presence information.
    """

    class Meta:
        model = CandidateProfile
        fields = (
            "linkedin_url",
            "github_url",
            "portfolio_url",
        )