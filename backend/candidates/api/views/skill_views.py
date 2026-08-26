from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from candidates.models import CandidateSkill
from candidates.api.serializers.candidate import CandidateSkillSerializer


class CandidateSkillListCreateView(generics.ListCreateAPIView):
    """
    GET:
        Return skills belonging to the logged-in candidate.

    POST:
        Add a new skill for the logged-in candidate.
    """

    serializer_class = CandidateSkillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CandidateSkill.objects.filter(
            candidate=self.request.user
        )

    def perform_create(self, serializer):
        serializer.save(
            candidate=self.request.user
        )


# ======================================================
# SKILL DETAIL
# ======================================================

class CandidateSkillDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET:
        Return one skill.

    PATCH / PUT:
        Update one skill.

    DELETE:
        Delete one skill.
    """

    serializer_class = CandidateSkillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CandidateSkill.objects.filter(
            candidate=self.request.user
        )