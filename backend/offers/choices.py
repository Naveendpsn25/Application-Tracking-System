from django.db import models


class OfferStatus(models.TextChoices):
    """
    Defines the lifecycle status of an employment offer.
    """

    PENDING = "PENDING", "Pending"
    SENT = "SENT", "Sent"
    ACCEPTED = "ACCEPTED", "Accepted"
    DECLINED = "DECLINED", "Declined"
    EXPIRED = "EXPIRED", "Expired"
    WITHDRAWN = "WITHDRAWN", "Withdrawn"