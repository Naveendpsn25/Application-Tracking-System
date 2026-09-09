import JobHeader from "../../../components/Recruiter/Jobs/JobHeader/JobHeader";
import JobList from "../../../components/Recruiter/Jobs/JobList/JobList";

import "./Jobs.css";

function Jobs() {
    return (
        <div className="recruiter-jobs-page">
            <JobHeader />
            <JobList />
        </div>
    );
}

export default Jobs;