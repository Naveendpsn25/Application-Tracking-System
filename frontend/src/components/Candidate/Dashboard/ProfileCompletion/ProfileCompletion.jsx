import { useNavigate } from "react-router-dom";
import "./ProfileCompletion.css";

function ProfileCompletion({ profile }) {
    const navigate = useNavigate();

    const requiredFields = [
        "resume",
        "date_of_birth",
        "gender",
        "phone_number",
        "highest_qualification",
        "specialization",
        "college_name",
        "graduation_year",
        "cgpa",
        "current_location",
        "preferred_location",
        "skills",
        "summary",
    ];

    const isFieldCompleted = (value) => {
        if (value === null || value === undefined) {
            return false;
        }

        if (typeof value === "string") {
            return value.trim() !== "";
        }

        if (Array.isArray(value)) {
            return value.length > 0;
        }

        return true;
    };

    const completedFields = requiredFields.filter((field) =>
        isFieldCompleted(profile?.[field])
    );

    const missingFields = requiredFields.filter(
        (field) => !isFieldCompleted(profile?.[field])
    );

    const completionPercentage = Math.round(
        (completedFields.length / requiredFields.length) * 100
    );

    const remainingFields = missingFields.length;

    const formatFieldName = (field) => {
        return field
            .replaceAll("_", " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const visibleMissingFields = missingFields.slice(0, 3);

    return (
        <section className="profile-completion">
            {/* Header */}
            <div className="profile-completion__header">
                <div className="profile-completion__heading">
                    <span className="profile-completion__eyebrow">
                        Profile Status
                    </span>

                    <h2>Profile Completion</h2>

                    <p>
                        Complete your profile to improve your
                        job opportunities.
                    </p>
                </div>

                <div
                    className="profile-completion__percentage"
                    aria-label={`Profile ${completionPercentage}% complete`}
                >
                    {completionPercentage}%
                </div>
            </div>

            {/* Progress */}
            <div
                className="profile-completion__progress"
                role="progressbar"
                aria-valuenow={completionPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
            >
                <div
                    className="profile-completion__progress-bar"
                    style={{
                        width: `${completionPercentage}%`,
                    }}
                />
            </div>

            {/* Completion text */}
            <div className="profile-completion__status">
                {remainingFields === 0 ? (
                    <span className="profile-completion__success">
                        ✓ Your profile is complete
                    </span>
                ) : (
                    <span>
                        {remainingFields}{" "}
                        {remainingFields === 1
                            ? "required field"
                            : "required fields"}{" "}
                        remaining
                    </span>
                )}
            </div>

            {/* Missing fields */}
            {remainingFields > 0 && (
                <div className="profile-completion__missing">
                    <div className="profile-completion__missing-header">
                        <span>What's missing</span>
                    </div>

                    <div className="profile-completion__missing-list">
                        {visibleMissingFields.map((field) => (
                            <div
                                key={field}
                                className="profile-completion__missing-item"
                            >
                                <span className="profile-completion__missing-dot">
                                    •
                                </span>

                                <span>
                                    {formatFieldName(field)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {remainingFields > 3 && (
                        <span className="profile-completion__more">
                            + {remainingFields - 3} more fields
                        </span>
                    )}
                </div>
            )}

            {/* Complete profile */}
            <button
                type="button"
                className="profile-completion__button"
                onClick={() => navigate("/profile")}
            >
                {remainingFields === 0
                    ? "View My Profile"
                    : "Complete My Profile"}
            </button>
        </section>
    );
}

export default ProfileCompletion;