import { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import jobService from "../../../../services/job/jobService";
import "./JobList.css";

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadJobs = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await jobService.getJobs();

                setJobs(response?.data || []);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
                setError(error.message || "Failed to load jobs.");
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    if (loading) {
        return (
            <div className="job-list-state">
                <p>Loading jobs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="job-list-state job-list-error">
                <p>{error}</p>
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="job-list-state">
                <p>No jobs found.</p>
            </div>
        );
    }

    return (
        <div className="job-list">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}

export default JobList;