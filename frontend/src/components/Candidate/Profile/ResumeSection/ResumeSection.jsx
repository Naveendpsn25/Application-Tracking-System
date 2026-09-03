import { useRef, useState } from "react";

import {
    uploadCandidateResume,
    removeCandidateResume,
} from "../../../../services/candidate/candidateProfileService";

import "./ResumeSection.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ResumeSection({ profile, onProfileRefresh }) {
    const fileInputRef = useRef(null);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const hasResume = Boolean(profile?.resume);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getResumeUrl = () => {
    if (!profile?.resume) {
        return "";
    }

    if (profile.resume.startsWith("http")) {
        return profile.resume;
    }

    const backendBaseUrl = API_BASE_URL.replace(/\/api\/?$/, "");

    return `${backendBaseUrl}${profile.resume}`;
};

    // ==================================================
    // FILE VALIDATION
    // ==================================================

    const validateResume = (file) => {
        if (!file) {
            return "Please select a resume file.";
        }

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        const allowedExtensions = [".pdf", ".doc", ".docx"];

        const fileName = file.name.toLowerCase();

        const hasValidExtension = allowedExtensions.some((extension) =>
            fileName.endsWith(extension)
        );

        const hasValidMimeType = allowedTypes.includes(file.type);

        if (!hasValidExtension || !hasValidMimeType) {
            return "Please upload a PDF, DOC, or DOCX file.";
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            return "Resume size must not exceed 5 MB.";
        }

        return "";
    };

    // ==================================================
    // OPEN FILE PICKER
    // ==================================================

    const handleChooseResume = () => {
        setError("");
        setSuccessMessage("");

        fileInputRef.current?.click();
    };

    // ==================================================
    // FILE SELECTED
    // ==================================================

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];

        // Allow selecting the same file again later.
        event.target.value = "";

        if (!file) {
            return;
        }

        setError("");
        setSuccessMessage("");

        const validationError = validateResume(file);

        if (validationError) {
            setError(validationError);
            return;
        }

        await handleResumeUpload(file);
    };

    // ==================================================
    // UPLOAD / REPLACE RESUME
    // ==================================================

    const handleResumeUpload = async (file) => {
        try {
            setSaving(true);
            setError("");
            setSuccessMessage("");

            await uploadCandidateResume(file);

            // Backend remains the source of truth.
            await onProfileRefresh();

            setSuccessMessage(
                hasResume
                    ? "Resume replaced successfully."
                    : "Resume uploaded successfully."
            );
        } catch (error) {
            console.error("Resume upload error:", error);

            setError(
                error.message ||
                    "Unable to upload resume."
            );
        } finally {
            setSaving(false);
        }
    };

    // ==================================================
    // REMOVE RESUME
    // ==================================================

    const handleRemoveResume = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to remove your resume?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccessMessage("");

            await removeCandidateResume();

            // Backend remains the source of truth.
            await onProfileRefresh();

            setSuccessMessage(
                "Resume removed successfully."
            );
        } catch (error) {
            console.error("Resume removal error:", error);

            setError(
                error.message ||
                    "Unable to remove resume."
            );
        } finally {
            setSaving(false);
        }
    };

    // ==================================================
    // VIEW RESUME
    // ==================================================

    const handleViewResume = () => {
        if (!profile?.resume) {
            return;
        }

        window.open(
            profile.resume,
            "_blank",
            "noopener,noreferrer"
        );
    };

    // ==================================================
    // MAIN UI
    // ==================================================

    return (
        <section className="resume-section">
            <div className="resume-card">

                {/* ==========================================
                    HEADER
                ========================================== */}

                <div className="resume-header">
                    <div className="resume-heading">
                        <h2 className="resume-title">
                            Resume
                        </h2>

                        <p className="resume-description">
                            Upload your latest resume so recruiters
                            can review your experience and
                            qualifications.
                        </p>
                    </div>
                </div>

                {/* ==========================================
                    MESSAGES
                ========================================== */}

                {error && (
                    <div className="resume-message resume-message--error">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="resume-message resume-message--success">
                        {successMessage}
                    </div>
                )}

                {/* ==========================================
                    HIDDEN FILE INPUT
                ========================================== */}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="resume-file-input"
                    onChange={handleFileChange}
                    disabled={saving}
                />

                {/* ==========================================
                    EMPTY STATE
                ========================================== */}

                {!hasResume && (
                    <div className="resume-empty-state">

                        <div className="resume-empty-icon">
                            <span>📄</span>
                        </div>

                        <h3 className="resume-empty-title">
                            Upload your resume
                        </h3>

                        <p className="resume-empty-description">
                            Add your latest resume to help
                            recruiters understand your
                            experience and qualifications.
                        </p>

                        <button
                            type="button"
                            className="resume-button resume-button--primary"
                            onClick={handleChooseResume}
                            disabled={saving}
                        >
                            {saving
                                ? "Uploading..."
                                : "Choose Resume"}
                        </button>

                        <p className="resume-supported-files">
                            <strong>Supported files:</strong>{" "}
                            PDF, DOC, DOCX
                            <span className="resume-supported-separator">
                                •
                            </span>
                            <strong>Maximum size:</strong> 5 MB
                        </p>
                    </div>
                )}

                {/* ==========================================
                    UPLOADED STATE
                ========================================== */}

                {hasResume && (
                    <div className="resume-uploaded-state">

                        {/* ======================================
                            CURRENT RESUME
                        ====================================== */}

                        <div className="resume-current-card">

                            <div className="resume-current-info">

                                <div className="resume-file-icon">
                                    <span>📄</span>
                                </div>

                                <div className="resume-file-details">

                                    <h3 className="resume-current-title">
                                        Current Resume
                                    </h3>

                                    <p className="resume-current-description">
                                        Your resume is currently
                                        uploaded.
                                    </p>

                                </div>
                            </div>

                            <div className="resume-current-actions">

                                <button
                                    type="button"
                                    className="resume-button resume-button--outline"
                                     onClick={() => {
                                        window.open(
                                            getResumeUrl(),
                                            "_blank",
                                            "noopener,noreferrer"
                                        );
                                    }}
                                    disabled={saving}
                                >
                                    View Resume
                                </button>

                                <button
                                    type="button"
                                    className="resume-button resume-button--danger-outline"
                                    onClick={handleRemoveResume}
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Removing..."
                                        : "Remove"}
                                </button>

                            </div>
                        </div>

                        {/* ======================================
                            REPLACE RESUME
                        ====================================== */}

                        <div className="resume-replace-area">

                            <button
                                type="button"
                                className="resume-button resume-button--primary"
                                onClick={handleChooseResume}
                                disabled={saving}
                            >
                                {saving
                                    ? "Uploading..."
                                    : "Replace Resume"}
                            </button>

                            <p className="resume-replace-description">
                                Upload a new resume to replace
                                your current one.
                            </p>

                        </div>

                        {/* ======================================
                            SUPPORTED FILES
                        ====================================== */}

                        <p className="resume-supported-files resume-supported-files--uploaded">
                            <strong>Supported files:</strong>{" "}
                            PDF, DOC, DOCX
                            <span className="resume-supported-separator">
                                •
                            </span>
                            <strong>Maximum size:</strong> 5 MB
                        </p>

                    </div>
                )}

            </div>
        </section>
    );
}

export default ResumeSection;