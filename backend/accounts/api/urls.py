from django.urls import path

from accounts.api.views.register import RegisterAPIView
from accounts.api.views.verify_otp import VerifyRegistrationOTPView
from accounts.api.views.resend_otp import ResendRegistrationOTPView

from accounts.api.views.login import LoginAPIView

from rest_framework_simplejwt.views import TokenRefreshView

app_name = "accounts"


urlpatterns = [
    path(
        "register/",
        RegisterAPIView.as_view(),
        name="register",
    ),
    path(
        "verify-otp/",
        VerifyRegistrationOTPView.as_view(),
        name="verify-otp",
    ),

    path(
        "resend-otp/",
        ResendRegistrationOTPView.as_view(),
        name="resend-otp",
    ),

    path("login/", LoginAPIView.as_view(), name="login"),

    path(
    "token/refresh/",
    TokenRefreshView.as_view(),
    name="token-refresh",
),
]