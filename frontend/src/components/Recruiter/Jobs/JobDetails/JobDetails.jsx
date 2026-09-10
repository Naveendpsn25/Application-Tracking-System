import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./JobDetails.css";
import jobService from "../../../../services/job/jobService";


function JobDetails() {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const job = location.state?.job;

    const formatLabel = (value) => {
        if (!value) return "Not specified";

        return value
            .toLowerCase()
            .split("_")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(" ");
    };

    const formatSalary = (minimum, maximum, currency) => {
        if (!minimum && !maximum) {
            return "Not specified";
        }

        const formatNumber = (value) => {
            if (!value) return null;

            return new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 0,
            }).format(Number(value));
        };

        if (minimum && maximum) {
            return `${currency || "INR"} ${formatNumber(
                minimum
            )} - ${formatNumber(maximum)}`;
        }

        return `${currency || "INR"} ${formatNumber(
            minimum || maximum
        )}`;
    };

    const handleDeleteJob = async () => {
        try {
            setDeleteLoading(true);
            setDeleteError("");

            await jobService.deleteJob(job.id);

            navigate("/recruiter/jobs");
        } catch (error) {
            console.error("Job deletion failed:", error);

            setDeleteError(
                error.message ||
                    "Failed to delete job. Please try again."
            );
        } finally {
            setDeleteLoading(false);
        }
    };

    if (!job) {
        return (
            <div className="job-details-page">
                <div className="job-details-empty">
                    <div className="job-details-empty-icon">
                        💼
                    </div>

                    <h2>Job details unavailable</h2>

                    <p>
                        We couldn't find the selected job details.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/recruiter/jobs")}
                    >
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="job-details-page">

            {/* Header */}
            <div className="job-details-header">
                <button
                    type="button"
                    className="job-details-back-button"
                    onClick={() => navigate("/recruiter/jobs")}
                >
                    ←
                </button>

                <div>
                    <span className="job-details-label">
                        Hiring Workspace
                    </span>

                    <h1>Job Details</h1>

                    <p>
                        Review the complete details of this job
                        opening.
                    </p>
                </div>
            </div>

            {/* Main Job Information */}
            <section className="job-details-hero">

                <div className="job-details-title-row">

                    <div className="job-details-title-section">

                        <div className="job-details-icon">
                            💼
                        </div>

                        <div>
                            <h2>{job.job_title}</h2>

                            <p>
                                Job Code: {job.job_code}
                            </p>
                        </div>

                    </div>

                    <span
                        className={`job-details-status ${job.status?.toLowerCase()}`}
                    >
                        <span></span>
                        {formatLabel(job.status)}
                    </span>

                </div>

                <div className="job-details-location">
                    📍 {job.location}
                </div>

                <div className="job-details-tags">

                    <span>
                        {formatLabel(job.employment_type)}
                    </span>

                    <span>
                        {formatLabel(job.workplace_type)}
                    </span>

                    <span>
                        {formatLabel(job.experience_level)}
                    </span>

                    <span>
                        {job.vacancies}{" "}
                        {job.vacancies === 1
                            ? "Vacancy"
                            : "Vacancies"}
                    </span>

                </div>

            </section>

            {/* Overview */}
            <section className="job-details-section">

                <div className="job-details-section-heading">
                    <h2>Job Overview</h2>
                    <p>Key information about this position.</p>
                </div>

                <div className="job-details-overview-grid">

                    <div className="job-details-info-card">
                        <span>Experience</span>
                        <strong>
                            {job.minimum_experience} -{" "}
                            {job.maximum_experience} years
                        </strong>
                    </div>

                    <div className="job-details-info-card">
                        <span>Salary</span>
                        <strong>
                            {formatSalary(
                                job.minimum_salary,
                                job.maximum_salary,
                                job.currency
                            )}
                        </strong>
                    </div>

                    <div className="job-details-info-card">
                        <span>Qualification</span>
                        <strong>
                            {job.qualification ||
                                "Not specified"}
                        </strong>
                    </div>

                    <div className="job-details-info-card">
                        <span>Application Deadline</span>
                        <strong>
                            {job.application_deadline ||
                                "No deadline"}
                        </strong>
                    </div>

                </div>

            </section>

            {/* Company Information */}
            <section className="job-details-section">

                <div className="job-details-section-heading">
                    <h2>Company Information</h2>
                    <p>Organization details for this opening.</p>
                </div>

                <div className="job-details-company-card">

                    <div className="job-details-company-icon">
                        🏢
                    </div>

                    <div>
                        <h3>
                            {job.company_name ||
                                "Company"}
                        </h3>

                        <p>
                            📍 {job.city}, {job.state},{" "}
                            {job.country}
                        </p>
                    </div>

                </div>

            </section>

            {/* Requirements */}
            <section className="job-details-section">

                <div className="job-details-section-heading">
                    <h2>Requirements</h2>
                    <p>Skills and qualifications expected.</p>
                </div>

                <div className="job-details-content-card">

                    <h3>Required Skills</h3>

                    <p>
                        {job.required_skills ||
                            "No specific skills provided."}
                    </p>

                </div>

            </section>

            {/* Job Description */}
            <section className="job-details-section">

                <div className="job-details-section-heading">
                    <h2>Job Description</h2>
                    <p>Details about the position.</p>
                </div>

                <div className="job-details-content-card">

                    <h3>Description</h3>

                    <p>
                        {job.job_description ||
                            "No job description provided."}
                    </p>

                    {job.responsibilities && (
                        <div className="job-details-responsibilities">
                            <h3>Responsibilities</h3>

                            <p>
                                {job.responsibilities}
                            </p>
                        </div>
                    )}

                </div>

            </section>

            {/* Footer Actions */}
            <div className="job-details-actions">
                <button
                    type="button"
                    className="job-details-secondary-button"
                    onClick={() => navigate("/recruiter/jobs")}
                >
                    ← Back to Jobs
                </button>

                <div className="job-details-action-group">
                    <button
                        type="button"
                        className="job-details-delete-button"
                        onClick={() => {
                            setDeleteError("");
                            setShowDeleteConfirm(true);
                        }}
                    >
                        Delete Job
                    </button>

                    <button
                        type="button"
                        className="job-details-primary-button"
                        onClick={() =>
                            navigate(
                                `/recruiter/jobs/edit/${job.id}`,
                                {
                                    state: { job },
                                }
                            )
                        }
                    >
                        Edit Job
                    </button>
                </div>
            </div>

            {showDeleteConfirm && (
    <div
        className="job-delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-delete-title"
    >
        <div className="job-delete-modal-card">
            <div className="job-delete-modal-icon">
                🗑️
            </div>

            <h2 id="job-delete-title">
                Delete this job?
            </h2>

            <p>
                Are you sure you want to delete{" "}
                <strong>{job.job_title}</strong>?
                This action cannot be undone.
            </p>

            {deleteError && (
                <div
                    className="job-delete-modal-error"
                    role="alert"
                >
                    ⚠️ {deleteError}
                </div>
            )}

            <div className="job-delete-modal-actions">
                <button
                    type="button"
                    className="job-delete-cancel-button"
                    onClick={() => {
                        setDeleteError("");
                        setShowDeleteConfirm(false);
                    }}
                    disabled={deleteLoading}
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="job-delete-confirm-button"
                    onClick={handleDeleteJob}
                    disabled={deleteLoading}
                >
                    {deleteLoading
                        ? "Deleting..."
                        : "Yes, Delete Job"}
                </button>
            </div>
        </div>
    </div>
)}

        </div>
    );
}

export default JobDetails;