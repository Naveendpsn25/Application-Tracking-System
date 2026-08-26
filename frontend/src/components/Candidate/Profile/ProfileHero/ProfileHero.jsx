import { useEffect, useState } from "react";

import "./ProfileHero.css";

function ProfileHero({
    profile,
    saving,
    onUpdate,
}) {
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        career_status: "FRESHER",
    });

    useEffect(() => {
        if (!profile) {
            return;
        }

        setFormData({
            first_name: profile.user?.first_name || "",
            last_name: profile.user?.last_name || "",
            career_status:
                profile.career_status || "FRESHER",
        });
    }, [profile]);

    if (!profile) {
        return null;
    }

    const fullName = [
        profile.user?.first_name,
        profile.user?.last_name,
    ]
        .filter(Boolean)
        .join(" ");

    const displayName =
        fullName || profile.user?.email || "Candidate";

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData({
            first_name: profile.user?.first_name || "",
            last_name: profile.user?.last_name || "",
            career_status:
                profile.career_status || "FRESHER",
        });

        setIsEditing(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await onUpdate({
            career_status: formData.career_status,
        });

        setIsEditing(false);
    };

    return (
        <section className="profile-hero">

            <div className="profile-hero__main">

                <div className="profile-hero__image-wrapper">

                    {profile.profile_image ? (
                        <img
                            src={profile.profile_image}
                            alt={displayName}
                            className="profile-hero__image"
                        />
                    ) : (
                        <div className="profile-hero__avatar">
                            {displayName
                                .charAt(0)
                                .toUpperCase()}
                        </div>
                    )}

                </div>

                {!isEditing ? (
                    <div className="profile-hero__details">

                        <div className="profile-hero__name-row">

                            <h1 className="profile-hero__name">
                                {displayName}
                            </h1>

                            <span
                                className={`profile-hero__status profile-hero__status--${profile.career_status?.toLowerCase()}`}
                            >
                                {profile.career_status ===
                                "EXPERIENCED"
                                    ? "Experienced"
                                    : "Fresher"}
                            </span>

                        </div>

                        <p className="profile-hero__email">
                            {profile.user?.email}
                        </p>

                    </div>
                ) : (
                    <form
                        className="profile-hero__form"
                        onSubmit={handleSubmit}
                    >

                        <div className="profile-hero__fields">

                            <div className="profile-hero__field">

                                <label htmlFor="career-status">
                                    Career Status
                                </label>

                                <select
                                    id="career-status"
                                    name="career_status"
                                    value={
                                        formData.career_status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={saving}
                                >
                                    <option value="FRESHER">
                                        Fresher
                                    </option>

                                    <option value="EXPERIENCED">
                                        Experienced
                                    </option>
                                </select>

                            </div>

                        </div>

                        <div className="profile-hero__actions">

                            <button
                                type="submit"
                                className="profile-hero__button profile-hero__button--save"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save"}
                            </button>

                            <button
                                type="button"
                                className="profile-hero__button profile-hero__button--cancel"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>
                )}

            </div>

            {!isEditing && (
                <button
                    type="button"
                    className="profile-hero__edit"
                    onClick={handleEdit}
                >
                    Edit Profile
                </button>
            )}

        </section>
    );
}

export default ProfileHero;