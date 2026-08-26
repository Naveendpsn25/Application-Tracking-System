from django.db import models


class Gender(models.TextChoices):
    """
    Defines supported gender options for candidates.
    """

    MALE = "MALE", "Male"
    FEMALE = "FEMALE", "Female"
    OTHER = "OTHER", "Other"
    PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY", "Prefer Not to Say"


class HighestQualification(models.TextChoices):
    """
    Defines supported highest qualification levels.
    """

    HIGH_SCHOOL = "HIGH_SCHOOL", "High School"
    DIPLOMA = "DIPLOMA", "Diploma"
    BACHELOR = "BACHELOR", "Bachelor's Degree"
    MASTER = "MASTER", "Master's Degree"
    PHD = "PHD", "Ph.D."
    OTHER = "OTHER", "Other"