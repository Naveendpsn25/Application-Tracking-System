import "./ResumeSection.css";

function ResumeSection({ profile }) {
    return (
        <section className="profile-section resume-section">

            <div className="resume-section__content">

                <div>
                    <h2 className="profile-section__title">
                        Resume
                    </h2>

                    <p className="resume-section__description">
                        Keep your latest resume available for job
                        applications.
                    </p>
                </div>

                <div className="resume-section__action">
                    {profile.resume ? (
                        <a
                            href={profile.resume}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View Resume
                        </a>
                    ) : (
                        <button type="button">
                            Upload Resume
                        </button>
                    )}
                </div>

            </div>

        </section>
    );
}

export default ResumeSection;