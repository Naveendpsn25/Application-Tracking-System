from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from candidates.api.serializers.online_presence import (
    OnlinePresenceSerializer,
)
from candidates.models import CandidateProfile


class CandidateOnlinePresenceAPIView(APIView):
    """
    GET and UPDATE candidate online presence.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = CandidateProfile.objects.get(
            user=request.user
        )

        serializer = OnlinePresenceSerializer(profile)

        return Response(
            {
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )

    def patch(self, request):
        profile = CandidateProfile.objects.get(
            user=request.user
        )

        serializer = OnlinePresenceSerializer(
            profile,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            {
                "message": "Online presence updated successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )