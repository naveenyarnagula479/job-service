import logger from "@logger";
import Jobs  from '@mongodb/models/jobs';
import mongoose from "mongoose";
import { toCamelCase } from "@utils/formatter";
import {  AppError, IJobs } from "@models";
import { findOne, findOneAndUpdate, joinTables, findAllRecords } from '../query';
import { HttpStatusCodes } from "@constants/status_codes";

const TAG = 'datasources.mongodb.helpers.lib.jobs';
export async function addJobs(payload: IJobs, userId: number) {
        logger.info(TAG + '.addJobs()');
        try {
            const jdTemplates = new Jobs({
                job_uid: new mongoose.Types.ObjectId(),
                template_uid: payload.templateUid,
                program_id: payload.programId,
                category_id: payload.categoryId,
                job_title: payload.jobTitle,
                description: payload.description,
                tools: payload.tools,
                skills: payload.skills,
                employment_type: payload.employmentType,
                job_type: payload.jobType,
                shifts: payload.shifts,
                interview: payload.interview,
                job_summary: payload.jobSummary,
                preferred_skills: payload.preferredSkills,
                about_company: payload.aboutCompany,
                education: payload.education,
                job_start_date: payload.jobStartDate,
                job_end_date: payload.jobEndDate,
                location: payload.location,
                no_of_openings: payload.noOfOpenings,
                salary: payload.salary,
                experience: payload.experience,
                job_status:'DRAFTED',
                created_by: userId,
            });
            const result = await jdTemplates.save();
            return toCamelCase(result?.toObject());
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.addJobs() `, error);
            throw error;
        }
    }
    // export async function checkJobTitleNameExists(jobTitleName: string, categoryId: number, programId: number, templateUid: string, jobUid?: string) {
    //     logger.info(TAG + '.checkJobTitleNameExists()');
    //     try {
    //      const result = await findAllRecords(Jobs,{'program_id': programId, 'category_id': categoryId, 'job_title': jobTitleName, 'template_uid': templateUid, 'is_deleted':false},{_id:0})

    //         if (result.length > 0) {
    //             throw new AppError('job title  already exist', HttpStatusCodes.BAD_REQUEST);
    //         }
          
    
    //     } catch (error) {
    //         logger.error(`ERROR occurred in ${TAG}.checkJobTitleNameExists() `, error);
    //         throw error;
    //     }
    // }
    export async function getJobDetails(categoryId: number, programId: number, templateUid: string) {
        logger.info(TAG + '.getJobDetails()');
        try {
            const result = await findAllRecords(Jobs,{'category_id': categoryId, 'program_id': programId, 'template_uid': templateUid,'is_deleted':false},{ _id: 0});
            return result.map(job => toCamelCase(job.toObject()));
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.getJobDetails() `, error);
            throw error;
        }
    }

    export async function checkTemplateUidExist(categoryId: number, programId: number, jdTemplateUid: string) {
  
        logger.info(TAG + '.checkTemplateUidExist ');
        try {
            const result = await findOne(Jobs, { 'category_id': categoryId, 'program_id': programId, 'template_uid': jdTemplateUid, 'is_deleted': false }, { _id: 0 });
            return toCamelCase(result?.toObject());
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.checkTemplateUidExist() `, error);
            throw error;
        }
    }
    export async function checkJobUidExist(categoryId: number, programId: number, jobUid: string) {
  
        logger.info(TAG + '.checkJobUidExis ');
        try {
            const result = await findOne(Jobs, { 'category_id': categoryId, 'program_id': programId, 'job_uid': jobUid, 'is_deleted': false }, { _id: 0 });
            return toCamelCase(result?.toObject());
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.checkJobUidExist() `, error);
            throw error;
        }
    }
    export async function getJobsByUid(jobUid: string) {
        logger.info(TAG + '.getJobByUid() ');
        try {
            const result = await findOne(Jobs, { 'job_uid': jobUid, 'is_deleted': false }, { _id: 0 });
            return toCamelCase(result?.toObject());
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.getJobByUid() `, error);
            throw error;
        }
    }
    
    export async function updateJobsByUid(jobDetails: IJobs, jobUid: string, userId: number) {
        logger.info(`${TAG}.updateJobsByUid() `);
        try {
            const result = await findOneAndUpdate(Jobs,
                { 'job_uid': jobUid, 'is_deleted': false },
                {
                    description: jobDetails.description,
                    tools: jobDetails.tools,
                    skills: jobDetails.skills,
                    employment_type: jobDetails.employmentType,
                    job_type: jobDetails.jobType,
                    shifts: jobDetails.shifts,
                    interview: jobDetails.interview,
                    job_summary: jobDetails.jobSummary,
                    preferred_skills: jobDetails.preferredSkills,
                    about_company: jobDetails.aboutCompany,
                    education: jobDetails.education,
                    job_start_date: jobDetails.jobStartDate,
                    job_end_date: jobDetails.jobEndDate,
                    location: jobDetails.location,
                    no_of_openings: jobDetails.noOfOpenings,
                    salary: jobDetails.salary,
                    experience: jobDetails.experience,
                    updated_at: new Date(),
                    updated_by: userId
                });
                return result;
           
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.updateJobsByUid() `, error);
            throw error;
        }
    }
    export async function deleteJobsByUid(jobUid: string, userId: number) {
        logger.info(TAG + '.deleteJobsByUid() ');
        try {
            const result = await findOneAndUpdate(Jobs,
                { 'job_uid': jobUid, 'is_deleted': false },
                {
                    is_deleted: true,
                    updated_by: userId,
                    updated_at: new Date()
                });
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.deleteJobsByUid() `, error);
            throw error;
        }
    }
    export async function updateJobStatus(jobUid: string, userId: number, status: string) {
        logger.info(TAG + '.updateJobStatus() ');
        try {
            const result = await findOneAndUpdate(Jobs,
                { 'job_uid': jobUid, 'is_deleted': false },
                {
                    job_status: status,
                    updated_by: userId,
                    updated_at: new Date()
                });
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.updateJobStatus() `, error);
            throw error;
        }
    }