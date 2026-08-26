import { useNavigate } from "react-router-dom";
import "./RecommendedJobs.css";

const recommendedJobs = [
    {
        id: 1,
        title: "Python Developer",
        company: "TechNova Solutions",
        location: "Bangalore",
        type: "Full-time",
        experience: "0–2 years",
        skills: ["Python", "Django", "PostgreSQL"],
        posted: "2 days ago",
    },
    {
        id: 2,
        title: "Django Developer",
        company: "Innovate Labs",
        location: "Chennai",
        type: "Full-time",
        experience: "0–2 years",
        skills: ["Django", "DRF", "PostgreSQL"],
        posted: "3 days ago",
    },
    {
        id: 3,
        title: "Frontend Developer",
        company: "Digital Works",
        location: "Bangalore",
        type: "Full-time",
        experience: "0–1 year",
        skills: ["React", "JavaScript", "CSS"],
        posted: "5 days ago",
    },
];

function RecommendedJobs() {
    const navigate = useNavigate();

    const handleViewAll = () => {
        navigate("/jobs");
    };

    const handleViewJob = (jobId) => {
        navigate(`/jobs/${jobId}`);
    };

    return (
        <section className="recommended-jobs">
            <div className="recommended-jobs__header">
                <div>
                    <span className="recommended-jobs__eyebrow">
                        JOBS
                    </span>

                    <h2>Recommended for you</h2>

                    <p>
                        Opportunities that match your profile
                        and skills.
                    </p>
                </div>

                <button
                    type="button"
                    className="recommended-jobs__view-all"
                    onClick={handleViewAll}
                >
                    View all
                </button>
            </div>

            <div className="recommended-jobs__list">
                {recommendedJobs.slice(0, 3).map((job) => (
                    <article
                        key={job.id}
                        className="recommended-job"
                    >
                        <div className="recommended-job__main">
                            <h3>{job.title}</h3>

                            <p className="recommended-job__company">
                                {job.company}
                            </p>

                            <div className="recommended-job__meta">
                                <span>
                                    {job.location}
                                </span>

                                <span>•</span>

                                <span>
                                    {job.type}
                                </span>

                                <span>•</span>

                                <span>
                                    {job.experience}
                                </span>
                            </div>

                            <div className="recommended-job__skills">
                                {job.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="recommended-job__skill"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="recommended-job__side">
                            <span className="recommended-job__posted">
                                {job.posted}
                            </span>

                            <button
                                type="button"
                                className="recommended-job__button"
                                onClick={() =>
                                    handleViewJob(job.id)
                                }
                            >
                                View job
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default RecommendedJobs;