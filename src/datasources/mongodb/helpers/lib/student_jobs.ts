import logger from "@logger";
import { findOne, findOneAndUpdate } from "../query";
import StudentJobData from '@mongodb/models/student_jobs';
import { toCamelCase } from "@utils/formatter";
import mongoose from "mongoose";



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

export async function addStudentJob(jobUid: string, studentId: number, isApplied: boolean, isSaved: boolean = false): Promise<any> {
    logger.info(TAG + '.addStudentJob() ');
    try {
        const studentJob = new StudentJobData({
            student_job_uid: new mongoose.Types.ObjectId(),
            student_id: studentId,
            job_uid: jobUid,
            is_applied: isApplied,
            is_saved: isSaved,
            ...(isApplied) && { applied_date: new Date() },
            created_at: studentId,
            selection_status: 'IN_PROGRESS'
        })
        await studentJob.save();
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.addStudentJob() `);
        throw error;
    }
}

export async function updateStudentAppliedJob(studentJobUid: string, studentId: number) {
    logger.info(TAG + '.updateStudentAppliedJob() ');
    try {
        await findOneAndUpdate(StudentJobData, { 'student_job_uid': studentJobUid, 'student_id': studentId },
            {
                'is_applied': true,
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