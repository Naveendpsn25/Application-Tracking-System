from django.db import models


class Industry(models.TextChoices):
    """
    Defines the industries supported by the TalentBridge ATS.
    """

    INFORMATION_TECHNOLOGY = "INFORMATION_TECHNOLOGY", "Information Technology"
    HEALTHCARE = "HEALTHCARE", "Healthcare"
    FINANCE = "FINANCE", "Finance"
    EDUCATION = "EDUCATION", "Education"
    MANUFACTURING = "MANUFACTURING", "Manufacturing"
    RETAIL = "RETAIL", "Retail"
    TELECOMMUNICATION = "TELECOMMUNICATION", "Telecommunication"
    LOGISTICS = "LOGISTICS", "Logistics"
    CONSTRUCTION = "CONSTRUCTION", "Construction"
    OTHER = "OTHER", "Other"


class CompanySize(models.TextChoices):
    """
    Defines company size categories.
    """

    STARTUP = "STARTUP", "Startup (1–50 Employees)"
    SMALL = "SMALL", "Small (51–200 Employees)"
    MEDIUM = "MEDIUM", "Medium (201–1000 Employees)"
    ENTERPRISE = "ENTERPRISE", "Enterprise (1000+ Employees)"