from django.urls import path

from .views.job_views import JobCreateAPIView, JobListAPIView
from .views.job_update_views import JobUpdateAPIView
urlpatterns = [
    path("create/",JobCreateAPIView.as_view(),name="job-create",),
     path("",JobListAPIView.as_view(),name="job-list",),
     path("<int:job_id>/update/", JobUpdateAPIView.as_view(), name="job-update"),
]