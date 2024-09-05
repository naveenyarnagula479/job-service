import { JOB_STATUS } from "@constants/master_data_constants";
import logger from "@logger";
import { IJobs, IUserSession } from "@models";
import Jobs from '@mongodb/models/jobs';
import StudentJobs from "@mongodb/models/student_jobs";
import { toCamelCase } from "@utils/formatter";
import { calculateRemainingDays } from "@utils/string";
import mongoose from "mongoose";
import { countDocuments, findAllDistinctRecords, findAllRecords, findOne, findOneAndUpdate, joinTables } from '../query';

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

export async function addJobs(payload: IJobs, templateDetails: any, userSession: IUserSession) {
    logger.info(TAG + '.addJobs()');
    try {
        const jdTemplates = new Jobs({
            job_uid: new mongoose.Types.ObjectId(),
            template_uid: payload.templateUid,
            program_id: templateDetails.programId,
            category_id: templateDetails.categoryId,
            recruiter_id: userSession.userId,
            recruiter_uid: userSession.userUid,
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
            previous_status: JOB_STATUS.drafted,
            requested_on: new Date(),
            created_by: userSession.userId
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
            location: 1,
            salary: 1,
            job_status: 1,
            created_by: 1
        }, { skip: (queryParams.pageNum - 1) * queryParams.pageSize, limit: queryParams.pageSize });
        const jobs = result.map(job => toCamelCase(job.toObject()));
        if (queryParams.isActionableJobs) {
            for (var index in jobs) {
                const data = jobs[index];
                data.jobValidUpto = calculateRemainingDays(data.acceptedAt, data.jobValidUpto);
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

export async function getAllStudentActiveJobs(studentId: number) {
    logger.info(TAG + '.getAllStudentActiveJobs() ');
    try {
        const studentAppliedJobs = await findAllRecords(StudentJobs, { 'student_id': studentId, 'is_applied': true }, { _id: 0 });
        const appliedJobUids = studentAppliedJobs.map(appliedJob => appliedJob.job_uid);
        const result = await findAllRecords(Jobs, { 'job_uid': { '$nin': appliedJobUids }, 'job_status': JOB_STATUS.active }, { _id: 0 });
        let jobs = result.map(job => toCamelCase(job.toObject()));
        const savedJobs = await findAllRecords(StudentJobs, { 'student_id': studentId, 'is_saved': true }, { _id: 0 });
        jobs = jobs.filter(job => {
            job.isSaved = false;
            savedJobs.map(item => { if (item.job_uid === job.jobUid) { job.isSaved = true; } })
            return job;
        })
        return jobs;
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getAllStudentActiveJobs() `, error);
        throw error;
    }
}

export async function getAllAppliedJobs(studentId: number) {
    logger.info(TAG + '.getAllAppliedJobs() ');
    try {
        const studentAppliedJobs = await findAllRecords(StudentJobs, { 'student_id': studentId, 'is_applied': true }, { _id: 0 });
        const appliedJobUids = studentAppliedJobs.map(appliedJob => appliedJob.job_uid);
        const result = await findAllRecords(Jobs, { 'job_uid': { '$in': appliedJobUids } },
            {
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
                location: 1,
                salary: 1,
                job_status: 1,
                created_by: 1,
            });
        let jobs = result.map(job => toCamelCase(job.toObject()));
        return jobs.map(job => {
            const appliedJob = studentAppliedJobs.find(aj => aj.job_uid === job.jobUid);
            if (appliedJob) {
                return { ...job, selectionStatus: appliedJob.selection_status };
            }
            return job;
        });

    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getAllAppliedJobs() `, error);
        throw error;
    }
}

export async function getAllSavedJobs(studentId: number) {
    logger.info(TAG + '.getAllSavedJobs() ');
    try {
        const studentJobs = await findAllRecords(StudentJobs, { 'student_id': studentId }, { _id: 0 });
        const savedJobUids = studentJobs.map(savedJob => {
            if (savedJob.is_saved) {
                return savedJob.job_uid
            }
        });
        const appliedJobUids = studentJobs.map(appliedJob => {
            if (appliedJob.is_applied) {
                return appliedJob.job_uid;
            }
        });
        const result = await findAllRecords(Jobs, { 'job_uid': { '$in': savedJobUids, '$nin': appliedJobUids }, 'job_status': JOB_STATUS.active }, { _id: 0 });
        const jobs = result.map(job => toCamelCase(job.toObject()));
        return jobs;
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getAllSavedJobs() `, error);
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
            jobList.push(JOB_STATUS.pending, JOB_STATUS.onHold);
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
            job_valid_upto: 1,
            admin_accepted_at: 1,
            requested_on: 1,
            accepted_at: 1,
            employment_type: '$employment_type.name',
            experience: 1,
            salary: 1,
            job_status: 1,
            previous_status: 1,
            created_by: 1,
            is_rerequest: 1
        }, {});
        const jobs = result.map(job => toCamelCase(job.toObject()));
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
        let previousStatus = jobStatus
        if (jobStatus === JOB_STATUS.drafted || jobStatus === JOB_STATUS.onHold) {
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
                previous_status: previousStatus,
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
export async function updateJobStatus(jobUid: string, userId: number, status: string, previousStatus: string, messageUid: string) {
    logger.info(TAG + '.updateJobStatus() ');
    try {
        await findOneAndUpdate(Jobs,
            { 'job_uid': jobUid, 'is_deleted': false },
            {
                job_status: status,
                updated_by: userId,
                updated_at: new Date(),
                previous_status: previousStatus,
                ...(status === JOB_STATUS.active) && { 'accepted_at': new Date(), 'published_at': new Date() },
                message_uid: messageUid
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

export async function getAllRecruiterJobs(recruiterId: number): Promise<any> {
    logger.info(TAG + '.getAllRecruiterJobs() ');
    try {
        const result = await findAllRecords(Jobs, { 'recruiter_id': recruiterId }, { _id: 0 });
        return result.map(item => toCamelCase(item.toObject()));
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getAllRecruiterJobs() `);
        throw error;
    }
}

export async function getRecruiterJobsAppliedStudents(recruiterId, queryParams: any): Promise<any> {
    logger.info(TAG + '.getRecruiterJobsAppliedStudents() ');
    try {

        const pipeLine = [{
            $lookup: {
                from: StudentJobs.modelName,
                localField: 'job_uid',
                foreignField: 'job_uid',
                as: 'jobs'
            }
        },
        {
            $unwind: '$jobs'
        },
        {
            $match: {
                recruiter_id: parseInt(recruiterId),
                'jobs.is_applied': true,
                ...(queryParams.status === 'PENDING') ? { 'jobs.selection_status': JOB_STATUS.pending } : { 'jobs.selection_status': { $nin: [JOB_STATUS.pending] } },
            },
        },

        {
            $project: {
                _id: 0,
                studentId: '$jobs.student_id',
                jobUid: '$job_uid',
                jobRole: '$job_title',
                selectionStatus: '$jobs.selection_status',
                appliedOn: '$jobs.applied_date',
                isApplied: '$jobs.is_applied',
                studentUid: '$jobs.student_uid'
            }
        }
        ]
        const result = await joinTables(Jobs, pipeLine);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getRecruiterJobsAppliedStudents() `);
        throw error;
    }
}

export async function getJobRoles(recruiterId: number): Promise<any> {
    logger.info(TAG + '.getJobRoles() ');
    try {
        const jobs = await findAllRecords(Jobs, {
            recruiter_id: recruiterId,
        }, {
            _id: 0,
            'job_role': '$job_title'
        })
        return jobs.map(item => toCamelCase(item.toObject()));
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getJobRoles() `, error);
        throw error;
    }
}

export async function getRecruiterCreatedJobs(templateUids: any, recruiterUid: string): Promise<any> {
    logger.info(TAG + '.getRecruiterCreatedJobs() ');
    try {
        const jobs = await findAllRecords(Jobs, {
            recruiter_uid: recruiterUid,
            template_uid: { $in: templateUids },
        },
            { _id: 0, template_uid: 1 });
        return jobs;
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getRecruiterCreatedJobs() `, error);
        throw error;
    }
}