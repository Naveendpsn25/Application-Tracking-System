import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

function VerifyOTPForm({
    email,
    otp,
    timeLeft,
    loading,
    error,
    success,
    onOtpChange,
    onSubmit,
    onResend,
}) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const isExpired = timeLeft <= 0;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "linear-gradient(135deg, #eef4ff 0%, #f8faff 100%)",
                px: 2,
                py: 4,
            }}
        >
            <Card
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 460,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
                }}
            >
                <CardContent
                    sx={{
                        p: {
                            xs: 3,
                            sm: 4,
                        },
                    }}
                >
                    <Stack spacing={3}>

                        {/* TalentBridge Branding */}

                        <Box textAlign="center">
                            <Typography
                                variant="h5"
                                fontWeight={800}
                                color="primary"
                                sx={{
                                    letterSpacing: "-0.5px",
                                }}
                            >
                                TalentBridge
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                            >
                                Connecting talent with opportunity
                            </Typography>
                        </Box>

                        {/* Heading */}

                        <Box textAlign="center">
                            <Typography
                                variant="h4"
                                fontWeight={700}
                                sx={{
                                    fontSize: {
                                        xs: "1.8rem",
                                        sm: "2rem",
                                    },
                                }}
                            >
                                Verify your email
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 1,
                                    lineHeight: 1.6,
                                }}
                            >
                                We've sent a 6-digit verification code to
                            </Typography>

                            <Typography
                                variant="body2"
                                fontWeight={700}
                                sx={{
                                    mt: 0.5,
                                    wordBreak: "break-word",
                                }}
                            >
                                {email}
                            </Typography>
                        </Box>

                        {/* OTP Form */}

                        <Box
                            component="form"
                            onSubmit={onSubmit}
                        >
                            <Stack spacing={2.5}>

                                <TextField
                                    fullWidth
                                    value={otp}
                                    onChange={onOtpChange}
                                    placeholder="Enter 6-digit OTP"
                                    label="Verification code"
                                    inputProps={{
                                        maxLength: 6,
                                        inputMode: "numeric",
                                    }}
                                    disabled={loading || isExpired}
                                    autoComplete="one-time-code"
                                    sx={{
                                        "& input": {
                                            textAlign: "center",
                                            letterSpacing: "0.5rem",
                                            fontSize: "1.4rem",
                                            fontWeight: 700,
                                        },
                                    }}
                                />

                                {/* Timer */}

                                <Box
                                    sx={{
                                        textAlign: "center",
                                        py: 1.5,
                                        borderRadius: 2,
                                        backgroundColor: isExpired
                                            ? "error.50"
                                            : "primary.50",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {isExpired
                                            ? "Your OTP has expired"
                                            : "OTP expires in"}
                                    </Typography>

                                    {!isExpired && (
                                        <Typography
                                            variant="h6"
                                            fontWeight={800}
                                            color="primary"
                                            sx={{ mt: 0.5 }}
                                        >
                                            {String(minutes).padStart(2, "0")}:
                                            {String(seconds).padStart(2, "0")}
                                        </Typography>
                                    )}
                                </Box>

                                {/* Error */}

                                {error && (
                                    <Typography
                                        variant="body2"
                                        color="error"
                                        textAlign="center"
                                    >
                                        {error}
                                    </Typography>
                                )}

                                {/* Success */}

                                {success && (
                                    <Typography
                                        variant="body2"
                                        color="success.main"
                                        textAlign="center"
                                        fontWeight={600}
                                    >
                                        {success}
                                    </Typography>
                                )}

                                {/* Verify Button */}

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={
                                        loading ||
                                        isExpired ||
                                        otp.length !== 6
                                    }
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 2,
                                        fontWeight: 700,
                                        textTransform: "none",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {loading
                                        ? "Verifying..."
                                        : "Verify OTP"}
                                </Button>

                                {/* Resend */}

                                <Box textAlign="center">
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Didn't receive the code?
                                    </Typography>

                                    <Button
                                        type="button"
                                        variant="text"
                                        onClick={onResend}
                                        disabled={!isExpired}
                                        sx={{
                                            mt: 0.5,
                                            textTransform: "none",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Resend OTP
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Footer */}

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            textAlign="center"
                        >
                            © 2026 TalentBridge. All rights reserved.
                        </Typography>

                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}

export default VerifyOTPForm;