import "./CareerInfo.css";

function CareerInfo({ profile }) {
    const isFresher = profile.career_status === "FRESHER";

    return (
        <section className="profile-section career-info">

            <div className="career-info__header">
                <h2 className="profile-section__title">
                    Career Information
                </h2>

                <span className="career-info__status">
                    {isFresher ? "Fresher" : "Experienced"}
                </span>
            </div>

            <div className="career-info__grid">

                <div className="career-info__item">
                    <span>Career Status</span>
                    <strong>
                        {isFresher ? "Fresher" : "Experienced"}
                    </strong>
                </div>

                {isFresher ? (
                    <>
                        <div className="career-info__item">
                            <span>Experience</span>
                            <strong>0 Years</strong>
                        </div>

                        <div className="career-info__item">
                            <span>Expected CTC</span>
                            <strong>
                                {profile.expected_ctc
                                    ? `${profile.expected_ctc} LPA`
                                    : "Not provided"}
                            </strong>
                        </div>

                        <div className="career-info__item">
                            <span>Notice Period</span>
                            <strong>
                                {profile.notice_period
                                    ? `${profile.notice_period} Days`
                                    : "Not provided"}
                            </strong>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="career-info__item">
                            <span>Experience</span>
                            <strong>
                                {profile.experience_years} Years
                            </strong>
                        </div>

                        <div className="career-info__item">
                            <span>Current Company</span>
                            <strong>
                                {profile.current_company || "Not provided"}
                            </strong>
                        </div>

                        <div className="career-info__item">
                            <span>Current CTC</span>
                            <strong>
                                {profile.current_ctc
                                    ? `${profile.current_ctc} LPA`
                                    : "Not provided"}
                            </strong>
                        </div>

                        <div className="career-info__item">
                            <span>Expected CTC</span>
                            <strong>
                                {profile.expected_ctc
                                    ? `${profile.expected_ctc} LPA`
                                    : "Not provided"}
                            </strong>
                        </div>

                        <div className="career-info__item">
                            <span>Notice Period</span>
                            <strong>
                                {profile.notice_period
                                    ? `${profile.notice_period} Days`
                                    : "Not provided"}
                            </strong>
                        </div>
                    </>
                )}

            </div>
        </section>
    );
}

export default CareerInfo;