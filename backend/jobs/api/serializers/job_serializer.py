from rest_framework import serializers

from ...models import Job


class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(
        write_only=True,
        max_length=255,
    )
    city = serializers.CharField(
        write_only=True,
        max_length=100,
    )
    state = serializers.CharField(
        write_only=True,
        max_length=100,
    )
    country = serializers.CharField(
        write_only=True,
        max_length=100,
    )

    class Meta:
        model = Job
        fields = [
            "id",
            "company",
            "recruiter",
            "company_name",
            "city",
            "state",
            "country",
            "job_title",
            "job_code",
            "employment_type",
            "workplace_type",
            "experience_level",
            "minimum_experience",
            "maximum_experience",
            "minimum_salary",
            "maximum_salary",
            "currency",
            "vacancies",
            "location",
            "required_skills",
            "qualification",
            "job_description",
            "responsibilities",
            "application_deadline",
            "status",
            "published_at",
            "is_featured",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "company",
            "recruiter",
            "status",
            "published_at",
            "created_at",
            "updated_at",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)

        data["company_name"] = instance.company.company_name
        data["city"] = instance.company.city
        data["state"] = instance.company.state
        data["country"] = instance.company.country

        return data