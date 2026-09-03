from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from accounts.choices import UserRole
from candidates.models import CandidateProfile
from candidates.api.serializers import CandidateProfileSerializer
from rest_framework.parsers import (
    JSONParser,
    MultiPartParser,
    FormParser,
)

class CandidateProfileAPIView(APIView):
    """
    API for viewing and updating the logged-in
    candidate's profile.
    """

    permission_classes = [IsAuthenticated]

    parser_classes = [
        JSONParser,
        MultiPartParser,
        FormParser,
    ]

    def get(self, request):
        """
        Get the logged-in candidate's profile.
        """

        if request.user.role != UserRole.CANDIDATE:
            return Response(
                {
                    "success": False,
                    "message": "Only candidates can access this profile.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            profile = CandidateProfile.objects.select_related(
                "user"
            ).get(
                user=request.user
            )
        except CandidateProfile.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "Candidate profile not found.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = CandidateProfileSerializer(profile)

        return Response(
            {
                "success": True,
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        """
        Update the logged-in candidate's profile.
        """

        if request.user.role != UserRole.CANDIDATE:
            return Response(
                {
                    "success": False,
                    "message": "Only candidates can update this profile.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            profile = CandidateProfile.objects.get(
                user=request.user
            )
        except CandidateProfile.DoesNotExist:
            return Response(
                {
                    "success": False,
                    "message": "Candidate profile not found.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        # Keep reference to the existing resume
        old_resume = profile.resume

        serializer = CandidateProfileSerializer(
            profile,
            data=request.data,
            partial=True,
        )

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()

        # ==================================================
        # DELETE OLD RESUME FROM STORAGE
        # ==================================================

        if (
            "resume" in request.data
            and request.data.get("resume") in [None, "", "null"]
        ):
            if old_resume:
                old_resume.delete(save=False)

        return Response(
            {
                "success": True,
                "message": "Candidate profile updated successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )