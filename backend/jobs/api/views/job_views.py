from django.db import transaction

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from companies.models import Company
from recruiters.models import RecruiterProfile

from ...models import Job
from ..serializers.job_serializer import JobSerializer
from django.utils import timezone

class JobCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    
    @transaction.atomic
    def post(self, request):
        user = request.user
        action = request.data.get("action", "draft")

        if action not in ["draft", "publish"]:
            return Response(
                {
                    "success": False,
                    "message": "Invalid job action.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Only recruiters can create jobs
        if user.role != "RECRUITER":
            return Response(
                {
                    "success": False,
                    "message": "Only recruiters can create jobs.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Recruiter must be approved
        if not user.is_approved:
            return Response(
                {
                    "success": False,
                    "message": "Recruiter account is not approved.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = JobSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {
                    "success": False,
                    "errors": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        company_name = serializer.validated_data.pop("company_name")
        city = serializer.validated_data.pop("city")
        state = serializer.validated_data.pop("state")
        country = serializer.validated_data.pop("country")

        # Find existing company or create a new one
        company = Company.objects.filter(
            company_name__iexact=company_name.strip()
        ).first()

        if company:
            # Update basic location if it has changed
            company.city = city.strip()
            company.state = state.strip()
            company.country = country.strip()
            company.save(
                update_fields=[
                    "city",
                    "state",
                    "country",
                    "updated_at",
                ]
            )
        else:
            company = Company.objects.create(
                company_name=company_name.strip(),
                city=city.strip(),
                state=state.strip(),
                country=country.strip(),
            )

        # Create recruiter profile if it does not exist
        recruiter_profile, created = RecruiterProfile.objects.get_or_create(
            user=user,
            defaults={
                "company": company,
                "employee_id": f"TB-{user.id}",
                "designation": "HR_EXECUTIVE",
                "department": "HUMAN_RESOURCES",
            },
        )

        # If profile already exists, use its existing profile
        # but associate it with the selected company.
        if not created and recruiter_profile.company_id != company.id:
            recruiter_profile.company = company
            recruiter_profile.save(update_fields=["company", "updated_at"])

        job_status = "OPEN" if action == "publish" else "DRAFT"


        job = Job.objects.create(
            recruiter=recruiter_profile,
            company=company,
            status=job_status,
            published_at=timezone.now() if action == "publish" else None,
            **serializer.validated_data,
        )

        return Response(
            {
                "success": True,
                "message": (
                "Job published successfully."
                if action == "publish"
                else "Job saved as draft successfully."
            ),
                "data": JobSerializer(job).data,
            },
            status=status.HTTP_201_CREATED,
        )


class JobListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Only recruiters can view recruiter jobs
        if user.role != "RECRUITER":
            return Response(
                {
                    "success": False,
                    "message": "Only recruiters can view jobs.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Recruiter must be approved
        if not user.is_approved:
            return Response(
                {
                    "success": False,
                    "message": "Recruiter account is not approved.",
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        jobs = Job.objects.filter(
            recruiter__user=user
        ).order_by("-created_at")

        serializer = JobSerializer(jobs, many=True)

        return Response(
            {
                "success": True,
                "message": "Jobs retrieved successfully.",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )