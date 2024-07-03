import logger from "@logger";
import JobPostingMessages from '@mongodb/models/job_posting_messages';
import { toCamelCase } from "@utils/formatter";
import mongoose from "mongoose";
import { findOne } from "../query";


const TAG = 'datasources.mongodb.helpers.lib.job_posting_messages';

export async function addJobPostingMessage(payload: any, jobUid: string, userId: number) {
    logger.info(TAG + '.addJobPostingMessage() ');
    try {
        const jobPostingMessage = new JobPostingMessages({
            message_uid: new mongoose.Types.ObjectId(),
            subject: payload.subject,
            description: payload.description,
            job_status: payload.status,
            job_uid: jobUid,
            created_at: new Date(),
            created_by: userId
        });
        const result = await jobPostingMessage.save();
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.addJobPostingMessage() `);
        throw error;
    }
}

export async function getJobPostingMessageByUid(messageUid: string) {
    logger.info(TAG + '.getJobPostingMessageByUid() ');
    try {
        const result = await findOne(JobPostingMessages, { 'message_uid': messageUid }, { _id: 0 });
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getJobPostingMessageByUid() `);
        throw error;
    }
}