import { useNavigate } from "react-router-dom";

import "./CreateJob.css";

import JobForm from "../JobForm/JobForm";

function CreateJob() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/recruiter/jobs");
    };

    return (
        <div className="create-job-page">

            <div className="create-job-header">

                <div className="create-job-header-content">
                    <button
                        type="button"
                        className="create-job-back-button"
                        onClick={handleBack}
                        aria-label="Back to jobs"
                    >
                        ←
                    </button>

                    <div>
                        <span className="create-job-label">
                            Hiring Workspace
                        </span>

                        <h1>Create Job</h1>

                        <p>
                            Create a new job opening for your company.
                        </p>
                    </div>
                </div>

            </div>

            <JobForm />

        </div>
    );
}

export default CreateJob;