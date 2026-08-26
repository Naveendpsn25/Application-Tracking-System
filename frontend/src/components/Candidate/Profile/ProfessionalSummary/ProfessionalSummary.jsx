import "./ProfessionalSummary.css";

function ProfessionalSummary({ profile }) {
    return (
        <section className="profile-section professional-summary">

            <h2 className="profile-section__title">
                Professional Summary
            </h2>

            <div className="professional-summary__skills">

                <span className="professional-summary__label">
                    Skills
                </span>

                <div className="professional-summary__tags">
                    {(profile.skills || "")
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean)
                        .map((skill) => (
                            <span
                                className="professional-summary__tag"
                                key={skill}
                            >
                                {skill}
                            </span>
                        ))}
                </div>

            </div>

            <div className="professional-summary__text">
                <span className="professional-summary__label">
                    About
                </span>

                <p>
                    {profile.summary || "No professional summary provided."}
                </p>
            </div>

        </section>
    );
}

export default ProfessionalSummary;