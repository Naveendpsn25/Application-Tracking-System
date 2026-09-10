import { z } from "zod";

export const jobFormSchema = z
        .object({
        
        company_name: z
        .string()
        .trim()
        .min(1, "Company name is required.")
        .max(255, "Company name must be 255 characters or less."),

        city: z
            .string()
            .trim()
            .min(1, "City is required.")
            .max(100, "City must be 100 characters or less."),

        state: z
            .string()
            .trim()
            .min(1, "State is required.")
            .max(100, "State must be 100 characters or less."),

        country: z
            .string()
            .trim()
            .min(1, "Country is required.")
            .max(100, "Country must be 100 characters or less."),
            
        job_title: z
            .string()
            .trim()
            .min(1, "Job title is required.")
            .max(255, "Job title must be 255 characters or less."),

        job_code: z
            .string()
            .trim()
            .min(1, "Job code is required.")
            .max(30, "Job code must be 30 characters or less."),

        employment_type: z
            .string()
            .min(1, "Employment type is required."),

        workplace_type: z
            .string()
            .min(1, "Workplace type is required."),

        experience_level: z
            .string()
            .min(1, "Experience level is required."),

        minimum_experience: z
            .string()
            .min(1, "Minimum experience is required.")
            .refine(
                (value) => !isNaN(Number(value)) && Number(value) >= 0,
                "Minimum experience must be 0 or greater."
            ),

        maximum_experience: z
            .string()
            .min(1, "Maximum experience is required.")
            .refine(
                (value) => !isNaN(Number(value)) && Number(value) >= 0,
                "Maximum experience must be 0 or greater."
            ),
        minimum_salary: z
            .string()
            .refine(
                (value) =>
                    value === "" ||
                    (!isNaN(Number(value)) && Number(value) >= 0),
                "Minimum salary must be 0 or greater."
            ),

        maximum_salary: z
            .string()
            .refine(
                (value) =>
                    value === "" ||
                    (!isNaN(Number(value)) && Number(value) >= 0),
                "Maximum salary must be 0 or greater."
            ),

        currency: z
            .string()
            .min(1, "Currency is required."),

        vacancies: z
            .coerce
            .number()
            .int("Vacancies must be a whole number.")
            .min(1, "At least one vacancy is required."),

        location: z
            .string()
            .trim()
            .min(1, "Job location is required.")
            .max(150, "Location must be 150 characters or less."),

        required_skills: z
            .string()
            .trim()
            .min(1, "Required skills are required."),

        qualification: z
            .string()
            .trim()
            .min(1, "Minimum qualification is required.")
            .max(100, "Qualification must be 100 characters or less."),

        job_description: z
            .string()
            .trim()
            .min(1, "Job description is required."),

        responsibilities: z
            .string()
            .trim(),

        application_deadline: z
            .string(),

        // status: z
        //     .string()
        //     .min(1, "Job status is required."),

        is_featured: z
            .boolean(),
    })
    .refine(
        (data) =>
            Number(data.maximum_experience) >= Number(data.minimum_experience),
        {
            message:
                "Maximum experience must be greater than or equal to minimum experience.",
            path: ["maximum_experience"],
        }
    )
    
    .refine(
        (data) =>
            data.minimum_salary === "" ||
            data.maximum_salary === "" ||
            Number(data.maximum_salary) >= Number(data.minimum_salary),
        {
            message:
                "Maximum salary must be greater than or equal to minimum salary.",
            path: ["maximum_salary"],
        }
    );