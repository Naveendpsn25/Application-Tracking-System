from django.db import models


class Designation(models.TextChoices):
    """
    Defines recruiter designation levels.
    """

    HR_EXECUTIVE = "HR_EXECUTIVE", "HR Executive"
    HR_MANAGER = "HR_MANAGER", "HR Manager"
    TALENT_ACQUISITION = "TALENT_ACQUISITION", "Talent Acquisition Specialist"
    SENIOR_RECRUITER = "SENIOR_RECRUITER", "Senior Recruiter"
    TECHNICAL_RECRUITER = "TECHNICAL_RECRUITER", "Technical Recruiter"


class Department(models.TextChoices):
    """
    Defines recruiter departments.
    """

    HUMAN_RESOURCES = "HUMAN_RESOURCES", "Human Resources"
    RECRUITMENT = "RECRUITMENT", "Recruitment"
    TECHNICAL = "TECHNICAL", "Technical"
    OPERATIONS = "OPERATIONS", "Operations"