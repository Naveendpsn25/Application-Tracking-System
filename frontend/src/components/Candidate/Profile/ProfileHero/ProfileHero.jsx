const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

const getMediaUrl = (url) => {
    if (!url) {
        return "";
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    const backendUrl = API_BASE_URL.replace(/\/api\/?$/, "");

    return `${backendUrl}${url.startsWith("/") ? url : `/${url}`}`;
};


import { useEffect, useState } from "react";

import {
    updateCandidateProfileHero,
} from "../../../../services/candidate/candidateProfileService";

import "./ProfileHero.css";

function ProfileHero({
    profile,
    saving,
    onUpdate,
}) {
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        current_location: "",
        preferred_location: "",
        career_status: "FRESHER",
    });

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (!profile) {
            return;
        }

        setFormData({
            current_location:
                profile.current_location || "",

            preferred_location:
                profile.preferred_location || "",

            career_status:
                profile.career_status || "FRESHER",
        });

        setProfileImage(null);

        setImagePreview(
            profile.profile_image || ""
        );
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
        fullName ||
        profile.user?.email ||
        "Candidate";

    // ==================================================
    // FIELD CHANGE
    // ==================================================

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // ==================================================
    // IMAGE CHANGE
    // ==================================================

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            return;
        }

        setProfileImage(file);

        const previewUrl =
            URL.createObjectURL(file);

        setImagePreview(previewUrl);
    };

    // ==================================================
    // EDIT
    // ==================================================

    const handleEdit = () => {
        setIsEditing(true);
    };

    // ==================================================
    // CANCEL
    // ==================================================

    const handleCancel = () => {
        setFormData({
            current_location:
                profile.current_location || "",

            preferred_location:
                profile.preferred_location || "",

            career_status:
                profile.career_status || "FRESHER",
        });

        setProfileImage(null);

        setImagePreview(
            profile.profile_image || ""
        );

        setIsEditing(false);
    };

    // ==================================================
    // SAVE
    // ==================================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateCandidateProfileHero({
                profileImage,
                currentLocation:
                    formData.current_location.trim(),

                preferredLocation:
                    formData.preferred_location.trim(),

                careerStatus:
                    formData.career_status,
            });

            // Backend remains source of truth.
            await onUpdate();

            setIsEditing(false);
        } catch (error) {
            console.error(
                "Profile hero update error:",
                error
            );
        }
    };

    // ==================================================
    // DISPLAY MODE
    // ==================================================

    if (!isEditing) {
        return (
            <section className="profile-hero">

                <div className="profile-hero__main">

                    <div className="profile-hero__image-wrapper">

                        {profile.profile_image ? (
                            <img
                                src={getMediaUrl(profile.profile_image)}
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

                        <div className="profile-hero__locations">

                            {profile.current_location && (
                                <span>
                                    📍
                                    {
                                        profile.current_location
                                    }
                                    {" "}
                                </span>
                            )}

                            {profile.preferred_location && (
                                <span>
                                    {" "}
                                    Preferred Location:{" "}
                                    {
                                        profile.preferred_location
                                    }
                                </span>
                            )}

                        </div>

                    </div>

                </div>

                <button
                    type="button"
                    className="profile-hero__edit"
                    onClick={handleEdit}
                >
                    Edit Profile
                </button>

            </section>
        );
    }

    // ==================================================
    // EDIT MODE
    // ==================================================

    return (
        <section className="profile-hero profile-hero--editing">

            <form
                className="profile-hero__form"
                onSubmit={handleSubmit}
            >

                {/* IMAGE */}

                <div className="profile-hero__image-edit">

                    <div className="profile-hero__image-wrapper">

                        {imagePreview ? (
                            <img
                                src={imagePreview}
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

                    <label
                        htmlFor="profile-image"
                        className="profile-hero__image-upload"
                    >
                        Change Photo
                    </label>

                    <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={saving}
                    />

                </div>

                {/* FIELDS */}

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
                            onChange={handleChange}
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

                    <div className="profile-hero__field">

                        <label htmlFor="current-location">
                            Current Location
                        </label>

                        <input
                            id="current-location"
                            type="text"
                            name="current_location"
                            value={
                                formData.current_location
                            }
                            onChange={handleChange}
                            placeholder="Enter current location"
                            disabled={saving}
                        />

                    </div>

                    <div className="profile-hero__field">

                        <label htmlFor="preferred-location">
                            Preferred Location
                        </label>

                        <input
                            id="preferred-location"
                            type="text"
                            name="preferred_location"
                            value={
                                formData.preferred_location
                            }
                            onChange={handleChange}
                            placeholder="Enter preferred location"
                            disabled={saving}
                        />

                    </div>

                </div>

                {/* ACTIONS */}

                <div className="profile-hero__actions">

                    <button
                        type="submit"
                        className="profile-hero__button profile-hero__button--save"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "Save Changes"}
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

        </section>
    );
}

export default ProfileHero;