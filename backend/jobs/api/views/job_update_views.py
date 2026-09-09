from django.db import transaction
from django.utils import timezone

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from companies.models import Company
from recruiters.models import RecruiterProfile

from ...models import Job
from ..serializers.job_serializer import JobSerializer


class JobUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def patch(self, request, job_id):
        user = request.user

        # Only recruiters can update jobs
        if user.role != "RECRUITER":
            return Response(
                {
                    "success": False,
                    "message": "Only recruiters can update jobs.",
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

        # Get only this recruiter's job
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

        serializer = JobSerializer(
            job,
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

        # Company information
        company_name = serializer.validated_data.pop(
            "company_name",
            None,
        )
        city = serializer.validated_data.pop(
            "city",
            None,
        )
        state = serializer.validated_data.pop(
            "state",
            None,
        )
        country = serializer.validated_data.pop(
            "country",
            None,
        )

        # Update company if company information was provided
        if company_name is not None:
            company_name = company_name.strip()

            company = Company.objects.filter(
                company_name__iexact=company_name
            ).first()

            if company:
                if city is not None:
                    company.city = city.strip()

                if state is not None:
                    company.state = state.strip()

                if country is not None:
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
                    company_name=company_name,
                    city=(city or "").strip(),
                    state=(state or "").strip(),
                    country=(country or "").strip(),
                )

            job.company = company

            recruiter_profile = job.recruiter

            if recruiter_profile.company_id != company.id:
                recruiter_profile.company = company
                recruiter_profile.save(
                    update_fields=[
                        "company",
                        "updated_at",
                    ]
                )

        else:
            company = job.company

            company_changed = False

            if city is not None:
                company.city = city.strip()
                company_changed = True

            if state is not None:
                company.state = state.strip()
                company_changed = True

            if country is not None:
                company.country = country.strip()
                company_changed = True

            if company_changed:
                company.save(
                    update_fields=[
                        "city",
                        "state",
                        "country",
                        "updated_at",
                    ]
                )

        # Update job fields
        for field, value in serializer.validated_data.items():
            setattr(job, field, value)

        job.save()

        return Response(
            {
                "success": True,
                "message": "Job updated successfully.",
                "data": JobSerializer(job).data,
            },
            status=status.HTTP_200_OK,
        )