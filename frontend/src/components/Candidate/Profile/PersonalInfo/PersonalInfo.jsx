import { useEffect, useState } from "react";

import "./PersonalInfo.css";

function PersonalInfo({
    profile,
    isEditing,
    saving,
    onUpdate,
}) {
    const [isAdding, setIsAdding] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [error, setError] = useState("");

    const hasPersonalData =
        Boolean(profile?.date_of_birth) ||
        Boolean(profile?.gender) ||
        Boolean(profile?.user?.phone_number);

    useEffect(() => {
        if (!profile) {
            return;
        }

        setDateOfBirth(
            profile.date_of_birth || ""
        );

        setGender(
            profile.gender || ""
        );

        setPhoneNumber(
            profile.user?.phone_number || ""
        );
    }, [profile]);

    const handleAdd = async () => {
        try {
            setError("");

            if (!dateOfBirth) {
                setError("Please provide your date of birth.");
                return;
            }

            if (!gender) {
                setError("Please select your gender.");
                return;
            }

            if (!phoneNumber) {
                setError("Please provide your phone number.");
                return;
            }

            await onUpdate({
                date_of_birth: dateOfBirth,
                gender,
                phone_number: phoneNumber,
            });

            setIsAdding(false);
        } catch (error) {
            console.error(
                "Personal information add error:",
                error
            );

            setError(
                error.message ||
                "Unable to save personal information."
            );
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setError("");

        setDateOfBirth(
            profile?.date_of_birth || ""
        );

        setGender(
            profile?.gender || ""
        );

        setPhoneNumber(
            profile?.user?.phone_number || ""
        );
    };

    return (
        <section className="profile-section personal-info">

            <div className="profile-section__header">
                <div>
                    {/* <span className="profile-section__eyebrow">
                        PERSONAL
                    </span> */}

                    <h2 className="profile-section__title">
                        Personal Information
                    </h2>

                    <p className="profile-section__description">
                        Keep your personal details up to date.
                    </p>
                </div>
            </div>

            {!hasPersonalData && !isAdding && (
                <div className="profile-empty-state">

                    <div className="profile-empty-state__icon">
                        +
                    </div>

                    <div className="profile-empty-state__content">
                        <h3>
                            Personal information not added
                        </h3>

                        <p>
                            Add your date of birth, gender,
                            and phone number to complete
                            your candidate profile.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="profile-empty-state__button"
                        onClick={() => {
                            setError("");
                            setIsAdding(true);
                        }}
                    >
                        + Add Personal Information
                    </button>

                </div>
            )}

            {hasPersonalData && !isAdding && (
                <div className="personal-info__grid">

                    <div className="profile-field">
                        <span className="profile-field__label">
                            Date of Birth
                        </span>

                        <div className="profile-field__value">
                            {profile?.date_of_birth ||
                                "Not provided"}
                        </div>
                    </div>

                    <div className="profile-field">
                        <span className="profile-field__label">
                            Gender
                        </span>

                        <div className="profile-field__value">
                            {profile?.gender ||
                                "Not provided"}
                        </div>
                    </div>

                    <div className="profile-field">
                        <span className="profile-field__label">
                            Phone Number
                        </span>

                        <div className="profile-field__value">
                            {profile?.user?.phone_number ||
                                "Not provided"}
                        </div>
                    </div>

                </div>
            )}

            {isAdding && (
                <div className="personal-info__form">

                    <div className="personal-info__form-grid">

                        <div className="profile-form-field">
                            <label htmlFor="date_of_birth">
                                Date of Birth
                            </label>

                            <input
                                id="date_of_birth"
                                type="date"
                                value={dateOfBirth}
                                onChange={(event) =>
                                    setDateOfBirth(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="profile-form-field">
                            <label htmlFor="gender">
                                Gender
                            </label>

                            <select
                                id="gender"
                                value={gender}
                                onChange={(event) =>
                                    setGender(
                                        event.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Select gender
                                </option>

                                <option value="MALE">
                                    Male
                                </option>

                                <option value="FEMALE">
                                    Female
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>
                            </select>
                        </div>

                        <div className="profile-form-field">
                            <label htmlFor="phone_number">
                                Phone Number
                            </label>

                            <input
                                id="phone_number"
                                type="tel"
                                value={phoneNumber}
                                onChange={(event) =>
                                    setPhoneNumber(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter phone number"
                            />
                        </div>

                    </div>

                    {error && (
                        <p className="profile-form__error">
                            {error}
                        </p>
                    )}

                    <div className="profile-form__actions">

                        <button
                            type="button"
                            className="profile-form__cancel"
                            onClick={handleCancel}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="profile-form__save"
                            onClick={handleAdd}
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Information"}
                        </button>

                    </div>

                </div>
            )}

        </section>
    );
}

export default PersonalInfo;