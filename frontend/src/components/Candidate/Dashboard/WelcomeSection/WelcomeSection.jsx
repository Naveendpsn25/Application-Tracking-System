function WelcomeSection({
    user,
    onBrowseJobs,
    onViewApplications,
}) {
    return (
        <section className="welcome-section">

            <div className="welcome-content">

                <span className="welcome-label">
                    CANDIDATE DASHBOARD
                </span>

                <h1>
                    Welcome back,{" "}
                    {user?.first_name || "Candidate"} 👋
                </h1>

                <p>
                    Stay on top of your applications, discover
                    new opportunities, and keep your job search
                    moving forward.
                </p>

                <div className="welcome-actions">

                    <button
                        className="welcome-primary-button"
                        onClick={onBrowseJobs}
                    >
                        Browse Jobs
                    </button>

                    <button
                        className="welcome-secondary-button"
                        onClick={onViewApplications}
                    >
                        My Applications
                    </button>

                </div>

            </div>

            <div className="welcome-visual">

                <div className="welcome-visual-card">
                    <span>JOB SEARCH</span>

                    <strong>
                        Keep moving forward.
                    </strong>

                    <p>
                        Discover opportunities that match
                        your skills and career goals.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default WelcomeSection;