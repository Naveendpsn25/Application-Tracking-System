import "./LocationInfo.css";

function LocationInfo({ profile }) {
    return (
        <section className="profile-section location-info">

            <h2 className="profile-section__title">
                Location Preferences
            </h2>

            <div className="location-info__grid">

                <div className="location-info__card">
                    <span>Current Location</span>
                    <strong>
                        {profile.current_location || "Not provided"}
                    </strong>
                </div>

                <div className="location-info__arrow">
                    →
                </div>

                <div className="location-info__card">
                    <span>Preferred Location</span>
                    <strong>
                        {profile.preferred_location || "Not provided"}
                    </strong>
                </div>

            </div>

        </section>
    );
}

export default LocationInfo;