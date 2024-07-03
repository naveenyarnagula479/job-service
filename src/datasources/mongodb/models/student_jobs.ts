import mongoose from 'mongoose';

const modelName = "student_jobs";

const studentJobSchema = new mongoose.Schema({
    student_job_uid: {
        type: String,
        required: true,
        unique: true
    },
    student_id: {
        type: Number,
        required: true
    },
    job_uid: {
        type: String,
        required: true
    },
    is_applied: {
        type: Boolean,
        default: false,
    },
    is_saved: {
        type: Boolean,
        default: false,
    },
    resume_file_uid: {
        type: String,
        default: false,
    },
    selection_status: {
        type: String,
        enum: ['IN_PROGRESS', 'SELECTED', 'REJECTED'],
        default: null,
    },
    applied_date: {
        type: Date,
        default: null,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    created_by: {
        type: Number,
        required: true,
    },
    updated_by: {
        type: Number,
        default: null,
    },
    updated_at: {
        type: Date,
        default: null,
    }
});

export default mongoose.model(modelName, studentJobSchema);