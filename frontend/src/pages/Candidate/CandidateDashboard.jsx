import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/auth/authStore";

import WelcomeSection from "../../components/Candidate/Dashboard/WelcomeSection/WelcomeSection";
import ProfileCompletion from "../../components/Candidate/Dashboard/ProfileCompletion/ProfileCompletion";
import RecommendedJobs from "../../components/Candidate/Dashboard/RecommendedJobs/RecommendedJobs";
import InterviewSection from "../../components/Candidate/Dashboard/InterviewSection/InterviewSection";
import SavedJobs from "../../components/Candidate/Dashboard/SavedJobs/SavedJobs";


import { getCandidateProfile } from "../../services/candidate/candidateService";

import "./CandidateDashboard.css";

function CandidateDashboard() {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getCandidateProfile();

                setProfile(response.data);
            } catch (error) {
                console.error(
                    "Failed to fetch candidate profile:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load your profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <main className="candidate-dashboard">

            <div className="dashboard-container">

                <WelcomeSection
                    user={user}
                    onBrowseJobs={() => navigate("/jobs")}
                    onViewApplications={() =>
                        navigate("/my-applications")
                    }
                />

                {loading && (
                    <div className="dashboard-loading">
                        Loading your dashboard...
                    </div>
                )}

                {!loading && error && (
                    <div className="dashboard-error">
                        {error}
                    </div>
                )}

                {!loading && !error && profile && (
                    <>
                        <section className="dashboard-stats">

                            <div className="stat-card">
                                <span className="stat-label">
                                    Applications
                                </span>

                                <strong className="stat-value">
                                    0
                                </strong>

                                <span className="stat-description">
                                    Total applications
                                </span>
                            </div>

                            <div className="stat-card">
                                <span className="stat-label">
                                    Interviews
                                </span>

                                <strong className="stat-value">
                                    0
                                </strong>

                                <span className="stat-description">
                                    Upcoming interviews
                                </span>
                            </div>

                            <div className="stat-card">
                                <span className="stat-label">
                                    Shortlisted
                                </span>

                                <strong className="stat-value">
                                    0
                                </strong>

                                <span className="stat-description">
                                    Applications shortlisted
                                </span>
                            </div>

                            <div className="stat-card">
                                <span className="stat-label">
                                    Saved Jobs
                                </span>

                                <strong className="stat-value">
                                    0
                                </strong>

                                <span className="stat-description">
                                    Jobs saved for later
                                </span>
                            </div>

                        </section>

                        <section className="dashboard-main-grid">

                            <div className="dashboard-card dashboard-overview">
                                <div className="dashboard-card-header">
                                    <div>
                                        <span className="dashboard-card-label">
                                            APPLICATIONS
                                        </span>

                                        <h2>
                                            Application Overview
                                        </h2>
                                    </div>

                                    <button
                                        className="dashboard-link-button"
                                        onClick={() =>
                                            navigate("/my-applications")
                                        }
                                    >
                                        View all
                                    </button>
                                </div>

                                <div className="empty-dashboard-state">
                                    <h3>
                                        No applications yet
                                    </h3>

                                    <p>
                                        Start applying to jobs and
                                        track your progress here.
                                    </p>

                                    <button
                                        className="dashboard-primary-button"
                                        onClick={() =>
                                            navigate("/jobs")
                                        }
                                    >
                                        Browse Jobs
                                    </button>
                                </div>
                            </div>

                            <ProfileCompletion
                                profile={profile}
                            />

                            <RecommendedJobs />

                            <InterviewSection interviews={[]} />

                            <SavedJobs jobs={[]} />

                        </section>

                    </>
                )}

            </div>

        </main>
    );
}

export default CandidateDashboard;