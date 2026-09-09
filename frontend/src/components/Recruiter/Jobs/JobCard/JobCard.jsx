import "./JobCard.css";
import { useNavigate } from "react-router-dom";


function JobCard({ job }) {
    const navigate = useNavigate();
    const formatLabel = (value) => {
        if (!value) return "";

        return value
            .toLowerCase()
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const formatSalary = (salary) => {
        if (!salary) return null;

        const numericSalary = Number(salary);

        if (Number.isNaN(numericSalary)) return salary;

        return new Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 0,
        }).format(numericSalary);
    };

    const statusClass = job.status?.toLowerCase() || "unknown";

    return (
        <article className="job-card">
            <div className="job-card-top">
                <div className="job-card-title-section">
                    <div className="job-card-icon">
                        💼
                    </div>

                    <div>
                        <h2 className="job-card-title">
                            {job.job_title}
                        </h2>

                        <p className="job-card-code">
                            Job Code: {job.job_code}
                        </p>
                    </div>
                </div>

                <span className={`job-card-status ${statusClass}`}>
                    <span className="job-card-status-dot"></span>
                    {formatLabel(job.status)}
                </span>
            </div>

            <div className="job-card-location">
                <span className="job-card-location-icon">📍</span>
                <span>{job.location}</span>
            </div>

            <div className="job-card-tags">
                <span className="job-card-tag">
                    {formatLabel(job.employment_type)}
                </span>

                <span className="job-card-tag">
                    {formatLabel(job.workplace_type)}
                </span>

                <span className="job-card-tag">
                    {formatLabel(job.experience_level)}
                </span>
            </div>

            <div className="job-card-details">
                <div className="job-card-detail">
                    <span className="job-card-detail-label">
                        Experience
                    </span>

                    <strong>
                        {job.minimum_experience} -{" "}
                        {job.maximum_experience} years
                    </strong>
                </div>

                <div className="job-card-detail">
                    <span className="job-card-detail-label">
                        Salary
                    </span>

                    <strong>
                        {job.minimum_salary && job.maximum_salary
                            ? `${job.currency} ${formatSalary(
                                  job.minimum_salary
                              )} - ${formatSalary(job.maximum_salary)}`
                            : "Not specified"}
                    </strong>
                </div>

                <div className="job-card-detail">
                    <span className="job-card-detail-label">
                        Vacancies
                    </span>

                    <strong>
                        {job.vacancies}
                    </strong>
                </div>
            </div>

            <div className="job-card-footer">
                <div className="job-card-footer-info">
                    {job.is_featured && (
                        <span className="job-card-featured">
                            ⭐ Featured
                        </span>
                    )}

                    {job.application_deadline && (
                        <span className="job-card-deadline">
                            Deadline: {job.application_deadline}
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    className="job-card-view-button"
                     onClick={() =>
                        navigate("/recruiter/jobs/details", {
                            state: { job },
                        })
                    }
                >
                    View Details
                    <span>→</span>
                </button>
            </div>
        </article>
    );
}

export default JobCard;