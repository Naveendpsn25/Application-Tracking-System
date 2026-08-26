import secrets
import string


def generate_otp(length=6):
    """
    Generate a secure numeric OTP.

    Args:
        length (int): Length of the OTP.

    Returns:
        str: Random numeric OTP.
    """

    digits = string.digits

    return "".join(
        secrets.choice(digits)
        for _ in range(length)
    )