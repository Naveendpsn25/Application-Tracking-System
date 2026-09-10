import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState,useEffect } from "react";
import { jobFormSchema } from "./jobFormSchema";

import jobService from "../../../../services/job/jobService";

import { useNavigate } from "react-router-dom";

import "./JobForm.css";

function JobForm({ mode = "create", job = null }) {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(jobFormSchema),
        // mode: "onBlur",
        defaultValues: {
            company_name: "",
            city: "",
            state: "",
            country: "",

            job_title: "",
            job_code: "",
            employment_type: "",
            workplace_type: "",
            experience_level: "",

            minimum_experience: "",
            maximum_experience: "",
            minimum_salary: "",
            maximum_salary: "",
            currency: "INR",
            vacancies: 1,

            location: "",
            required_skills: "",
            qualification: "",

            job_description: "",
            responsibilities: "",
            application_deadline: "",

            is_featured: false,
        },
    });

    useEffect(() => {
        if (mode === "edit" && job) {
            reset({
                company_name: job.company_name || "",
                city: job.city || "",
                state: job.state || "",
                country: job.country || "",

                job_title: job.job_title || "",
                job_code: job.job_code || "",
                employment_type: job.employment_type || "",
                workplace_type: job.workplace_type || "",
                experience_level: job.experience_level || "",

                minimum_experience:
                    job.minimum_experience !== null &&
                    job.minimum_experience !== undefined
                        ? String(job.minimum_experience)
                        : "",

                maximum_experience:
                    job.maximum_experience !== null &&
                    job.maximum_experience !== undefined
                        ? String(job.maximum_experience)
                        : "",

                minimum_salary:
                    job.minimum_salary !== null &&
                    job.minimum_salary !== undefined
                        ? String(job.minimum_salary)
                        : "",

                maximum_salary:
                    job.maximum_salary !== null &&
                    job.maximum_salary !== undefined
                        ? String(job.maximum_salary)
                        : "",

                currency: job.currency || "INR",
                vacancies: job.vacancies || 1,

                location: job.location || "",
                required_skills: job.required_skills || "",
                qualification: job.qualification || "",

                job_description: job.job_description || "",
                responsibilities: job.responsibilities || "",
                application_deadline:
                    job.application_deadline || "",

                is_featured: job.is_featured || false,
            });
        }
    }, [mode, job, reset]);

    const onSubmit = async (data) => {
        try {
            setSubmitError("");

            const jobData = {
                ...data,
                application_deadline:
                    data.application_deadline || null,
            };

            let response;

            if (mode === "edit") {
                response = await jobService.updateJob({
                    jobId: job.id,
                    jobData,
                });
            } else {
                response = await jobService.createJob({
                    jobData,
                    action: "publish",
                });
            }

            console.log(
                mode === "edit"
                    ? "Job updated successfully:"
                    : "Job published successfully:",
                response
            );

            navigate("/recruiter/jobs");
        } catch (error) {
            console.error(
                mode === "edit"
                    ? "Job update failed:"
                    : "Job publish failed:",
                error
            );

            setSubmitError(
                error.message ||
                    (mode === "edit"
                        ? "Failed to update job. Please try again."
                        : "Failed to publish job. Please try again.")
            );
        }
    };

    const onInvalid = (errors) => {
        console.log("Validation Errors:", errors);
    };
    return (
        <form className="job-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>

            {submitError && (
                <div className="job-form-submit-error" role="alert">
                    <span className="job-form-submit-error-icon">
                        ⚠️
                    </span>

                    <div>
                        <strong>
                            {mode === "edit"
                                ? "Unable to update job"
                                : "Unable to publish job"}
                        </strong>
                        <p>{submitError}</p>
                    </div>
                </div>
            )}


                    {/* Company Information */}
        <section className="job-form-section">

            <div className="job-form-section-header">
                <div className="job-form-section-icon">
                    🏢
                </div>

                <div>
                    <h2>Company Information</h2>
                    <p>
                        Enter the basic information about the company hiring for this role.
                    </p>
                </div>
            </div>

            <div className="job-form-fields">

                {/* Company Name */}
                <div className="job-form-field job-form-field-full">
                    <label htmlFor="company_name">
                        Company Name
                        <span>*</span>
                    </label>

                    <input
                        id="company_name"
                        type="text"
                        placeholder="e.g. ABC Technologies"
                        {...register("company_name")}
                    />

                    {errors.company_name && (
                        <small className="job-form-error">
                            {errors.company_name.message}
                        </small>
                    )}
                </div>

                {/* City */}
                <div className="job-form-field">
                    <label htmlFor="city">
                        City
                        <span>*</span>
                    </label>

                    <input
                        id="city"
                        type="text"
                        placeholder="e.g. Chennai"
                        {...register("city")}
                    />

                    {errors.city && (
                        <small className="job-form-error">
                            {errors.city.message}
                        </small>
                    )}
                </div>

                {/* State */}
                <div className="job-form-field">
                    <label htmlFor="state">
                        State
                        <span>*</span>
                    </label>

                    <input
                        id="state"
                        type="text"
                        placeholder="e.g. Tamil Nadu"
                        {...register("state")}
                    />

                    {errors.state && (
                        <small className="job-form-error">
                            {errors.state.message}
                        </small>
                    )}
                </div>

                {/* Country */}
                <div className="job-form-field">
                    <label htmlFor="country">
                        Country
                        <span>*</span>
                    </label>

                    <input
                        id="country"
                        type="text"
                        placeholder="e.g. India"
                        {...register("country")}
                    />

                    {errors.country && (
                        <small className="job-form-error">
                            {errors.country.message}
                        </small>
                    )}
                </div>

            </div>
        </section>

            {/* Basic Information */}
            <section className="job-form-section">

                <div className="job-form-section-header">
                    <div className="job-form-section-icon">
                        💼
                    </div>

                    <div>
                        <h2>Basic Information</h2>
                        <p>
                            Enter the basic details of the job opening.
                        </p>
                    </div>
                </div>

                <div className="job-form-fields">

                    {/* Job Title */}
                    <div className="job-form-field job-form-field-full">
                        <label htmlFor="job_title">
                            Job Title
                            <span>*</span>
                        </label>

                        <input
                            id="job_title"
                            name="job_title"
                            type="text"
                             {...register("job_title")}
                            placeholder="e.g. Python Developer"
                            // required
                        />
                        {errors.job_title && (
                            <small className="job-form-error">
                                {errors.job_title.message}
                            </small>
                        )}
                    </div>

                    {/* Job Code */}
                    <div className="job-form-field">
                        <label htmlFor="job_code">
                            Job Code
                            <span>*</span>
                        </label>

                        <input
                            id="job_code"
                            name="job_code"
                            type="text"
                            {...register("job_code")}
                            placeholder="e.g. PY-DEV-001"
                            // required
                        />
                        {errors.job_code && (
                            <small className="job-form-error">
                                {errors.job_code.message}
                            </small>
                        )}
                    </div>

                    {/* Employment Type */}
                    <div className="job-form-field">
                        <label htmlFor="employment_type">
                            Employment Type
                            <span>*</span>
                        </label>

                        <select
                            id="employment_type"
                            name="employment_type"
                             {...register("employment_type")}
                            // required
                        >
                            <option value="">
                                Select employment type
                            </option>

                            <option value="FULL_TIME">Full Time</option>
                            <option value="PART_TIME">Part Time</option>
                            <option value="CONTRACT">Contract</option>
                            <option value="INTERNSHIP">Internship</option>
                            <option value="FREELANCE">Freelance</option>
                        </select>
                        {errors.employment_type && (
                        <small className="job-form-error">
                            {errors.employment_type.message}
                        </small>
                    )}
                    </div>

                    {/* Workplace Type */}
                    <div className="job-form-field">
                        <label htmlFor="workplace_type">
                            Workplace Type
                            <span>*</span>
                        </label>

                        <select
                            id="workplace_type"
                            name="workplace_type"
                            {...register("workplace_type")}
                        >
                            <option value="">
                                Select workplace type
                            </option>

                            <option value="ON_SITE">On-site</option>
                            <option value="HYBRID">Hybrid</option>
                            <option value="REMOTE">Remote</option>
                        </select>
                        {errors.workplace_type && (
                            <small className="job-form-error">
                                {errors.workplace_type.message}
                            </small>
                        )}
                    </div>

                    {/* Experience Level */}
                    <div className="job-form-field">
                        <label htmlFor="experience_level">
                            Experience Level
                            <span>*</span>
                        </label>

                        <select
                            id="experience_level"
                            name="experience_level"
                            {...register("experience_level")}
                        >
                            <option value="">
                                Select experience level
                            </option>

                            <option value="FRESHER">Fresher</option>
                            <option value="JUNIOR">Junior</option>
                            <option value="MID_LEVEL">Mid-Level</option>
                            <option value="SENIOR">Senior</option>
                            <option value="LEAD">Lead</option>
                        </select>
                        {errors.experience_level && (
                            <small className="job-form-error">
                                {errors.experience_level.message}
                            </small>
                        )}
                    </div>

                </div>
            </section>

            
            

            {/* Experience & Compensation */}
            <section className="job-form-section">

                <div className="job-form-section-header">
                    <div className="job-form-section-icon">
                        💰
                    </div>

                    <div>
                        <h2>Experience & Compensation</h2>
                        <p>
                            Define the experience range and salary offered for this role.
                        </p>
                    </div>
                </div>

                <div className="job-form-fields">

                    {/* Minimum Experience */}
                    <div className="job-form-field">
                        <label htmlFor="minimum_experience">
                            Minimum Experience
                            <span>*</span>
                        </label>

                        <div className="job-form-input-with-suffix">
                            <input
                                id="minimum_experience"
                                type="number"
                                min="0"
                                placeholder="e.g. 0"
                                {...register("minimum_experience")}
                            />

                            <span>Years</span>
                        </div>

                        {errors.minimum_experience && (
                            <small className="job-form-error">
                                {errors.minimum_experience.message}
                            </small>
                        )}
                    </div>


                    {/* Maximum Experience */}
                    <div className="job-form-field">
                        <label htmlFor="maximum_experience">
                            Maximum Experience
                            <span>*</span>
                        </label>

                        <div className="job-form-input-with-suffix">
                            <input
                                id="maximum_experience"
                                type="number"
                                min="0"
                                placeholder="e.g. 2"
                                {...register("maximum_experience")}
                            />

                            <span>Years</span>
                        </div>

                        {errors.maximum_experience && (
                            <small className="job-form-error">
                                {errors.maximum_experience.message}
                            </small>
                        )}
                    </div>


                    {/* Minimum Salary */}
                    <div className="job-form-field">
                        <label htmlFor="minimum_salary">
                            Minimum Salary
                        </label>

                        <input
                            id="minimum_salary"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="e.g. 300000"
                            {...register("minimum_salary")}
                        />

                        {errors.minimum_salary && (
                            <small className="job-form-error">
                                {errors.minimum_salary.message}
                            </small>
                        )}
                    </div>


                    {/* Maximum Salary */}
                    <div className="job-form-field">
                        <label htmlFor="maximum_salary">
                            Maximum Salary
                        </label>

                        <input
                            id="maximum_salary"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="e.g. 600000"
                            {...register("maximum_salary")}
                        />

                        {errors.maximum_salary && (
                            <small className="job-form-error">
                                {errors.maximum_salary.message}
                            </small>
                        )}
                    </div>


                    {/* Currency */}
                    <div className="job-form-field">
                        <label htmlFor="currency">
                            Currency
                            <span>*</span>
                        </label>

                        <select
                            id="currency"
                            {...register("currency")}
                        >
                            <option value="">
                                Select currency
                            </option>

                            <option value="INR">
                                INR - Indian Rupee
                            </option>

                            <option value="USD">
                                USD - US Dollar
                            </option>

                            <option value="EUR">
                                EUR - Euro
                            </option>

                            <option value="GBP">
                                GBP - British Pound
                            </option>
                        </select>

                        {errors.currency && (
                            <small className="job-form-error">
                                {errors.currency.message}
                            </small>
                        )}
                    </div>


                    {/* Vacancies */}
                    <div className="job-form-field">
                        <label htmlFor="vacancies">
                            Number of Vacancies
                            <span>*</span>
                        </label>

                        <input
                            id="vacancies"
                            type="number"
                            min="1"
                            placeholder="e.g. 3"
                            {...register("vacancies")}
                        />

                        {errors.vacancies && (
                            <small className="job-form-error">
                                {errors.vacancies.message}
                            </small>
                        )}
                    </div>

                </div>
            </section>


           


            {/* Requirements & Location */}
            <section className="job-form-section">

                <div className="job-form-section-header">
                    <div className="job-form-section-icon">
                        📍
                    </div>

                    <div>
                        <h2>Requirements & Location</h2>
                        <p>
                            Tell candidates where the role is based and what they need.
                        </p>
                    </div>
                </div>

                <div className="job-form-fields">

                    {/* Job Location */}
                    <div className="job-form-field job-form-field-full">
                        <label htmlFor="location">
                            Job Location
                            <span>*</span>
                        </label>

                        <input
                            id="location"
                            type="text"
                            placeholder="e.g. Chennai, Tamil Nadu, India"
                            {...register("location")}
                        />

                        {errors.location && (
                            <small className="job-form-error">
                                {errors.location.message}
                            </small>
                        )}

                        <small className="job-form-field-hint">
                            Enter the city, state, or country where the job is based.
                        </small>
                    </div>


                    {/* Minimum Qualification */}
                    <div className="job-form-field">
                        <label htmlFor="qualification">
                            Minimum Qualification
                            <span>*</span>
                        </label>

                        <input
                            id="qualification"
                            type="text"
                            placeholder="e.g. B.E / B.Tech in CSE"
                            {...register("qualification")}
                        />

                        {errors.qualification && (
                            <small className="job-form-error">
                                {errors.qualification.message}
                            </small>
                        )}
                    </div>


                    {/* Required Skills */}
                    <div className="job-form-field job-form-field-full">
                        <label htmlFor="required_skills">
                            Required Skills
                            <span>*</span>
                        </label>

                        <textarea
                            id="required_skills"
                            placeholder="e.g. Python, Django, PostgreSQL, REST API, Git"
                            rows="4"
                            {...register("required_skills")}
                        />

                        {errors.required_skills && (
                            <small className="job-form-error">
                                {errors.required_skills.message}
                            </small>
                        )}

                        <small className="job-form-field-hint">
                            Add the technical and professional skills required for this role.
                        </small>
                    </div>

                </div>
            </section>






            {/* Job Details */}
            <section className="job-form-section">

                <div className="job-form-section-header">
                    <div className="job-form-section-icon">
                        📝
                    </div>

                    <div>
                        <h2>Job Details</h2>
                        <p>
                            Describe the role and what the selected candidate will be responsible for.
                        </p>
                    </div>
                </div>

                <div className="job-form-fields">

                    {/* Job Description */}
                    <div className="job-form-field job-form-field-full">
                        <label htmlFor="job_description">
                            Job Description
                            <span>*</span>
                        </label>

                        <textarea
                            id="job_description"
                            placeholder="Describe the role, team, work environment, and what the candidate can expect..."
                            rows="7"
                            {...register("job_description")}
                        />

                        {errors.job_description && (
                            <small className="job-form-error">
                                {errors.job_description.message}
                            </small>
                        )}

                        <small className="job-form-field-hint">
                            Provide a clear overview of the position and what makes this opportunity valuable.
                        </small>
                    </div>


                    {/* Responsibilities */}
                    <div className="job-form-field job-form-field-full">
                        <label htmlFor="responsibilities">
                            Responsibilities
                            <span className="optional-label">
                                Optional
                            </span>
                        </label>

                        <textarea
                            id="responsibilities"
                            placeholder="e.g. Develop backend APIs, maintain databases, collaborate with frontend developers..."
                            rows="6"
                            {...register("responsibilities")}
                        />

                        {errors.responsibilities && (
                            <small className="job-form-error">
                                {errors.responsibilities.message}
                            </small>
                        )}

                        <small className="job-form-field-hint">
                            List the main responsibilities and day-to-day expectations for this role.
                        </small>
                    </div>


                    {/* Application Deadline */}
                    <div className="job-form-field">
                        <label htmlFor="application_deadline">
                            Application Deadline
                            <span className="optional-label">
                                Optional
                            </span>
                        </label>

                        <input
                            id="application_deadline"
                            type="date"
                            {...register("application_deadline")}
                        />

                        {errors.application_deadline && (
                            <small className="job-form-error">
                                {errors.application_deadline.message}
                            </small>
                        )}

                        <small className="job-form-field-hint">
                            Leave empty if there is no fixed deadline.
                        </small>
                    </div>

                </div>
            </section>


            {/* Publishing & Job Settings */}
            <section className="job-form-section job-form-publishing-section">

                <div className="job-form-section-header">
                    <div className="job-form-section-icon">
                        🚀
                    </div>

                    <div>
                        <h2>Publishing & Job Settings</h2>
                        <p>
                            Choose how this job should be published and displayed.
                        </p>
                    </div>
                </div>

                <div className="job-form-publishing-content">

                    


                    {/* Featured */}
                    <div className="job-form-featured-card">

                        <div className="job-form-featured-content">

                            <div className="job-form-featured-icon">
                                ⭐
                            </div>

                            <div>
                                <strong>
                                    Feature this job
                                </strong>

                                <p>
                                    Give this job additional visibility to candidates.
                                </p>
                            </div>

                        </div>


                        <label className="job-form-switch">

                            <input
                                type="checkbox"
                                {...register("is_featured")}
                            />

                            <span className="job-form-switch-slider"></span>

                        </label>

                    </div>

                </div>


                {/* Form Actions */}
                <div className="job-form-actions">

                    <button
                        type="button"
                        className="job-form-cancel-button"
                        onClick={() => navigate("/recruiter/jobs")}
                    >
                        Cancel
                    </button>

                    {/* <button
                        type="button"
                        className="job-form-draft-button"
                    >
                        Save Draft
                    </button> */}

                    <button
                        type="submit"
                        className="job-form-publish-button"
                    >
                        {mode === "edit" ? "Update Job" : "Publish Job"}
                    </button>

                </div>

            </section>
        </form>
    );
}

export default JobForm;