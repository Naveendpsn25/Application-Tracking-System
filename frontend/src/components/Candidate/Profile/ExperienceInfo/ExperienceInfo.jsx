import { useEffect, useState } from "react";

import {
    getCandidateProfile,
    updateCandidateProfile,
} from "../../../../services/candidate/candidateProfileService";

import "./ExperienceInfo.css";

function ExperienceInfo() {
    const [careerStatus, setCareerStatus] = useState("FRESHER");

    const [experienceYears, setExperienceYears] = useState(0);
    const [currentCompany, setCurrentCompany] = useState("");
    const [currentCtc, setCurrentCtc] = useState("");
    const [expectedCtc, setExpectedCtc] = useState("");
    const [noticePeriod, setNoticePeriod] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // ==================================================
    // LOAD EXPERIENCE INFORMATION
    // ==================================================

    useEffect(() => {
        let isMounted = true;

        const loadExperienceInfo = async () => {
            try {
                const result = await getCandidateProfile();

                if (!isMounted) return;

                const data = result?.data;

                setCareerStatus(data?.career_status || "FRESHER");
                setExperienceYears(data?.experience_years || 0);
                setCurrentCompany(data?.current_company || "");
                setCurrentCtc(data?.current_ctc ?? "");
                setExpectedCtc(data?.expected_ctc ?? "");
                setNoticePeriod(data?.notice_period ?? "");
            } catch (error) {
                if (!isMounted) return;

                console.error(
                    "Experience information fetch error:",
                    error
                );

                setError(
                    error.message ||
                        "Unable to load experience information."
                );
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadExperienceInfo();

        return () => {
            isMounted = false;
        };
    }, []);

    // ==================================================
    // OPEN EDIT MODE
    // ==================================================

    const handleEdit = () => {
        setError("");
        setSuccessMessage("");
        setIsEditing(true);
    };

    // ==================================================
    // CANCEL
    // ==================================================

    const handleCancel = () => {
        setError("");
        setSuccessMessage("");
        setIsEditing(false);
    };

    // ==================================================
    // CAREER STATUS CHANGE
    // ==================================================

    const handleCareerStatusChange = (event) => {
        const value = event.target.value;

        setCareerStatus(value);

        if (value === "FRESHER") {
            setExperienceYears(0);
            setCurrentCompany("");
            setCurrentCtc("");
            setExpectedCtc("");
            setNoticePeriod("");
        }
    };

    // ==================================================
    // SAVE
    // ==================================================

    const handleSave = async (event) => {
        event.preventDefault();

        setError("");
        setSuccessMessage("");

        if (careerStatus === "EXPERIENCED") {
            if (!experienceYears || Number(experienceYears) <= 0) {
                setError(
                    "Experience years must be greater than 0."
                );
                return;
            }

            if (!currentCompany.trim()) {
                setError("Current company is required.");
                return;
            }

            if (
                currentCtc === "" ||
                currentCtc === null
            ) {
                setError("Current CTC is required.");
                return;
            }

            if (
                expectedCtc === "" ||
                expectedCtc === null
            ) {
                setError("Expected CTC is required.");
                return;
            }

            if (
                noticePeriod === "" ||
                noticePeriod === null
            ) {
                setError("Notice period is required.");
                return;
            }
        }

        try {
            setSaving(true);

            const profileData =
                careerStatus === "FRESHER"
                    ? {
                          career_status: "FRESHER",
                          experience_years: 0,
                          current_company: null,
                          current_ctc: null,
                          expected_ctc: null,
                          notice_period: null,
                      }
                    : {
                          career_status: "EXPERIENCED",
                          experience_years:
                              Number(experienceYears),
                          current_company:
                              currentCompany.trim(),
                          current_ctc: Number(currentCtc),
                          expected_ctc:
                              Number(expectedCtc),
                          notice_period:
                              Number(noticePeriod),
                      };

            await updateCandidateProfile(profileData);

            setIsEditing(false);

            setSuccessMessage(
                "Experience information updated successfully."
            );
        } catch (error) {
            console.error(
                "Experience information update error:",
                error
            );

            setError(
                error.message ||
                    "Unable to update experience information."
            );
        } finally {
            setSaving(false);
        }
    };

    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {
        return (
            <section className="experience-info-section">
                <div className="experience-info-card">
                    <div className="experience-info-loading">
                        Loading experience information...
                    </div>
                </div>
            </section>
        );
    }

    // ==================================================
    // DISPLAY MODE
    // ==================================================

    return (
        <section className="experience-info-section">
            <div className="experience-info-card">

                {/* HEADER */}

                <div className="experience-info-header">
                    <div className="experience-info-heading">
                        <h2 className="experience-info-title">
                            Experience Information
                        </h2>

                        <p className="experience-info-description">
                            Tell recruiters about your career
                            experience and current employment
                            details.
                        </p>
                    </div>

                    {!isEditing && (
                        <button
                            type="button"
                            className="experience-info-action"
                            onClick={handleEdit}
                        >
                            Edit Experience
                        </button>
                    )}
                </div>

                {/* MESSAGES */}

                {error && (
                    <div className="experience-info-message experience-info-message--error">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="experience-info-message experience-info-message--success">
                        {successMessage}
                    </div>
                )}

                {/* EDIT MODE */}

                {isEditing ? (
                    <form
                        className="experience-info-form"
                        onSubmit={handleSave}
                    >

                        {/* CAREER STATUS */}

                        <div className="experience-info-field">
                            <label htmlFor="career-status">
                                Career Status
                            </label>

                            <select
                                id="career-status"
                                value={careerStatus}
                                onChange={
                                    handleCareerStatusChange
                                }
                                disabled={saving}
                            >
                                <option value="FRESHER">
                                    Fresher
                                </option>

                                <option value="EXPERIENCED">
                                    Experienced
                                </option>
                            </select>
                        </div>

                        {/* EXPERIENCED FIELDS */}

                        {careerStatus === "EXPERIENCED" && (
                            <div className="experience-info-fields">

                                <div className="experience-info-field">
                                    <label htmlFor="experience-years">
                                        Years of Experience
                                    </label>

                                    <input
                                        id="experience-years"
                                        type="number"
                                        min="1"
                                        value={experienceYears}
                                        onChange={(event) =>
                                            setExperienceYears(
                                                event.target.value
                                            )
                                        }
                                        disabled={saving}
                                    />
                                </div>

                                <div className="experience-info-field">
                                    <label htmlFor="current-company">
                                        Current Company
                                    </label>

                                    <input
                                        id="current-company"
                                        type="text"
                                        value={currentCompany}
                                        onChange={(event) =>
                                            setCurrentCompany(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter current company"
                                        disabled={saving}
                                    />
                                </div>

                                <div className="experience-info-field">
                                    <label htmlFor="current-ctc">
                                        Current CTC
                                    </label>

                                    <input
                                        id="current-ctc"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={currentCtc}
                                        onChange={(event) =>
                                            setCurrentCtc(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter current CTC"
                                        disabled={saving}
                                    />
                                </div>

                                <div className="experience-info-field">
                                    <label htmlFor="expected-ctc">
                                        Expected CTC
                                    </label>

                                    <input
                                        id="expected-ctc"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={expectedCtc}
                                        onChange={(event) =>
                                            setExpectedCtc(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter expected CTC"
                                        disabled={saving}
                                    />
                                </div>

                                <div className="experience-info-field">
                                    <label htmlFor="notice-period">
                                        Notice Period
                                    </label>

                                    <input
                                        id="notice-period"
                                        type="number"
                                        min="0"
                                        value={noticePeriod}
                                        onChange={(event) =>
                                            setNoticePeriod(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Days"
                                        disabled={saving}
                                    />
                                </div>

                            </div>
                        )}

                        {careerStatus === "FRESHER" && (
                            <div className="experience-info-fresher">
                                <p>
                                    No professional experience
                                    details are required for
                                    freshers.
                                </p>
                            </div>
                        )}

                        {/* ACTIONS */}

                        <div className="experience-info-form-actions">
                            <button
                                type="button"
                                className="experience-info-button experience-info-button--secondary"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="experience-info-button experience-info-button--primary"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>
                        </div>
                    </form>
                ) : (
                    /* DISPLAY MODE */

                    <div className="experience-info-content">

                        <div className="experience-info-grid">

                            <div className="experience-info-item">
                                <span className="experience-info-label">
                                    Career Status
                                </span>

                                <span className="experience-info-value">
                                    {careerStatus ===
                                    "EXPERIENCED"
                                        ? "Experienced"
                                        : "Fresher"}
                                </span>
                            </div>

                            {careerStatus ===
                                "EXPERIENCED" && (
                                <>
                                    <div className="experience-info-item">
                                        <span className="experience-info-label">
                                            Years of Experience
                                        </span>

                                        <span className="experience-info-value">
                                            {
                                                experienceYears
                                            }{" "}
                                            {Number(
                                                experienceYears
                                            ) === 1
                                                ? "year"
                                                : "years"}
                                        </span>
                                    </div>

                                    <div className="experience-info-item">
                                        <span className="experience-info-label">
                                            Current Company
                                        </span>

                                        <span className="experience-info-value">
                                            {currentCompany ||
                                                "Not provided"}
                                        </span>
                                    </div>

                                    <div className="experience-info-item">
                                        <span className="experience-info-label">
                                            Current CTC
                                        </span>

                                        <span className="experience-info-value">
                                            {currentCtc !==
                                            ""
                                                ? currentCtc
                                                : "Not provided"}
                                        </span>
                                    </div>

                                    <div className="experience-info-item">
                                        <span className="experience-info-label">
                                            Expected CTC
                                        </span>

                                        <span className="experience-info-value">
                                            {expectedCtc !==
                                            ""
                                                ? expectedCtc
                                                : "Not provided"}
                                        </span>
                                    </div>

                                    <div className="experience-info-item">
                                        <span className="experience-info-label">
                                            Notice Period
                                        </span>

                                        <span className="experience-info-value">
                                            {noticePeriod !==
                                            ""
                                                ? `${noticePeriod} days`
                                                : "Not provided"}
                                        </span>
                                    </div>
                                </>
                            )}

                        </div>

                    </div>
                )}
            </div>
        </section>
    );
}

export default ExperienceInfo;