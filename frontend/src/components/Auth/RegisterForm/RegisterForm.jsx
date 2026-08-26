
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Link,
    InputAdornment,
    IconButton,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    Alert,
} from "@mui/material";

import {
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

import {
    register as registerUser,
} from "../../../services/auth/authService";

import "./RegisterForm.css";


const registerSchema = z
    .object({
        first_name: z
            .string()
            .min(2, "First name is required"),

        last_name: z
            .string()
            .min(1, "Last name is required"),

        email: z
            .string()
            .email("Enter a valid email address"),

        phone_number: z
            .string()
            .regex(
                /^[0-9]{10}$/,
                "Phone number must contain exactly 10 digits"
            ),

        password: z
            .string()
            .min(
                8,
                "Password must be at least 8 characters"
            ),

        confirm_password: z
            .string()
            .min(
                8,
                "Please confirm your password"
            ),

        role: z.enum(
            ["CANDIDATE", "RECRUITER"],
            {
                message: "Please select an account type",
            }
        ),
    })
    .refine(
        (data) =>
            data.password === data.confirm_password,
        {
            message: "Passwords do not match",
            path: ["confirm_password"],
        }
    );


function RegisterForm() {

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [successMessage, setSuccessMessage] =
        useState("");

    const [serverError, setServerError] =
        useState("");

    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onBlur",
    });

    const navigate = useNavigate();


    const onSubmit = async (data) => {

        setSuccessMessage("");
        setServerError("");

        try {

            const result = await registerUser(data);

            setSuccessMessage(result.message);

            console.log(
                "Registration successful:",
                result
            );

            navigate("/verify-otp", {
                state: {
                    email: data.email,
                    expires_at:
                        result.data.expires_at,
                },
            });

        } catch (error) {

            console.error(
                "Registration failed:",
                error
            );

            const backendErrors =
                error.data?.errors;

            if (backendErrors?.email) {

                setError("email", {
                    type: "server",
                    message:
                        backendErrors.email[0],
                });
            }

            if (backendErrors?.phone_number) {

                setError("phone_number", {
                    type: "server",
                    message:
                        backendErrors
                            .phone_number[0],
                });
            }

        }
    };


    return (
        <Card className="register-card">

            <CardContent className="register-card-content">

                {/* FORM HEADER */}

                <Box className="register-header">

                    <span className="register-header-label">
                        ACCOUNT CREATION
                    </span>

                    <Typography
                        variant="h4"
                        className="register-title"
                    >
                        Create your account
                    </Typography>

                    <Typography
                        variant="body2"
                        className="register-subtitle"
                    >
                        Join TalentBridge and take the
                        next step toward your career.
                    </Typography>

                </Box>


                {/* SERVER MESSAGES */}

                {successMessage && (
                    <Alert
                        severity="success"
                        className="register-alert"
                    >
                        {successMessage}
                    </Alert>
                )}

                {serverError && (
                    <Alert
                        severity="error"
                        className="register-alert"
                    >
                        {serverError}
                    </Alert>
                )}


                {/* FORM */}

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="register-form"
                >

                    {/* NAME */}

                    <Box className="register-name-row">

                        <TextField
                            label="First name"
                            {...register("first_name")}
                            error={
                                !!errors.first_name
                            }
                            helperText={
                                errors.first_name?.message
                            }
                            fullWidth
                            className="register-field"
                        />

                        <TextField
                            label="Last name"
                            {...register("last_name")}
                            error={
                                !!errors.last_name
                            }
                            helperText={
                                errors.last_name?.message
                            }
                            fullWidth
                            className="register-field"
                        />

                    </Box>


                    {/* EMAIL */}

                    <TextField
                        label="Email address"
                        type="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={
                            errors.email?.message
                        }
                        fullWidth
                        className="register-field"
                    />


                    {/* PHONE */}

                    <TextField
                        label="Phone number"
                        {...register("phone_number")}
                        error={
                            !!errors.phone_number
                        }
                        helperText={
                            errors.phone_number?.message
                        }
                        fullWidth
                        className="register-field"
                    />


                    {/* ACCOUNT TYPE */}

                    <FormControl
                        error={!!errors.role}
                        className="register-role-control"
                    >

                        <FormLabel className="register-role-label">
                            Account type
                        </FormLabel>

                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    className="register-role-group"
                                >

                                    <FormControlLabel
                                        value="CANDIDATE"
                                        className="register-role-card"
                                        control={
                                            <Radio />
                                        }
                                        label={
                                            <div>
                                                <strong>
                                                    Job Seeker
                                                </strong>

                                                <span>
                                                    Find and apply for opportunities
                                                </span>
                                            </div>
                                        }
                                    />

                                    <FormControlLabel
                                        value="RECRUITER"
                                        className="register-role-card"
                                        control={
                                            <Radio />
                                        }
                                        label={
                                            <div>
                                                <strong>
                                                    Recruiter
                                                </strong>

                                                <span>
                                                    Find and connect with talent
                                                </span>
                                            </div>
                                        }
                                    />

                                </RadioGroup>
                            )}
                        />

                        {errors.role && (
                            <FormHelperText>
                                {errors.role.message}
                            </FormHelperText>
                        )}

                    </FormControl>


                    {/* PASSWORD */}

                    <TextField
                        label="Password"
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        {...register("password")}
                        error={
                            !!errors.password
                        }
                        helperText={
                            errors.password?.message
                        }
                        fullWidth
                        className="register-field"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">

                                        <IconButton
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>

                                    </InputAdornment>
                                ),
                            },
                        }}
                    />


                    {/* CONFIRM PASSWORD */}

                    <TextField
                        label="Confirm password"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        {...register(
                            "confirm_password"
                        )}
                        error={
                            !!errors.confirm_password
                        }
                        helperText={
                            errors.confirm_password
                                ?.message
                        }
                        fullWidth
                        className="register-field"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">

                                        <IconButton
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>

                                    </InputAdornment>
                                ),
                            },
                        }}
                    />


                    {/* SUBMIT */}

                    <Button
                        type="submit"
                        size="large"
                        className="register-button"
                        fullWidth
                    >
                        Create account
                        <span className="register-button-arrow">
                            →
                        </span>
                    </Button>


                    {/* LOGIN */}

                    <Box className="register-login-link">

                        <Typography variant="body2">

                            Already have a
                            TalentBridge account?{" "}

                            <Link
                                component={RouterLink}
                                to="/login"
                                underline="hover"
                            >
                                Sign in →
                            </Link>

                        </Typography>

                    </Box>


                    {/* SECURITY */}

                    <Box className="register-security">

                        <span className="register-security-icon">
                            ✓
                        </span>

                        <Typography variant="caption">
                            Your account information is
                            securely protected.
                        </Typography>

                    </Box>

                </Box>

            </CardContent>

        </Card>
    );
}


export default RegisterForm;

