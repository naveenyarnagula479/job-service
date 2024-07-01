import mongoose from "mongoose";

const modelName = "admin_templates";

const jdTemplateSchema = new mongoose.Schema({
    category_id:{
        type: Number,
        required: true
    },
    program_id:{
        type: Number,
        required: true
    },
    template_uid: { type: String,
        required: true,
        unique: true},
    job_title: { 
        type: String,
        required: true,
        unique: true
       },
    description: { 
        type: String,
        required: true},
    tools: { 
        type: JSON,
        required: true},
    skills: { 
        type: JSON,
        required: true },
    employment_type: { 
        type: JSON,
        required: true},
    job_type: { 
        type: JSON,
        required: true},
    shifts: { 
        type: JSON,
        required: true},
    interview: { 
        type: JSON,
        required: true },
    job_summary: { 
        type: String, 
        required: true },
    preferred_skills: { 
        type: String, 
        required: true },
    about_company: { 
        type: String, 
        required: true },
    education: { 
        type: String, 
        required: true },
    location: { 
        type: String, 
        required: true },
    no_of_openings: { 
        type: Number, 
        required: true },
    salary: { 
        type: String, 
        required: true },
    experience: { 
        type: String, 
        required: true },
    is_deleted: {
        type: Boolean,
        default: false
        },
    jobValidUpto:{
        type: Number,
        required: true
    },
    created_by: { 
        type: Number, 
        required: true },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_by: {
        type: Number,
        default: null,
    },
    updated_at:{
        type: Date,
        default: null
    }
});

export default mongoose.model(modelName, jdTemplateSchema);