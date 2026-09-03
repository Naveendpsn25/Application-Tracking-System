import { useEffect, useState } from "react";

import {
    getCandidateProfile,
    updateCandidateProfile,
} from "../../../../services/candidate/candidateProfileService";

import "./ProfessionalSummary.css";

function ProfessionalSummary() {
    const [summary, setSummary] = useState("");
    const [formValue, setFormValue] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // ==================================================
    // LOAD SUMMARY
    // ==================================================

    const fetchSummary = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getCandidateProfile();

            const profileSummary = result?.data?.summary || "";

            setSummary(profileSummary);
            setFormValue(profileSummary);
        } catch (error) {
            console.error("Professional summary fetch error:", error);

            setError(
                error.message ||
                    "Unable to load professional summary."
            );
        } finally {
            setLoading(false);
        }
    };

    // ==================================================
    // INITIAL LOAD
    // ==================================================

   useEffect(() => {
        let isMounted = true;

        const loadSummary = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await getCandidateProfile();

                if (!isMounted) return;

                const profileSummary = result?.data?.summary || "";

                setSummary(profileSummary);
                setFormValue(profileSummary);
            } catch (error) {
                if (!isMounted) return;

                console.error(
                    "Professional summary fetch error:",
                    error
                );

                setError(
                    error.message ||
                        "Unable to load professional summary."
                );
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadSummary();

        return () => {
            isMounted = false;
        };
}, []);

    // ==================================================
    // OPEN ADD / EDIT
    // ==================================================

    const handleEdit = () => {
        setError("");
        setSuccessMessage("");

        setFormValue(summary);
        setIsEditing(true);
    };

    // ==================================================
    // CANCEL
    // ==================================================

    const handleCancel = () => {
        setError("");
        setSuccessMessage("");

        setFormValue(summary);
        setIsEditing(false);
    };

    // ==================================================
    // SAVE SUMMARY
    // ==================================================

    const handleSave = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccessMessage("");

            await updateCandidateProfile({
                summary: formValue.trim(),
            });

            // Backend remains the source of truth.
            await fetchSummary();

            setIsEditing(false);

            setSuccessMessage(
                "Professional summary updated successfully."
            );
        } catch (error) {
            console.error(
                "Professional summary update error:",
                error
            );

            setError(
                error.message ||
                    "Unable to update professional summary."
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
            <section className="professional-summary-section">
                <div className="professional-summary-card">
                    <div className="professional-summary-loading">
                        Loading professional summary...
                    </div>
                </div>
            </section>
        );
    }

    // ==================================================
    // MAIN UI
    // ==================================================

    return (
        <section className="professional-summary-section">
            <div className="professional-summary-card">

                {/* ================================
                    HEADER
                ================================= */}

                <div className="professional-summary-header">
                    <div className="professional-summary-heading">
                        <h2 className="professional-summary-title">
                            Professional Summary
                        </h2>

                        <p className="professional-summary-description">
                            Tell recruiters about your experience,
                            strengths, career goals, and what you
                            can bring to a role.
                        </p>
                    </div>

                    {!isEditing && (
                        <button
                            type="button"
                            className="professional-summary-action"
                            onClick={handleEdit}
                        >
                            {summary
                                ? "Edit Summary"
                                : "Add Summary"}
                        </button>
                    )}
                </div>

                {/* ================================
                    MESSAGES
                ================================= */}

                {error && (
                    <div className="professional-summary-message professional-summary-message--error">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="professional-summary-message professional-summary-message--success">
                        {successMessage}
                    </div>
                )}

                {/* ================================
                    EDIT FORM
                ================================= */}

                {isEditing ? (
                    <form
                        className="professional-summary-form"
                        onSubmit={handleSave}
                    >
                        <div className="professional-summary-field">
                            <label htmlFor="professional-summary">
                                Professional Summary
                            </label>

                            <textarea
                                id="professional-summary"
                                value={formValue}
                                onChange={(event) =>
                                    setFormValue(event.target.value)
                                }
                                placeholder="Write a brief professional summary..."
                                rows={7}
                                disabled={saving}
                            />
                        </div>

                        <div className="professional-summary-form-actions">
                            <button
                                type="button"
                                className="professional-summary-button professional-summary-button--secondary"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="professional-summary-button professional-summary-button--primary"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : summary
                                      ? "Save Changes"
                                      : "Save Summary"}
                            </button>
                        </div>
                    </form>
                ) : (
                    /* ================================
                       DISPLAY MODE
                    ================================= */

                    <div className="professional-summary-content">
                        {summary ? (
                            <p className="professional-summary-text">
                                {summary}
                            </p>
                        ) : (
                            <div className="professional-summary-empty">
                                <p>
                                    No professional summary has
                                    been added yet.
                                </p>

                                <button
                                    type="button"
                                    className="professional-summary-empty-action"
                                    onClick={handleEdit}
                                >
                                    Add your professional summary
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProfessionalSummary;