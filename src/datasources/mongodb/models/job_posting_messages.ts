import mongoose from "mongoose";


const modelName = 'job_posting_messages';

const jobPostingMesssagesSchema = new mongoose.Schema({
    message_uid: {
        type: String,
        required: true,
        unique: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    job_uid: {
        type: String,
        required: true,
    },
    job_status: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date()
    },
    created_by: {
        type: Number,
        required: true,
    }
});

export default mongoose.model(modelName, jobPostingMesssagesSchema);