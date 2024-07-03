import mongoose from "mongoose";

const modelName = "master_template";

const masterTemplateSchema = new mongoose.Schema({
    master_template_uid: {
        type: String,
        required: true,
        unique: true
    },
    job_title: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    tools: {
        type: JSON
    },
    skills: {
        type: JSON
    },
    employment_type: {
        type: JSON
    },
    job_type: {
        type: JSON
    },
    shifts: {
        type: JSON
    },
    interview: {
        type: JSON
    },
    requirements: {
        type: String,
        required: true,
    },
    job_summary: {
        type: String,
        required: true
    },
    preferred_skills: {
        type: String,
        required: true
    },
    about_company: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    job_valid_upto: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    no_of_openings: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    salary_type: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true
    },
    created_by: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_by: {
        type: Number
    },
    updated_at: {
        type: Date
    }

});

export default mongoose.model(modelName, masterTemplateSchema);