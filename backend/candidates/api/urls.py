from django.urls import path

from candidates.api.views import CandidateProfileAPIView

from candidates.api.views.education_views import (
    CandidateEducationListCreateView,
    CandidateEducationDetailView,
)

from candidates.api.views.online_presence import (
    CandidateOnlinePresenceAPIView,
)

from candidates.api.views.skill_views import (
    CandidateSkillListCreateView,
    CandidateSkillDetailView,
)

urlpatterns = [
    path("profile/",CandidateProfileAPIView.as_view(),name="candidate-profile",),

    path("profile/education/",CandidateEducationListCreateView.as_view(),name="candidate-education-list-create",),

    path("profile/education/<int:pk>/",CandidateEducationDetailView.as_view(),name="candidate-education-detail",),

    path("profile/online-presence/",CandidateOnlinePresenceAPIView.as_view(),name="candidate-online-presence",),

    path("profile/skills/",CandidateSkillListCreateView.as_view(),name="candidate-skill-list-create",),

    path("profile/skills/<int:pk>/",CandidateSkillDetailView.as_view(),name="candidate-skill-detail",),

    
]