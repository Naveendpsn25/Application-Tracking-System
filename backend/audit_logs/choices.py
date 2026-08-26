from django.db import models


class AuditAction(models.TextChoices):
    """
    Defines the actions performed by users in the system.
    """

    CREATE = "CREATE", "Create"
    UPDATE = "UPDATE", "Update"
    DELETE = "DELETE", "Delete"
    LOGIN = "LOGIN", "Login"
    LOGOUT = "LOGOUT", "Logout"
    REGISTER = "REGISTER", "Register"
    VERIFY = "VERIFY", "Verify"
    APPROVE = "APPROVE", "Approve"
    REJECT = "REJECT", "Reject"
    SEND = "SEND", "Send"
    DOWNLOAD = "DOWNLOAD", "Download"


class AuditModule(models.TextChoices):
    """
    Defines the modules where audit events occur.
    """

    ACCOUNTS = "ACCOUNTS", "Accounts"
    COMPANIES = "COMPANIES", "Companies"
    RECRUITERS = "RECRUITERS", "Recruiters"
    CANDIDATES = "CANDIDATES", "Candidates"
    JOBS = "JOBS", "Jobs"
    APPLICATIONS = "APPLICATIONS", "Applications"
    INTERVIEWS = "INTERVIEWS", "Interviews"
    OFFERS = "OFFERS", "Offers"
    NOTIFICATIONS = "NOTIFICATIONS", "Notifications"
    AUTHENTICATION = "AUTHENTICATION", "Authentication"
    SYSTEM = "SYSTEM", "System"