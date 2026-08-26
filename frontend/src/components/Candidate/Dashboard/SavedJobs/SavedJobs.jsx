import "./SavedJobs.css";

function SavedJobs({ jobs = [] }) {
    return (
        <section className="saved-jobs">
            <div className="saved-jobs__header">
                <div>
                    <span className="saved-jobs__eyebrow">
                        Saved Jobs
                    </span>

                    <h2>Jobs You Saved</h2>

                    <p>
                        Keep track of jobs you want to apply for later.
                    </p>
                </div>

                {jobs.length > 0 && (
                    <button
                        type="button"
                        className="saved-jobs__view-all"
                    >
                        View all
                    </button>
                )}
            </div>

            {jobs.length === 0 ? (
                <div className="saved-jobs__empty">
                    <div className="saved-jobs__empty-icon">
                        ★
                    </div>

                    <h3>No saved jobs yet</h3>

                    <p>
                        Jobs you bookmark will appear here.
                    </p>
                </div>
            ) : (
                <div className="saved-jobs__list">
                    {jobs.map((job) => (
                        <article
                            key={job.id}
                            className="saved-job"
                        >
                            <div className="saved-job__content">
                                <h3>{job.title}</h3>

                                <p className="saved-job__company">
                                    {job.company}
                                </p>

                                <div className="saved-job__meta">
                                    <span>
                                        {job.location}
                                    </span>

                                    <span>
                                        {job.type}
                                    </span>

                                    <span>
                                        Saved {job.savedDate}
                                    </span>
                                </div>
                            </div>

                            <div className="saved-job__actions">
                                <button
                                    type="button"
                                    className="saved-job__view"
                                >
                                    View job
                                </button>

                                <button
                                    type="button"
                                    className="saved-job__apply"
                                >
                                    Apply
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default SavedJobs;