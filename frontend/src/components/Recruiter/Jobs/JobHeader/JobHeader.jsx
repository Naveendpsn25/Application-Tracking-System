import { useNavigate } from "react-router-dom";

import "./JobHeader.css";

function JobHeader() {
    const navigate = useNavigate();

    const handleCreateJob = () => {
        navigate("/recruiter/jobs/create");
    };

    return (
        <section className="job-header">
            <div className="job-header-content">
                <div className="job-header-icon">
                    💼
                </div>

                <div className="job-header-text">
                    <span className="job-header-label">
                        Hiring Workspace
                    </span>

                    <h1>Jobs</h1>

                    <p>
                        Create, manage, and track your company's job openings.
                    </p>
                </div>
            </div>

            <button
                type="button"
                className="job-header-create-button"
                onClick={handleCreateJob}
            >
                <span className="job-header-create-icon">+</span>
                Create Job
            </button>
        </section>
    );
}

export default JobHeader;