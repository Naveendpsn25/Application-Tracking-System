import { useLocation, useNavigate } from "react-router-dom";

import JobForm from "../../../../pages/Recruiter/Jobs/JobForm/JobForm";

import "./EditJob.css";

function EditJob() {
    const navigate = useNavigate();
    const location = useLocation();

    const job = location.state?.job;

    const handleBack = () => {
        navigate("/recruiter/jobs");
    };

    if (!job) {
        return (
            <div className="edit-job-page">
                <div className="edit-job-empty">
                    <div className="edit-job-empty-icon">
                        💼
                    </div>

                    <h2>Job not found</h2>

                    <p>
                        We couldn't find the job you want to edit.
                    </p>

                    <button
                        type="button"
                        onClick={handleBack}
                    >
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-job-page">

            <div className="edit-job-header">
                <div className="edit-job-header-content">

                    <button
                        type="button"
                        className="edit-job-back-button"
                        onClick={handleBack}
                        aria-label="Back to jobs"
                    >
                        ←
                    </button>

                    <div>
                        <span className="edit-job-label">
                            Hiring Workspace
                        </span>

                        <h1>Edit Job</h1>

                        <p>
                            Update the details of this job opening.
                        </p>
                    </div>

                </div>
            </div>

            <div className="edit-job-summary">

                <div className="edit-job-summary-icon">
                    💼
                </div>

                <div>
                    <h2>{job.job_title}</h2>

                    <p>
                        Job Code: {job.job_code}
                    </p>
                </div>

            </div>

            <JobForm
                mode="edit"
                job={job}
            />

        </div>
    );
}

export default EditJob;