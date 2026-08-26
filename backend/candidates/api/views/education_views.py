from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from candidates.models import CandidateProfile, Education
from candidates.api.serializers.candidate import EducationSerializer


class CandidateEducationListCreateView(
    generics.ListCreateAPIView
):
    """
    GET  -> List candidate education records.
    POST -> Add a new education record.
    """

    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        profile = CandidateProfile.objects.get(
            user=self.request.user
        )

        return Education.objects.filter(
            candidate=profile
        )

    def perform_create(self, serializer):
        profile = CandidateProfile.objects.get(
            user=self.request.user
        )

        serializer.save(
            candidate=profile
        )


class CandidateEducationDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    """
    GET    -> Get one education record.
    PATCH  -> Update one education record.
    DELETE -> Delete one education record.
    """

    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        profile = CandidateProfile.objects.get(
            user=self.request.user
        )

        return Education.objects.filter(
            candidate=profile
        )