import { JOB_STATUS } from "@constants/master_data_constants";
import mongoose from "mongoose";

const modelName = "recruiter_jobs";

const jobsSchema = new mongoose.Schema({
    template_uid: {
        type: String,
        requierd: true
    },
    category_id: {
        type: Number,
        required: true
    },
    category_name: {
        type: String,
        required: true,
    },
    program_id: {
        type: Number,
        required: true
    },
    job_uid: {
        type: String,
        required: true,
        unique: true
    },
    job_title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    tools: {
        type: JSON,
        required: true
    },
    skills: {
        type: JSON,
        required: true
    },
    employment_type: {
        type: JSON,
        required: true
    },
    job_type: {
        type: JSON,
        required: true
    },
    shifts: {
        type: JSON,
        required: true
    },
    interview: {
        type: JSON,
        required: true
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
        required: true,
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
    is_deleted: {
        type: Boolean,
        default: false
    },
    job_status: {
        type: String,
        enum: [JOB_STATUS.drafted, JOB_STATUS.request, JOB_STATUS.reRequest, JOB_STATUS.onHold, JOB_STATUS.active, JOB_STATUS.inActive, JOB_STATUS.pending],
        required: true
    },
    is_rerequest: {
        type: Boolean,
        default: false,
    },
    requested_on: {
        type: Date,
        required: true,
    },
    accepted_at: {
        type: Date,
    },
    published_at: {
        type: Date
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
        type: Number,
        default: null,
    },
    updated_at: {
        type: Date,
        default: null
    }
});

export default mongoose.model(modelName, jobsSchema);