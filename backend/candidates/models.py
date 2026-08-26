from django.db import models

from accounts.models import User
from common.models import BaseModel
from .choices import Gender, HighestQualification

class CandidateProfile(BaseModel):
    """
    Stores candidate-specific information for users with the Candidate role.

    Each candidate has one profile containing educational, professional,
    and resume-related information.
    """

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="candidate_profile",
        verbose_name="User",
    )

    resume = models.FileField(
        upload_to="candidates/resumes/",
        blank=True,
        null=True,
        verbose_name="Resume",
    )

    profile_image = models.ImageField(
        upload_to="candidates/profile_images/",
        blank=True,
        null=True,
        verbose_name="Profile Image",
    )

    date_of_birth = models.DateField(
        blank=True,
        null=True,
        verbose_name="Date of Birth",
    )

    gender = models.CharField(
        max_length=25,
        choices=Gender.choices,
        blank=True,
        null=True,
        verbose_name="Gender",
    )

    phone_number = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        verbose_name="Alternate Phone Number",
    )

    linkedin_url = models.URLField(
        blank=True,
        null=True,
        verbose_name="LinkedIn Profile",
    )

    github_url = models.URLField(
        blank=True,
        null=True,
        verbose_name="GitHub Profile",
    )

    portfolio_url = models.URLField(
        blank=True,
        null=True,
        verbose_name="Portfolio Website",
    )

    highest_qualification = models.CharField(
        max_length=100,
        choices=HighestQualification.choices,
        blank=True,
        null=True,
        verbose_name="Highest Qualification",
    )

    specialization = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Specialization",
    )

    college_name = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="College Name",
    )

    graduation_year = models.PositiveIntegerField(
        blank=True,
        null=True,
        verbose_name="Graduation Year",
    )

    cgpa = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        blank=True,
        null=True,
        verbose_name="CGPA",
    )

    experience_years = models.PositiveIntegerField(
        default=0,
        verbose_name="Experience (Years)",
    )

    current_company = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Current Company",
    )

    current_ctc = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        verbose_name="Current CTC",
    )

    expected_ctc = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True,
        verbose_name="Expected CTC",
    )

    current_location = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Current Location",
    )

    preferred_location = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Preferred Location",
    )

    notice_period = models.PositiveIntegerField(
        blank=True,
        null=True,
        verbose_name="Notice Period (Days)",
    )

    skills = models.TextField(
        blank=True,
        null=True,
        verbose_name="Skills",
    )

    summary = models.TextField(
        blank=True,
        null=True,
        verbose_name="Professional Summary",
    )

    is_profile_completed = models.BooleanField(
        default=False,
        verbose_name="Profile Completed",
    )

    career_status = models.CharField(
        max_length=20,
        choices=[
            ("FRESHER", "Fresher"),
            ("EXPERIENCED", "Experienced"),
        ],
        default="FRESHER",
        verbose_name="Career Status",
    )

    class Meta:
        db_table = "candidates"
        verbose_name = "Candidate"
        verbose_name_plural = "Candidates"
        ordering = ["user__first_name"]

    def __str__(self):
        full_name = f"{self.user.first_name} {self.user.last_name}".strip()
        return f"{full_name or self.user.email} - Candidate"


from common.models import BaseModel


class Education(BaseModel):
    """
    Stores one academic qualification for a candidate.

    A candidate can have multiple education records:
    School, Higher Secondary, Diploma, Bachelor's, Master's, etc.
    """

    candidate = models.ForeignKey(
        "candidates.CandidateProfile",
        on_delete=models.CASCADE,
        related_name="educations",
    )

    EDUCATION_LEVEL_CHOICES = (
        ("SECONDARY", "Secondary School"),
        ("HIGHER_SECONDARY", "Higher Secondary"),
        ("DIPLOMA", "Diploma"),
        ("BACHELOR", "Bachelor's Degree"),
        ("MASTER", "Master's Degree"),
        ("DOCTORATE", "Doctorate"),
        ("OTHER", "Other"),
    )

    GRADE_TYPE_CHOICES = (
        ("CGPA", "CGPA"),
        ("PERCENTAGE", "Percentage"),
        ("GRADE", "Grade"),
    )

    education_level = models.CharField(
        max_length=30,
        choices=EDUCATION_LEVEL_CHOICES,
    )

    institution_name = models.CharField(
        max_length=255,
    )

    field_of_study = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )

    start_year = models.PositiveIntegerField()

    end_year = models.PositiveIntegerField(
        blank=True,
        null=True,
    )

    grade_type = models.CharField(
        max_length=20,
        choices=GRADE_TYPE_CHOICES,
    )

    grade = models.CharField(
        max_length=20,
    )

    class Meta:
        db_table = "candidate_educations"
        ordering = ["-end_year", "-start_year"]

    def __str__(self):
        return f"{self.institution_name} - {self.education_level}"


class CandidateSkill(models.Model):

    CATEGORY_CHOICES = [
        ("PROGRAMMING", "Programming"),
        ("BACKEND", "Backend"),
        ("FRONTEND", "Frontend"),
        ("DATABASE", "Database"),
        ("DEVOPS", "DevOps"),
        ("TOOLS", "Tools"),
        ("SOFT_SKILL", "Soft Skill"),
        ("OTHER", "Other"),
    ]

    PROFICIENCY_CHOICES = [
        ("BEGINNER", "Beginner"),
        ("INTERMEDIATE", "Intermediate"),
        ("ADVANCED", "Advanced"),
        ("EXPERT", "Expert"),
    ]

    candidate = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="skills",
    )

    skill_name = models.CharField(
        max_length=100
    )

    category = models.CharField(
        max_length=30,
        choices=CATEGORY_CHOICES,
        default="OTHER",
    )

    proficiency = models.CharField(
        max_length=20,
        choices=PROFICIENCY_CHOICES,
        default="INTERMEDIATE",
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.skill_name