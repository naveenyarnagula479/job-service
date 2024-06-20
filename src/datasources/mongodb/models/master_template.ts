import mongoose from "mongoose";

const modelName = "master_templates";

const masterTemplateSchema = new mongoose.Schema({
    master_template_uid: { type: String,
        required: true,
        unique: true},
    job_title: { 
        type: String,
        required: true
       },
    description: { 
        type: String,
        required: true},
    tools: { 
        type: JSON},
    skills: { 
        type: JSON },
    employment_type: { 
        type: JSON},
    job_type: { 
        type: JSON},
    shifts: { 
        type: JSON},
    interview: { 
        type: JSON },
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
    job_start_date: { 
        type: String, 
        required: true },
    job_end_date: { 
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
    created_by: { 
        type: Number, 
        required: true },
    created_at:{
        type: Date,
        default: new Date()
    }    

});

export default mongoose.model(modelName, masterTemplateSchema);