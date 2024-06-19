import mongoose from "mongoose";


const modelName = "master_templates";

const masterTemplateSchema = new mongoose.Schema({
    uid: { type: String,
        required: true,
        unique: true},
    job_title: { 
        type: String
       },
    description: { 
        type: String},
    tools: { 
        type: Array},
    skills: { 
        type: Array },
    employment_type: { 
        type: Array},
    job_type: { 
        type: Array},
    shifts: { 
        type: Array},
    interview: { 
        type: Array },
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