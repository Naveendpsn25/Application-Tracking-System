from django.db import models


class InterviewRound(models.TextChoices):
    """
    Defines the different interview rounds in the recruitment process.
    """

    HR = "HR", "HR Round"
    TECHNICAL_1 = "TECHNICAL_1", "Technical Round 1"
    TECHNICAL_2 = "TECHNICAL_2", "Technical Round 2"
    MANAGERIAL = "MANAGERIAL", "Managerial Round"
    FINAL_HR = "FINAL_HR", "Final HR Round"


class InterviewMode(models.TextChoices):
    """
    Defines how an interview is conducted.
    """

    ONLINE = "ONLINE", "Online"
    OFFLINE = "OFFLINE", "Offline"


class InterviewStatus(models.TextChoices):
    """
    Defines the current status of an interview.
    """

    SCHEDULED = "SCHEDULED", "Scheduled"
    COMPLETED = "COMPLETED", "Completed"
    RESCHEDULED = "RESCHEDULED", "Rescheduled"
    CANCELLED = "CANCELLED", "Cancelled"
    NO_SHOW = "NO_SHOW", "No Show"


class Recommendation(models.TextChoices):
    """
    Defines the interviewer's hiring recommendation.
    """

    STRONG_HIRE = "STRONG_HIRE", "Strong Hire"
    HIRE = "HIRE", "Hire"
    HOLD = "HOLD", "Hold"
    REJECT = "REJECT", "Reject"