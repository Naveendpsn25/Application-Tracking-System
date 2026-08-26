import "./InterviewSection.css";

function InterviewSection({ interviews = [] }) {
    return (
        <section className="interview-section">
            <div className="interview-section__header">
                <div>
                    <span className="interview-section__eyebrow">
                        Interviews
                    </span>

                    <h2>Upcoming Interviews</h2>

                    <p>
                        Keep track of your upcoming interview schedule.
                    </p>
                </div>

                {interviews.length > 0 && (
                    <button
                        type="button"
                        className="interview-section__view-all"
                    >
                        View all
                    </button>
                )}
            </div>

            {interviews.length === 0 ? (
                <div className="interview-section__empty">
                    <h3>No upcoming interviews</h3>

                    <p>
                        Your scheduled interviews will appear here.
                    </p>
                </div>
            ) : (
                <div className="interview-section__list">
                    {interviews.map((interview) => (
                        <article
                            key={interview.id}
                            className="interview-card"
                        >
                            <div className="interview-card__content">
                                <h3>
                                    {interview.position}
                                </h3>

                                <p className="interview-card__company">
                                    {interview.company}
                                </p>

                                <div className="interview-card__details">
                                    <span>
                                        {interview.date}
                                    </span>

                                    <span>
                                        {interview.time}
                                    </span>

                                    <span>
                                        {interview.type}
                                    </span>
                                </div>
                            </div>

                            <div className="interview-card__actions">
                                <span className="interview-card__status">
                                    {interview.status}
                                </span>

                                <button
                                    type="button"
                                    className="interview-card__button"
                                >
                                    View details
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default InterviewSection;