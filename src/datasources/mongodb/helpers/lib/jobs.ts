import { JOB_STATUS } from "@constants/master_data_constants";
import logger from "@logger";
import { IJobs, IUserSession } from "@models";
import Jobs from '@mongodb/models/jobs';
import { toCamelCase } from "@utils/formatter";
import mongoose from "mongoose";
import { countDocuments, findAllRecords, findOne, findOneAndUpdate } from '../query';
import { calculateRemainingDays } from "@utils/string";

const TAG = 'datasources.mongodb.helpers.lib.jobs';

export async function checkJobNameExists(jobTitleName: string, userId: number, jobUid?: string) {
    logger.info(TAG + '.checkJobNameExists() ');
    try {
        const result = await findOne(Jobs,
            {
                'job_title': jobTitleName,
                'is_deleted': false,
                'job_status': { $nin: [JOB_STATUS.expired, JOB_STATUS.inActive] },
                ...(jobUid && { 'job_uid': { $ne: jobUid } }),
                'created_by': userId
            },
            { _id: 0 });
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.checkJobNameExists()  `, error);
        throw error;
    }
}
export async function addJobs(payload: IJobs, templateDetails: any, userId: number) {
    logger.info(TAG + '.addJobs()');
    try {
        const jdTemplates = new Jobs({
            job_uid: new mongoose.Types.ObjectId(),
            template_uid: payload.templateUid,
            program_id: templateDetails.programId,
            category_id: templateDetails.categoryId,
            category_name: templateDetails.categoryName,
            job_title: templateDetails.jobTitle,
            description: payload.description,
            tools: payload.tools,
            skills: payload.skills,
            employment_type: payload.employmentType,
            job_type: payload.jobType,
            shifts: payload.shifts,
            interview: payload.interview,
            requirements: payload.requirements,
            job_summary: payload.jobSummary,
            preferred_skills: payload.preferredSkills,
            about_company: payload.aboutCompany,
            education: payload.education,
            job_valid_upto: payload.jobValidUpto,
            location: payload.location,
            no_of_openings: payload.noOfOpenings,
            salary: payload.salary,
            salary_type: payload.salaryType,
            experience: payload.experience,
            job_status: JOB_STATUS.drafted,
            requested_on: new Date(),
            created_by: userId
        });
        const result = await jdTemplates.save();
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.addJobs() `, error);
        throw error;
    }
}

export async function getRecruiterJobsWithPagination(queryParams: any, userId: number): Promise<any> {
    logger.info(TAG + '.getRecruiterJobsWithPagination() ');
    try {
        let jobList: string[] = [];
        if (queryParams.isActionableJobs) {
            jobList.push(JOB_STATUS.active, JOB_STATUS.inActive, JOB_STATUS.expired);
        } else {
            jobList.push(JOB_STATUS.pending, JOB_STATUS.onHold, JOB_STATUS.drafted);
        }
        const result = await findAllRecords(Jobs, {
            ...(queryParams.searchText) && { 'job_title': queryParams.searchText },
            ...(queryParams.categoryId) && { 'category_id': queryParams.categoryId },
            'job_status': { $in: jobList },
            'created_by': userId
        }, {
            _id: 0,
            job_uid: 1,
            job_title: 1,
            category_name: 1,
            no_of_openings: 1,
            admin_accepted_at: 1,
            job_valid_upto: 1,
            requested_on: 1,
            accepted_at: 1,
            employment_type: '$employment_type.name',
            experience: 1,
            salary: 1,
            job_status: 1,
            created_by: 1
        }, { skip: (queryParams.pageNum - 1) * queryParams.pageSize, limit: queryParams.pageSize });
        const jobs = result.map(job => toCamelCase(job.toObject()));
        if (queryParams.isActionableJobs) {
            for (var index in jobs) {
                const data = jobs[index];
                data.jobValidUpto = await calculateRemainingDays(data.acceptedAt, data.jobValidUpto);
            }
        }
        const totalResultsCount = await countDocuments(Jobs,
            {
                ...(queryParams.searchText) && { 'job_title': queryParams.searchText },
                ...(queryParams.categoryId) && { 'category_id': queryParams.categoryId },
                'job_status': { $in: jobList },
                'created_by': userId
            });
        return { jobs, totalResultsCount };
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getRecruiterJobsWithPagination() `, error);
        throw error;
    }
}



export async function getAllJobs(queryParams: any) {
    logger.info(TAG + '.getAllJobs()');
    try {
        let jobList: string[] = [];
        if (queryParams.isActionableJobs) {
            jobList.push(JOB_STATUS.active, JOB_STATUS.inActive, JOB_STATUS.expired);
        } else {
            jobList.push(JOB_STATUS.pending, JOB_STATUS.onHold, JOB_STATUS.drafted);
        }
        const result = await findAllRecords(Jobs,
            {
                ...(queryParams.categoryId) && { 'category_id': queryParams.categoryId },
                'job_status': { $in: jobList }
            }, {
            _id: 0,
            job_uid: 1,
            job_title: 1,
            location: 1,
            category_name: 1,
            no_of_openings: 1,
            admin_accepted_at: 1,
            requested_on: 1,
            accepted_at: 1,
            employment_type: '$employment_type.name',
            experience: 1,
            salary: 1,
            job_status: 1,
            created_by: 1

        }, {});
        // { skip: (queryParams.pageNum - 1) * queryParams.pageSize, limit: queryParams.pageSize });
        const jobs = result.map(job => toCamelCase(job.toObject()));
        // const totalResultsCount = await countDocuments(Jobs,
        //     {
        //         ...(queryParams.categoryId) && { 'category_id': queryParams.categoryId },
        //         'job_status': { $in: jobList }
        //     })
        return jobs;
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getAllJobs() `, error);
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
export async function getJobsByUid(jobUid: string, userId?: number) {
    logger.info(TAG + '.getJobByUid() ');
    try {
        const result = await findOne(Jobs, { 'job_uid': jobUid, 'is_deleted': false, ...(userId) && { 'created_by': userId } }, { _id: 0 });
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getJobByUid() `, error);
        throw error;
    }
}

export async function updateJobsByUid(jobUid: string, jobDetails: IJobs, userId: number, jobStatus: string) {
    logger.info(`${TAG}.updateJobsByUid() `);
    try {
        if (jobStatus !== JOB_STATUS.drafted) {
            jobStatus = JOB_STATUS.pending
        }
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
                location: jobDetails.location,
                no_of_openings: jobDetails.noOfOpenings,
                salary: jobDetails.salary,
                experience: jobDetails.experience,
                job_status: jobStatus,
                is_rerequest: false,
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
        await findOneAndUpdate(Jobs,
            { 'job_uid': jobUid, 'is_deleted': false },
            {
                job_status: status,
                updated_by: userId,
                updated_at: new Date(),
                ...(status === JOB_STATUS.active) && { 'accepted_at': new Date(), 'published_at': new Date() }
            });
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateJobStatus() `, error);
        throw error;
    }
}

export async function submitRecruiterRequest(jobUid: string, jobDetails: any, userId: number) {
    logger.info(TAG + '.submitRecruiterRequest() ');
    try {
        await findOneAndUpdate(Jobs, { 'job_uid': jobUid, 'is_deleted': false },
            {
                job_status: JOB_STATUS.pending,
                updated_by: userId,
                updated_at: new Date()
            }
        )
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.submitRecruiterRequest() `, error);
        throw error;
    }
}
