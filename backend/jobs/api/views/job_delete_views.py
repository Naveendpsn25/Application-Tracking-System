from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ...models import Job


class JobDeleteAPIView(APIView):
    """
    Handles deletion of jobs created by the authenticated recruiter.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request, job_id):
        user = request.user

        if user.role != "RECRUITER":
            return Response(
                {
                    "success": False,
                    "message": "Only recruiters can delete jobs.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if not user.is_approved:
            return Response(
                {
                    "success": False,
                    "message": "Recruiter account is not approved.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        job = Job.objects.filter(
            id=job_id,
            recruiter__user=user,
        ).first()

        if not job:
            return Response(
                {
                    "success": False,
                    "message": "Job not found.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        job.delete()

        return Response(
            {
                "success": True,
                "message": "Job deleted successfully.",
            },
            status=status.HTTP_200_OK,
        )