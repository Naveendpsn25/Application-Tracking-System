import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/auth/authStore";
import { loginUser } from "../../services/auth/authService";

import "./LoginForm.css";

function LoginForm() {
    const navigate = useNavigate();

    const login  = useAuthStore((state) => state.login);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.trim()) {
        setError("Please enter your email address.");
        return;
    }

    if (!formData.password) {
        setError("Please enter your password.");
        return;
    }

    try {
        setLoading(true);
        setError("");

        const result = await loginUser(formData);

        // console.log("LOGIN RESPONSE:", result);

        if (!result?.success) {
            throw new Error(
                result?.message || "Unable to sign in."
            );
        }

        const userData = result.data;

        /*
         * Store authentication data through Zustand.
         */
        login({
            access: userData.access,
            refresh: userData.refresh,
            user: {
                user_id: userData.user_id,
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                role: userData.role,
                is_approved: userData.is_approved,
            },
            rememberMe,
        });

        /*
         * Redirect based on role.
         */
        switch (userData.role) {
            case "SUPER_ADMIN":
                navigate("/admin", {
                    replace: true,
                });
                break;

            case "RECRUITER":

                if (!userData.is_approved) {
                    navigate("/recruiter/pending", {
                        replace: true,
                    });
                    break;
                }

                navigate("/recruiter", {
                    replace: true,
                });
                break;

            case "CANDIDATE":
                navigate("/candidate", {
                    replace: true,
                });
                break;

            default:
                setError("Unknown user role.");
        }

    } catch (error) {
        console.error("Login failed:", error);

        setError(
            error.message ||
            "Something went wrong. Please try again."
        );
    } finally {
        setLoading(false);
    }
};

    return (
        <section className="login-shell">
            {/* =========================================
                LEFT — TALENTBRIDGE BRAND PANEL
            ========================================== */}

            <aside className="login-brand-panel">
                <div className="brand-content">

                    <div className="brand-header">
                        <div className="brand-mark">
                            TB
                        </div>

                        <div>
                            <h1 className="brand-name">
                                TalentBridge
                            </h1>

                            <p className="brand-tagline">
                                Connecting talent with opportunity
                            </p>
                        </div>
                    </div>

                    <div className="brand-main">
                        <span className="brand-eyebrow">
                            YOUR CAREER. YOUR OPPORTUNITY.
                        </span>

                        <h2>
                            Find opportunities.
                            <br />
                            Build your future.
                        </h2>

                        <p className="brand-description">
                            TalentBridge brings candidates,
                            recruiters and companies together
                            through one connected hiring platform.
                        </p>
                    </div>

                    <div className="brand-features">

                        <div className="brand-feature">
                            <div className="feature-number">
                                01
                            </div>

                            <div>
                                <h3>
                                    Discover opportunities
                                </h3>

                                <p>
                                    Explore relevant roles and
                                    opportunities based on your
                                    career goals.
                                </p>
                            </div>
                        </div>

                        <div className="brand-feature">
                            <div className="feature-number">
                                02
                            </div>

                            <div>
                                <h3>
                                    Track your applications
                                </h3>

                                <p>
                                    Keep your job applications
                                    organized throughout the
                                    hiring journey.
                                </p>
                            </div>
                        </div>

                        <div className="brand-feature">
                            <div className="feature-number">
                                03
                            </div>

                            <div>
                                <h3>
                                    Connect with employers
                                </h3>

                                <p>
                                    Build meaningful connections
                                    with recruiters and companies.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="brand-decoration brand-circle-one" />
                <div className="brand-decoration brand-circle-two" />
            </aside>

            {/* =========================================
                RIGHT — LOGIN FORM
            ========================================== */}

            <div className="login-form-panel">

                <div className="login-form-container">

                    <div className="login-heading">
                        <span className="login-eyebrow">
                            ACCOUNT ACCESS
                        </span>

                        <h2>
                            Welcome back
                        </h2>

                        <p>
                            Sign in to continue your
                            TalentBridge journey.
                        </p>
                    </div>

                    {error && (
                        <div className="login-alert login-alert-error">
                            <span className="alert-icon">
                                !
                            </span>

                            <span>
                                {error}
                            </span>
                        </div>
                    )}

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

                        {/* EMAIL */}

                        <div className="form-field">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    @
                                </span>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    disabled={loading}
                                />

                            </div>

                        </div>

                        {/* PASSWORD */}

                        <div className="form-field">

                            <div className="password-label-row">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="forgot-password"
                                >
                                    Forgot password?
                                </Link>

                            </div>

                            <div className="input-wrapper">

                                <span className="input-icon">
                                    •
                                </span>

                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    disabled={loading}
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            (previous) =>
                                                !previous
                                        )
                                    }
                                    disabled={loading}
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                        </div>

                        {/* REMEMBER ME */}

                        <label className="remember-me">

                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(event) =>
                                    setRememberMe(
                                        event.target.checked
                                    )
                                }
                                disabled={loading}
                            />

                            <span className="custom-checkbox" />

                            <span>
                                Remember me
                            </span>

                        </label>

                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="login-submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="button-spinner" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <span className="button-arrow">
                                        →
                                    </span>
                                </>
                            )}
                        </button>

                    </form>

                    {/* REGISTER */}

                    <div className="create-account">

                        <span>
                            Don't have a TalentBridge account?
                        </span>

                        <Link to="/register">
                            Create an account →
                        </Link>

                    </div>

                    {/* SECURITY */}

                    <div className="security-message">

                        <span className="security-icon">
                            ✓
                        </span>

                        <span>
                            Your account information is
                            securely protected.
                        </span>

                    </div>

                    {/* FOOTER */}

                    <div className="login-footer">
                        © 2026 TalentBridge
                    </div>

                </div>
            </div>
        </section>
    );
}

export default LoginForm;