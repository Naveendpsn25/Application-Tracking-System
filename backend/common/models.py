from django.db import models


class BaseModel(models.Model):
    """
    Provides common fields shared by all business models.
    """

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Created At",
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Updated At",
    )

    is_active = models.BooleanField(
        default=True,
        verbose_name="Is Active",
    )

    is_deleted = models.BooleanField(
        default=False,
        verbose_name="Is Deleted",
    )

    class Meta:
        abstract = True