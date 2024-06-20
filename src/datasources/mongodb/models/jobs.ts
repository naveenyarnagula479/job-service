import mongoose from "mongoose";

const modelName = "recruiter_jobs";

const jobsSchema = new mongoose.Schema({
    template_uid:{
        type: String,
        requierd: true
    },
    category_id:{
        type: Number,
        required: true
    },
    program_id:{
        type: Number,
        required: true
    },
    job_uid: { type: String,
        required: true,
        unique: true},
    job_title: { 
        type: String,
        required: true,
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
    is_deleted: {
        type: Boolean,
        default: false
        },
    job_status: {
            type: String,
            enum: ['DRAFTED', 'ACTIVE', 'INACTIVE'],
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

export default mongoose.model(modelName, jobsSchema);