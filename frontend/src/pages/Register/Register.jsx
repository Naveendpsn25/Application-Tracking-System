
import { Box } from "@mui/material";

import PublicLayout from "../../layouts/PublicLayout/PublicLayout";
import RegisterForm from "../../components/Auth/RegisterForm/RegisterForm";

import "./Register.css";

function Register() {
    return (
        <PublicLayout>
            <Box className="register-page">

                <div className="register-brand-header">
                    <div className="register-brand">
                        TalentBridge
                    </div>

                    <div className="register-brand-divider">
                        Applicant Tracking System
                    </div>
                </div>

                <div className="register-shell">

                    {/* LEFT — TALENTBRIDGE INFORMATION */}
                    <section className="register-info-panel">

                        <span className="register-info-label">
                            TALENTBRIDGE
                        </span>

                        <h1>
                            Start your journey
                            <br />
                            with TalentBridge.
                        </h1>

                        <p className="register-info-description">
                            TalentBridge brings candidates and opportunities
                            together in one connected hiring platform.
                            Create your account and take the first step
                            toward your next opportunity.
                        </p>

                        <div className="register-feature-list">

                            <div className="register-feature-card">
                                <div className="register-feature-number">
                                    01
                                </div>

                                <div>
                                    <h3>
                                        Find Opportunities
                                    </h3>

                                    <p>
                                        Discover roles that match your
                                        skills and career goals.
                                    </p>
                                </div>
                            </div>

                            <div className="register-feature-card">
                                <div className="register-feature-number">
                                    02
                                </div>

                                <div>
                                    <h3>
                                        Build Your Profile
                                    </h3>

                                    <p>
                                        Showcase your skills and experience
                                        to potential employers.
                                    </p>
                                </div>
                            </div>

                            <div className="register-feature-card">
                                <div className="register-feature-number">
                                    03
                                </div>

                                <div>
                                    <h3>
                                        Track Your Journey
                                    </h3>

                                    <p>
                                        Stay organized from application
                                        to hiring.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </section>

                    {/* RIGHT — EXISTING REGISTRATION FORM */}
                    <section className="register-form-panel">
                        <RegisterForm />
                    </section>

                </div>

            </Box>
        </PublicLayout>
    );
}

export default Register;