import { useEffect, useState } from "react";

import {
    getCandidateSkills,
    addCandidateSkill,
    updateCandidateSkill,
    deleteCandidateSkill,
} from "../../../../services/candidate/candidateSkillService";

import "./SkillsInfo.css";


const INITIAL_FORM = {
    skill_name: "",
    category: "OTHER",
    proficiency: "INTERMEDIATE",
};


function SkillsInfo() {

    const [skills, setSkills] = useState([]);

    const [isAdding, setIsAdding] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState(INITIAL_FORM);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");


    // --------------------------------------------------
    // LOAD SKILLS
    // --------------------------------------------------

    const loadSkills = async () => {

        try {

            setLoading(true);

            setError("");

            const result = await getCandidateSkills();

            setSkills(
                Array.isArray(result)
                    ? result
                    : result.data || []
            );

        } catch (error) {

            console.error("Load skills error:", error);

            setError(
                error.message ||
                "Unable to load skills."
            );

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------------------------
    // INITIAL LOAD
    // --------------------------------------------------

    useEffect(() => {

        loadSkills();

    }, []);


    // --------------------------------------------------
    // HANDLE INPUT
    // --------------------------------------------------

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // --------------------------------------------------
    // RESET FORM
    // --------------------------------------------------

    const resetForm = () => {

        setForm(INITIAL_FORM);

        setIsAdding(false);

        setEditingId(null);

        setError("");

    };


    // --------------------------------------------------
    // ADD BUTTON
    // --------------------------------------------------

    const handleAdd = () => {

        setForm(INITIAL_FORM);

        setEditingId(null);

        setError("");

        setSuccessMessage("");

        setIsAdding(true);

    };


    // --------------------------------------------------
    // EDIT BUTTON
    // --------------------------------------------------

    const handleEdit = (skill) => {

        setForm({
            skill_name: skill.skill_name || "",
            category: skill.category || "OTHER",
            proficiency: skill.proficiency || "INTERMEDIATE",
        });

        setEditingId(skill.id);

        setIsAdding(false);

        setError("");

        setSuccessMessage("");

    };


    // --------------------------------------------------
    // SUBMIT
    // --------------------------------------------------

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);

            setError("");

            setSuccessMessage("");


            if (editingId) {

                // UPDATE ONLY SELECTED SKILL

                await updateCandidateSkill(
                    editingId,
                    form
                );

                setSuccessMessage(
                    "Skill updated successfully."
                );

            } else {

                // ADD NEW SKILL

                await addCandidateSkill(form);

                setSuccessMessage(
                    "Skill added successfully."
                );

            }


            // Backend is source of truth

            await loadSkills();

            resetForm();

        } catch (error) {

            console.error(
                "Save skill error:",
                error
            );

            setError(
                error.message ||
                "Unable to save skill."
            );

        } finally {

            setSaving(false);

        }
    };


    // --------------------------------------------------
    // DELETE
    // --------------------------------------------------

    const handleDelete = async (skillId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmed) {
            return;
        }


        try {

            setError("");

            setSuccessMessage("");

            await deleteCandidateSkill(skillId);

            setSuccessMessage(
                "Skill deleted successfully."
            );

            // Reload from backend

            await loadSkills();

        } catch (error) {

            console.error(
                "Delete skill error:",
                error
            );

            setError(
                error.message ||
                "Unable to delete skill."
            );

        }
    };


    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {

        return (
            <section className="profile-section skills-section">

                <div className="skills-loading">
                    Loading skills...
                </div>

            </section>
        );

    }


    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (

        <section className="profile-section skills-section">


            {/* HEADER */}

            <div className="skills-section__header">

                <div>

                    <h2 className="skills-section__title">
                        Skills
                    </h2>

                    <p className="skills-section__description">
                        Add your technical and professional skills.
                    </p>

                </div>


                {/* ONLY ONE ADD BUTTON */}

                {!isAdding && !editingId && (

                    <button
                        type="button"
                        className="skills-add-button"
                        onClick={handleAdd}
                    >
                        + Add Skill
                    </button>

                )}

            </div>


            {/* ERROR */}

            {error && (

                <div className="skills-message skills-message--error">
                    {error}
                </div>

            )}


            {/* SUCCESS */}

            {successMessage && (

                <div className="skills-message skills-message--success">
                    {successMessage}
                </div>

            )}


            {/* --------------------------------------------------
                ADD / EDIT FORM
            -------------------------------------------------- */}

            {(isAdding || editingId) && (

                <form
                    className="skills-form"
                    onSubmit={handleSubmit}
                >

                    <div className="skills-form__header">

                        <div>

                            <h3>

                                {editingId
                                    ? "Edit Skill"
                                    : "Add Skill"}

                            </h3>

                            <p>
                                Enter your skill details.
                            </p>

                        </div>

                    </div>


                    <div className="skills-form__grid">


                        {/* SKILL NAME */}

                        <div className="skills-field">

                            <label>
                                Skill Name
                            </label>

                            <input
                                type="text"
                                name="skill_name"
                                value={form.skill_name}
                                onChange={handleChange}
                                placeholder="Python"
                                required
                            />

                        </div>


                        {/* CATEGORY */}

                        <div className="skills-field">

                            <label>
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                            >

                                <option value="PROGRAMMING">
                                    Programming
                                </option>

                                <option value="BACKEND">
                                    Backend
                                </option>

                                <option value="FRONTEND">
                                    Frontend
                                </option>

                                <option value="DATABASE">
                                    Database
                                </option>

                                <option value="DEVOPS">
                                    DevOps
                                </option>

                                <option value="TOOLS">
                                    Tools
                                </option>

                                <option value="SOFT_SKILL">
                                    Soft Skill
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>

                        </div>


                        {/* PROFICIENCY */}

                        <div className="skills-field">

                            <label>
                                Proficiency
                            </label>

                            <select
                                name="proficiency"
                                value={form.proficiency}
                                onChange={handleChange}
                                required
                            >

                                <option value="BEGINNER">
                                    Beginner
                                </option>

                                <option value="INTERMEDIATE">
                                    Intermediate
                                </option>

                                <option value="ADVANCED">
                                    Advanced
                                </option>

                                <option value="EXPERT">
                                    Expert
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* FORM BUTTONS */}

                    <div className="skills-form__actions">

                        <button
                            type="button"
                            className="skills-button skills-button--secondary"
                            onClick={resetForm}
                            disabled={saving}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="skills-button skills-button--primary"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Save Changes"
                                    : "Add Skill"}

                        </button>

                    </div>

                </form>

            )}


            {/* --------------------------------------------------
                EMPTY STATE
            -------------------------------------------------- */}

            {!isAdding &&
                !editingId &&
                skills.length === 0 && (

                    <div className="skills-empty">

                        <div className="skills-empty__icon">
                            💻
                        </div>

                        <h3>
                            No skills added yet
                        </h3>

                        <p>
                            Add your technical and professional
                            skills to complete your profile.
                        </p>

                        <button
                            type="button"
                            className="skills-add-button"
                            onClick={handleAdd}
                        >
                            + Add Skill
                        </button>

                    </div>

                )}


            {/* --------------------------------------------------
                SKILLS GRID
            -------------------------------------------------- */}

            {!isAdding &&
                !editingId &&
                skills.length > 0 && (

                    <div className="skills-grid">

                        {skills.map((skill) => (

                            <article
                                className="skill-card"
                                key={skill.id}
                            >

                                <div className="skill-card__top">

                                    <h3 className="skill-card__name">
                                        {skill.skill_name}
                                    </h3>

                                    <span className="skill-card__proficiency">
                                        {skill.proficiency}
                                    </span>

                                </div>


                                <div className="skill-card__category">

                                    {skill.category
                                        ?.replaceAll("_", " ")}

                                </div>


                                <div className="skill-card__actions">

                                    <button
                                        type="button"
                                        className="profile-edit-button"
                                        onClick={() =>
                                            handleEdit(skill)
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        type="button"
                                        className="profile-delete-button"
                                        onClick={() =>
                                            handleDelete(skill.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

        </section>

    );

}


export default SkillsInfo;