import logger from "@logger";
import { findAllRecords, findOne, findOneAndUpdate } from "../query";
import StudentJobData from '@mongodb/models/student_jobs';
import { toCamelCase } from "@utils/formatter";
import mongoose from "mongoose";
import { EXAM_STATUS, JOB_STATUS } from "@constants/master_data_constants";
import { IUserSession } from "@models";



const TAG = 'datasources.mongodb.helpers.lib.jobs';

export async function getStudentJobByUid(jobUid: string, studentId: number): Promise<any> {
    logger.info(TAG + '.getStudentJobByUid() ');
    try {
        const result = await findOne(StudentJobData, {
            'job_uid': jobUid,
            'student_id': studentId
        }, { _id: 0 });
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getStudentJobByUid() `);
        throw error;
    }
}

export async function getStudentJobByStudentUid(jobUid: string, studentUid: string): Promise<any> {
    logger.info(TAG + '.getStudentJobByStudentUid() ');
    try {
        const result = await findOne(StudentJobData, {
            'job_uid': jobUid,
            'student_uid': studentUid,
        }, { _id: 0 });
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getStudentJobByStudentUid() `);
        throw error;
    }
}

export async function updateStudentSelectionStatus(jobUid: string, studentUid: string, status: string, userSession: IUserSession) {
    logger.info(TAG + '.updateStudentSelectionStatus() ');
    try {
        await findOneAndUpdate(StudentJobData, { 'student_uid': studentUid, 'job_uid': jobUid }, {
            'selection_status': status,
            'updated_by': userSession.userId,
            'updated_at': new Date()
        })
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateStudentSelectionStatus() `);
        throw error;
    }
}

export async function addStudentJob(jobUid: string, userSession: IUserSession, resumeFileUid?: string, isApplied: boolean = false, isSaved: boolean = false): Promise<any> {
    logger.info(TAG + '.addStudentJob() ');
    try {
        const studentJob = new StudentJobData({
            student_job_uid: new mongoose.Types.ObjectId(),
            student_id: userSession.userId,
            student_uid: userSession.userUid,
            job_uid: jobUid,
            is_applied: isApplied,
            is_saved: isSaved,
            ...(isApplied) && { applied_date: new Date() },
            ...(resumeFileUid) && { resume_file_uid: resumeFileUid },
            created_by: userSession.userId,
            selection_status: JOB_STATUS.pending
        })
        await studentJob.save();
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.addStudentJob() `);
        throw error;
    }
}

export async function updateStudentAppliedJob(studentJobUid: string, resumeFileUid: string, studentId: number) {
    logger.info(TAG + '.updateStudentAppliedJob() ');
    try {
        await findOneAndUpdate(StudentJobData, { 'student_job_uid': studentJobUid, 'student_id': studentId },
            {
                'is_applied': true,
                'resume_file_uid': resumeFileUid,
                'applied_date': new Date(),
                'updated_by': studentId,
                'updated_at': new Date()
            }
        );
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateStudentAppliedJob() `, error);
        throw error;
    }
}

export async function updateStudentSavedJob(studentJobUid: string, studentId: number, isSaved: boolean) {
    logger.info(TAG + '.updateStudentSavedJob() ');
    try {
        await findOneAndUpdate(StudentJobData, { 'student_job_uid': studentJobUid, 'student_id': studentId },
            {
                'is_saved': isSaved,
                'updated_by': studentId,
                'updated_at': new Date()
            });
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateStudentSavedJob() `, error);
        throw error;
    }
}

export async function getAllStudentJobs() {
    logger.info(TAG + '.getAllStudentJobs() ');
    try {
        const result = await findAllRecords(StudentJobData, {}, { _id: 0 });
        return result.map(item => toCamelCase(item.toObject()));
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getAllStudentJobs() `, error);
        throw error;
    }
}

export async function getAppliedJobs(userId: number): Promise<any> {
    logger.info(TAG + '.getAppliedJobs() ');
    try {
        const result = await findAllRecords(StudentJobData, { 'recruiter_id': userId, 'selection_status': JOB_STATUS.pending }, { _id: 0 });
        return result.map(item => toCamelCase(item.toObject()));
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getAppliedJobs() `, error);
        throw error;
    }
}