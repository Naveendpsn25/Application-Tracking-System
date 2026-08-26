import { useEffect, useState } from "react";

import {
    getOnlinePresence,
    updateOnlinePresence,
} from "../../../../services/candidate/onlinePresenceService";

import "./OnlinePresence.css";


const EMPTY_PRESENCE = {
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
};


const PLATFORM_CONFIG = {
    linkedin: {
        key: "linkedin_url",
        label: "LinkedIn",
        placeholder: "https://www.linkedin.com/in/your-profile",
    },

    github: {
        key: "github_url",
        label: "GitHub",
        placeholder: "https://github.com/your-profile",
    },

    portfolio: {
        key: "portfolio_url",
        label: "Portfolio",
        placeholder: "https://yourportfolio.com",
    },
};


function OnlinePresence() {

    const [onlinePresence, setOnlinePresence] =
        useState(EMPTY_PRESENCE);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [successMessage, setSuccessMessage] =
        useState("");

    const [editingPlatform, setEditingPlatform] =
        useState(null);

    const [form, setForm] =
        useState({
            url: "",
        });


    // --------------------------------------------------
    // GET ONLINE PRESENCE
    // --------------------------------------------------

    useEffect(() => {

        let cancelled = false;

        const loadOnlinePresence = async () => {

            try {

                setLoading(true);
                setError("");

                const result =
                    await getOnlinePresence();

                if (!cancelled) {

                    const data =
                        result.data || {};

                    setOnlinePresence({

                        linkedin_url:
                            data.linkedin_url || "",

                        github_url:
                            data.github_url || "",

                        portfolio_url:
                            data.portfolio_url || "",
                    });
                }

            } catch (error) {

                console.error(
                    "Online presence fetch error:",
                    error
                );

                if (!cancelled) {

                    setError(
                        error.message ||
                        "Unable to load online presence."
                    );
                }

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }
            }
        };


        loadOnlinePresence();


        return () => {
            cancelled = true;
        };

    }, []);


    // --------------------------------------------------
    // START ADD / EDIT
    // --------------------------------------------------

    const handleOpenForm = (platform) => {

        const config =
            PLATFORM_CONFIG[platform];

        setError("");
        setSuccessMessage("");

        setEditingPlatform(platform);

        setForm({
            url:
                onlinePresence[config.key] || "",
        });
    };


    // --------------------------------------------------
    // FORM CHANGE
    // --------------------------------------------------

    const handleChange = (event) => {

        setForm({
            url: event.target.value,
        });
    };


    // --------------------------------------------------
    // CANCEL
    // --------------------------------------------------

    const handleCancel = () => {

        setEditingPlatform(null);

        setForm({
            url: "",
        });

        setError("");
        setSuccessMessage("");
    };


    // --------------------------------------------------
    // SAVE LINKED PLATFORM
    // --------------------------------------------------

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!editingPlatform) {
            return;
        }


        const config =
            PLATFORM_CONFIG[editingPlatform];


        const trimmedUrl =
            form.url.trim();


        try {

            setSaving(true);

            setError("");
            setSuccessMessage("");


            /*
             * Only update the selected platform.
             *
             * Existing LinkedIn/GitHub/Portfolio values
             * are preserved by sending the current state
             * together with the changed field.
             */

            const payload = {

                ...onlinePresence,

                [config.key]:
                    trimmedUrl || null,
            };


            const result =
                await updateOnlinePresence(
                    payload
                );


            const updatedData =
                result.data || payload;


            setOnlinePresence({

                linkedin_url:
                    updatedData.linkedin_url || "",

                github_url:
                    updatedData.github_url || "",

                portfolio_url:
                    updatedData.portfolio_url || "",
            });


            setEditingPlatform(null);

            setForm({
                url: "",
            });


            setSuccessMessage(
                `${config.label} updated successfully.`
            );

        } catch (error) {

            console.error(
                "Online presence update error:",
                error
            );

            setError(
                error.message ||
                `Unable to update ${config.label}.`
            );

        } finally {

            setSaving(false);
        }
    };


    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {

        return (
            <section className="profile-section online-presence-section">

                <div className="online-presence-loading">
                    Loading online presence...
                </div>

            </section>
        );
    }


    // --------------------------------------------------
    // MAIN UI
    // --------------------------------------------------

    return (

        <section className="profile-section online-presence-section">

            <div className="profile-section__header">

                <div>

                    <h2 className="profile-section__title">
                        Online Presence
                    </h2>

                    <p className="profile-section__description">
                        Manage your professional online profiles.
                    </p>

                </div>

            </div>


            {error && (

                <div className="online-presence-message online-presence-message--error">
                    {error}
                </div>

            )}


            {successMessage && (

                <div className="online-presence-message online-presence-message--success">
                    {successMessage}
                </div>

            )}


            <div className="online-presence-list">

                {Object.entries(PLATFORM_CONFIG).map(
                    ([platform, config]) => {

                        const url =
                            onlinePresence[config.key];

                        const isEditing =
                            editingPlatform === platform;


                        return (

                            <article
                                className="online-presence-card"
                                key={platform}
                            >

                                {isEditing ? (

                                    <form
                                        className="online-presence-form"
                                        onSubmit={handleSubmit}
                                    >

                                        <div className="online-presence-form__header">

                                            <div>

                                                <h3>
                                                    {url
                                                        ? `Edit ${config.label}`
                                                        : `Add ${config.label}`}
                                                </h3>

                                                <p>
                                                    Enter your {config.label} profile URL.
                                                </p>

                                            </div>

                                        </div>


                                        <div className="online-presence-field">

                                            <label htmlFor={`${platform}-url`}>
                                                {config.label} URL
                                            </label>

                                            <input
                                                id={`${platform}-url`}
                                                type="url"
                                                value={form.url}
                                                onChange={handleChange}
                                                placeholder={config.placeholder}
                                            />

                                        </div>


                                        <div className="online-presence-form__actions">

                                            <button
                                                type="button"
                                                className="online-presence-button online-presence-button--secondary"
                                                onClick={handleCancel}
                                                disabled={saving}
                                            >
                                                Cancel
                                            </button>


                                            <button
                                                type="submit"
                                                className="online-presence-button online-presence-button--primary"
                                                disabled={saving}
                                            >
                                                {saving
                                                    ? "Saving..."
                                                    : "Save"}
                                            </button>

                                        </div>

                                    </form>

                                ) : (

                                    <div className="online-presence-card__content">

                                        <div className="online-presence-card__info">

                                            <h3 className="online-presence-card__title">
                                                {config.label}
                                            </h3>


                                            {url ? (

                                                <a
                                                    className="online-presence-card__link"
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {url}
                                                </a>

                                            ) : (

                                                <p className="online-presence-card__empty">
                                                    No {config.label} profile added yet.
                                                </p>

                                            )}

                                        </div>


                                        <button
                                            type="button"
                                            className="profile-edit-button"
                                            onClick={() =>
                                                handleOpenForm(platform)
                                            }
                                        >
                                            {url
                                                ? `Edit ${config.label}`
                                                : `+ Add ${config.label}`}
                                        </button>

                                    </div>

                                )}

                            </article>

                        );
                    }
                )}

            </div>

        </section>
    );
}


export default OnlinePresence;