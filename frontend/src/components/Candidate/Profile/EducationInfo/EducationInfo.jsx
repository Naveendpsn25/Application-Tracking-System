import { useEffect, useState } from "react";

import {
    addCandidateEducation,
    deleteCandidateEducation,
    getCandidateEducation,
    updateCandidateEducation,
} from "../../../../services/candidate/candidateProfileService";

import "./EducationInfo.css";


const emptyForm = {
    education_level: "",
    institution_name: "",
    field_of_study: "",
    start_year: "",
    end_year: "",
    grade_type: "CGPA",
    grade: "",
};


function EducationInfo() {

    const [educations, setEducations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isAdding, setIsAdding] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState(emptyForm);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");


    useEffect(() => {
    let cancelled = false;

    const loadEducation = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getCandidateEducation();

            console.log("ADD EDUCATION RESPONSE:", result);

            if (!cancelled) {
                const educationData = result.data ?? result;

                setEducations(
                    Array.isArray(educationData)
                        ? educationData
                        : []
                );
            }
        } catch (error) {
            console.error("Education fetch error:", error);

            if (!cancelled) {
                setError(
                    error.message ||
                    "Unable to load education details."
                );
            }
        } finally {
            if (!cancelled) {
                setLoading(false);
            }
        }
    };

    loadEducation();

    return () => {
        cancelled = true;
    };
}, []);


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


    const resetForm = () => {

        setForm(emptyForm);

        setIsAdding(false);

        setEditingId(null);

    };


    const handleAdd = () => {

        setSuccessMessage("");

        setError("");

        setForm(emptyForm);

        setEditingId(null);

        setIsAdding(true);

    };


    const handleEdit = (education) => {

        setSuccessMessage("");

        setError("");

        setIsAdding(false);

        setEditingId(education.id);

        setForm({
            education_level:
                education.education_level || "",

            institution_name:
                education.institution_name || "",

            field_of_study:
                education.field_of_study || "",

            start_year:
                education.start_year || "",

            end_year:
                education.end_year || "",

            grade_type:
                education.grade_type || "CGPA",

            grade:
                education.grade || "",
        });

    };


    const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        setSaving(true);
        setError("");
        setSuccessMessage("");

        const payload = {
            ...form,
            start_year: Number(form.start_year),
            end_year: form.end_year
                ? Number(form.end_year)
                : null,
        };

        if (editingId) {
            const result = await updateCandidateEducation(
                editingId,
                payload
            );

            console.log("UPDATE EDUCATION RESPONSE:", result);

            const updatedEducation =
                result.data ?? result;

            setEducations((previous) =>
                previous.map((education) =>
                    education.id === editingId
                        ? updatedEducation
                        : education
                )
            );

            setSuccessMessage(
                "Education updated successfully."
            );
        } else {
            const result = await addCandidateEducation(
                payload
            );

            console.log("ADD EDUCATION RESPONSE:", result);

            const newEducation =
                result.data ?? result;

            setEducations((previous) => [
                newEducation,
                ...previous,
            ]);

            setSuccessMessage(
                "Education added successfully."
            );
        }

        resetForm();

    } catch (error) {
        console.error(
            "Education save error:",
            error
        );

        setError(
            error.message ||
            "Unable to save education."
        );
    } finally {
        setSaving(false);
    }
};


    const handleDelete = async (educationId) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this education record?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            setSuccessMessage("");

            await deleteCandidateEducation(
                educationId
            );

            setEducations((previous) =>
                previous.filter(
                    (education) =>
                        education.id !== educationId
                )
            );

            setSuccessMessage(
                "Education removed successfully."
            );

        } catch (error) {

            console.error(
                "Education delete error:",
                error
            );

            setError(error.message);
        }
    };


    if (loading) {

        return (
            <section className="profile-section education-section">

                <div className="education-loading">
                    Loading education details...
                </div>

            </section>
        );
    }


    return (
        <section className="profile-section education-section">

            <div className="profile-section__header">

                <div>

                    {/* <span className="profile-section__eyebrow">
                        EDUCATION
                    </span> */}

                    <h2 className="profile-section__title">
                        Education
                    </h2>

                    <p className="profile-section__description">
                        Add your academic qualifications,
                        from school to higher education.
                    </p>

                </div>


                {!isAdding && !editingId && (
                    <button
                        type="button"
                        className="education-add-button"
                        onClick={handleAdd}
                    >
                        + Add Education
                    </button>
                )}

            </div>


            {error && (
                <div className="education-message education-message--error">
                    {error}
                </div>
            )}


            {successMessage && (
                <div className="education-message education-message--success">
                    {successMessage}
                </div>
            )}


            {isAdding || editingId ? (

                <form
                    className="education-form"
                    onSubmit={handleSubmit}
                >

                    <div className="education-form__header">

                        <div>

                            <h3>
                                {editingId
                                    ? "Edit Education"
                                    : "Add Education"}
                            </h3>

                            <p>
                                Enter your academic details below.
                            </p>

                        </div>

                    </div>


                    <div className="education-form__grid">

                        <div className="education-field">

                            <label>
                                Education Level
                            </label>

                            <select
                                name="education_level"
                                value={form.education_level}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select education level
                                </option>

                                <option value="SECONDARY">
                                    Secondary School
                                </option>

                                <option value="HIGHER_SECONDARY">
                                    Higher Secondary
                                </option>

                                <option value="DIPLOMA">
                                    Diploma
                                </option>

                                <option value="BACHELOR">
                                    Bachelor's Degree
                                </option>

                                <option value="MASTER">
                                    Master's Degree
                                </option>

                                <option value="DOCTORATE">
                                    Doctorate
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>

                        </div>


                        <div className="education-field">

                            <label>
                                Institution Name
                            </label>

                            <input
                                type="text"
                                name="institution_name"
                                value={form.institution_name}
                                onChange={handleChange}
                                placeholder="School / College / University"
                                required
                            />

                        </div>


                        <div className="education-field education-field--full">

                            <label>
                                Field of Study
                            </label>

                            <input
                                type="text"
                                name="field_of_study"
                                value={form.field_of_study}
                                onChange={handleChange}
                                placeholder="Computer Science and Engineering"
                            />

                        </div>


                        <div className="education-field">

                            <label>
                                Start Year
                            </label>

                            <input
                                type="number"
                                name="start_year"
                                value={form.start_year}
                                onChange={handleChange}
                                placeholder="2021"
                                min="1950"
                                max="2100"
                                required
                            />

                        </div>


                        <div className="education-field">

                            <label>
                                End Year
                            </label>

                            <input
                                type="number"
                                name="end_year"
                                value={form.end_year}
                                onChange={handleChange}
                                placeholder="2025"
                                min="1950"
                                max="2100"
                            />

                        </div>


                        <div className="education-field">

                            <label>
                                Grade Type
                            </label>

                            <select
                                name="grade_type"
                                value={form.grade_type}
                                onChange={handleChange}
                                required
                            >

                                <option value="CGPA">
                                    CGPA
                                </option>

                                <option value="PERCENTAGE">
                                    Percentage
                                </option>

                                <option value="GRADE">
                                    Grade
                                </option>

                            </select>

                        </div>


                        <div className="education-field">

                            <label>
                                Grade
                            </label>

                            <input
                                type="text"
                                name="grade"
                                value={form.grade}
                                onChange={handleChange}
                                placeholder={
                                    form.grade_type === "CGPA"
                                        ? "8.2"
                                        : form.grade_type === "PERCENTAGE"
                                            ? "82%"
                                            : "A"
                                }
                                required
                            />

                        </div>

                    </div>


                    <div className="education-form__actions">

                        <button
                            type="button"
                            className="education-button education-button--secondary"
                            onClick={resetForm}
                            disabled={saving}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="education-button education-button--primary"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingId
                                    ? "Save Changes"
                                    : "Add Education"}
                        </button>

                    </div>

                </form>

            ) : educations.length === 0 ? (

                <div className="education-empty">

                    <div className="education-empty__icon">
                        🎓
                    </div>

                    <h3>
                        No education details yet
                    </h3>

                    <p>
                        Add your school, college, diploma,
                        or other academic qualifications
                        to complete your profile.
                    </p>

                    <button
                        type="button"
                        className="education-add-button"
                        onClick={handleAdd}
                    >
                        + Add Education
                    </button>

                </div>

            ) : (

                <div className="education-list">

                    {educations.map((education) => (

                        <article
                            className="education-card"
                            key={education.id}
                        >

                            <div className="education-card__content">

                                <div className="education-card__top">

                                    <span className="education-card__level">
                                        {education.education_level
                                            ?.replaceAll("_", " ")}
                                    </span>

                                </div>


                                <h3 className="education-card__institution">
                                    {education.institution_name}
                                </h3>


                                {education.field_of_study && (
                                    <p className="education-card__field">
                                        {education.field_of_study}
                                    </p>
                                )}


                                <div className="education-card__meta">

                                    <span>
                                        {education.start_year}
                                        {" - "}
                                        {education.end_year || "Present"}
                                    </span>

                                    <span>
                                        {education.grade_type}:{" "}
                                        {education.grade}
                                    </span>

                                </div>

                            </div>


                            <div className="education-card__actions">

                                <button
                                    type="button"
                                    className="profile-edit-button"
                                    onClick={() =>
                                        handleEdit(education)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="profile-delete-button"
                                    // className="education-delete-button"
                                    onClick={() =>
                                        handleDelete(
                                            education.id
                                        )
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


export default EducationInfo;