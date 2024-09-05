import { AUTH_SERVICE_CONF } from "@config";
import { JOB_STATUS, STUDENT_JOB_TYPE, USER_ROLES } from "@constants/master_data_constants";
import { HttpStatusCodes } from "@constants/status_codes";
import logger from "@logger";
import { IJobs, IListAPIResponse, IServiceResponse, IUserSession, ListAPIResponse, ServiceResponse } from "@models";
import * as TemplateData from '@mongodb/helpers/lib/jd_template';
import * as JobPostingMessagesData from '@mongodb/helpers/lib/job_posting_messages';
import * as JobsData from '@mongodb/helpers/lib/jobs';
import * as StudentJobData from '@mongodb/helpers/lib/student_jobs';
import { calculateRemainingDays } from "@utils/string";
import axios from 'axios';
import { activeJobNotification, inActiveJobNotification, pendingJobNotification } from "./mail";
import { parseInt } from "lodash";
import student_jobs from "@mongodb/models/student_jobs";


const TAG = 'service.jobs'

export async function saveJobDetails(userSession: IUserSession, jobDetails: IJobs): Promise<IServiceResponse> {
    logger.info(`${TAG}.saveJobDetails() ==> `);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, 'Jobs created successfully');
    try {
        const templateDetails = await TemplateData.getTemplateByUid(jobDetails.templateUid);

        if (templateDetails.templateUid) {
            const isJobExist = await JobsData.checkJobNameExists(templateDetails.jobTitle, userSession.userId);
            if (isJobExist.templateUid) {
                serviceResponse.addBadRequestError('job name already exist');
            }
            const categoryIdExist = await TemplateData.checkCategoryIdExists(jobDetails.categoryId, jobDetails.templateUid);
            if(!categoryIdExist.categoryId){
                serviceResponse.addBadRequestError('categoryId doesn\t exist')
            } else {
                const jobInformation = await JobsData.addJobs(jobDetails, templateDetails, userSession);
                serviceResponse.data = { jobUid: jobInformation.jobUid }
                console.log("jshdjfha")
            }
        } else {
            serviceResponse.addBadRequestError('job template  doesn\'t exist');
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.saveJobDetails() `, error);
        serviceResponse.addServerError(`Failed to save job details due to technical difficulties`);
    }
    return serviceResponse;
}
export async function getJobDetails(queryParams: any, userSession: IUserSession): Promise<IServiceResponse> {
    logger.info(`${TAG}.getJobDetails()`);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'job details fetched sucessfully')
    try {
        if (userSession.role === USER_ROLES.admin) {
            serviceResponse.data = await getAdminJobsWithPagination(queryParams, userSession, serviceResponse);
        } else if (userSession.role === USER_ROLES.recruiter) {
            serviceResponse.data = await getRecruiterJobsWithPagination(queryParams, userSession, serviceResponse);
        } else if (userSession.role === USER_ROLES.student) {
            serviceResponse.data = await getStudentJobsWithPagination(queryParams, userSession, serviceResponse);
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getJobDetails()`, error);
        serviceResponse.addServerError(`Failed to fetch job details due to technical difficulties`);
    }
    return serviceResponse;
}

async function getStudentJobsWithPagination(queryParams: any, userSession: IUserSession, serviceResponse: IServiceResponse): Promise<any> {
    logger.info(`${TAG}.getStudentJobsWithPagination() `);
    try {
        let jobs;
        switch (queryParams.type) {
            case STUDENT_JOB_TYPE.appliedJobs:
                console.log('appliedJobs')
                jobs = await JobsData.getAllAppliedJobs(userSession.userId);
                break;
            case STUDENT_JOB_TYPE.savedJobs:
                console.log('savedJobs')
                jobs = await JobsData.getAllSavedJobs(userSession.userId);
                break;
            case STUDENT_JOB_TYPE.all:
            default:
                console.log('all');
                jobs = await JobsData.getAllStudentActiveJobs(userSession.userId);
                break;
        }
        let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
        if (offset < 0) {
            offset = 0;
        }
        const allStudentJobs = await StudentJobData.getAllStudentJobs();
        const applicationCountMap = allStudentJobs.reduce((acc, application) => {
            const jobUid = application.jobUid;
            acc[jobUid] = (acc[jobUid] || 0) + 1;
            return acc;
        }, {});

        jobs = jobs.map(job => {
            return {
                ...job,
                "noOfApplicants": applicationCountMap[job.jobUid] || 0
            }
        })
        const url = AUTH_SERVICE_CONF.baseUrl + AUTH_SERVICE_CONF.recruiter;
        const response = await axios.get(url);
        const users = response?.data.data || [];
        const combinedData = jobs.map(job => {
            const user = users.find(user => parseInt(user.userId) === job.createdBy);
            return { ...job, ...user };
        });
        let filteredData = queryParams.searchText ? combinedData.filter(item => {
            const companyNameSearch = item.companyName.toLowerCase().includes(queryParams.searchText.toLowerCase());
            const jobRoleSearch = item.jobTitle.toLowerCase().includes(queryParams.searchText.toLowerCase());
            return companyNameSearch || jobRoleSearch;
        }) : combinedData;

        filteredData = queryParams.location ? filteredData.filter(item => item.location.toLowerCase().includes(queryParams.location.toLowerCase())) : filteredData;

        const jobTypeIds = queryParams.jobTypeIds ? queryParams.jobTypeIds.split(',').map(id => parseInt(id)) : [];
        const employmentTypeIds = queryParams.employmentTypeIds ? queryParams.employmentTypeIds.split(',').map(id => parseInt(id)) : [];
        if (jobTypeIds.length) {
            filteredData = filteredData.filter(item => jobTypeIds.includes(parseInt(item.jobType.id)));
        }
        if (employmentTypeIds.length) {
            filteredData = filteredData.filter(item => employmentTypeIds.includes(parseInt(item.employmentType.id)));
        }

        if (queryParams.minExperience !== '' && queryParams.minExperience !== '' && queryParams.maxExperience !== undefined && queryParams.maxExperience !== undefined) {
            filteredData = filteredData.filter(item => {
                return item.experience >= parseInt(queryParams.minExperience) && item.experience <= parseInt(queryParams.maxExperience);
            });
        }

        if (queryParams.minSalary !== '' && queryParams.maxSalary !== '' && queryParams.minSalary !== undefined && queryParams.maxSalary !== undefined) {
            filteredData = filteredData.filter(item => {
                return item.salary >= parseInt(queryParams.minSalary) && item.salary <= parseInt(queryParams.maxSalary);
            });
        }

        const startIndex = (queryParams.pageNum - 1) * queryParams.pageSize;
        const endIndex = startIndex + queryParams.pageSize;
        const paginatedResults = filteredData.slice(startIndex, endIndex);
        const totalResults = filteredData.length;

        const responseData: IListAPIResponse = new ListAPIResponse(
            paginatedResults,
            parseInt(totalResults) > (queryParams.pageNum * queryParams.pageSize),
            offset + 1,
            offset + paginatedResults?.length,
            parseInt(totalResults),
            queryParams.sortBy,
            queryParams.sortOrder,
            queryParams.pageNum,
            queryParams.pageSize
        )
        return responseData;

    } catch (error) {
        if (error.message.includes('ECONNREFUSED')) {
            logger.error(`ERROR occurred in ${TAG}.getRecruiterJobsWithPagination() `, error);
            serviceResponse.addBadRequestError('Client server isn\'t active');
        } else {
            logger.error(`ERROR occurred in ${TAG}.getStudentJobsWithPagination() `, error);
            throw error;
        }
    }
}

async function getRecruiterJobsWithPagination(queryParams: any, userSession: IUserSession, serviceResponse: IServiceResponse): Promise<any> {
    logger.info(`${TAG}.getRecruiterJobsWithPagination() `);
    try {
        const { jobs, totalResultsCount } = await JobsData.getRecruiterJobsWithPagination(queryParams, userSession.userId);
        let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
        if (offset < 0) {
            offset = 0;
        }
        const responseData: IListAPIResponse = new ListAPIResponse(
            jobs,
            parseInt(totalResultsCount) > (queryParams.pageNum * queryParams.pageSize),
            offset + 1,
            offset + jobs?.length,
            parseInt(totalResultsCount),
            queryParams.sortBy,
            queryParams.sortOrder,
            queryParams.pageNum,
            queryParams.pageSize
        )
        return responseData;
    } catch (error) {
        if (error.message.includes('ECONNREFUSED')) {
            logger.error(`ERROR occurred in ${TAG}.getRecruiterJobsWithPagination() `, error);
            serviceResponse.addBadRequestError('Client server isn\'t actvie ');
        } else {
            logger.error(`ERROR occurred in ${TAG}.getRecruiterJobsWithPagination() `, error);
            throw error;
        }
    }
}

async function getAdminJobsWithPagination(queryParams: any, userSession: IUserSession, serviceResponse: IServiceResponse): Promise<any> {
    logger.info(`${TAG}.getAdminJobsWithPagination() `);
    try {
        const jobs = await JobsData.getAllJobs(queryParams);
        let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
        if (offset < 0) {
            offset = 0;
        }
        const url = AUTH_SERVICE_CONF.baseUrl + AUTH_SERVICE_CONF.recruiter;
        const response = await axios.get(url);
        const users = response?.data.data || [];
        const combinedData = jobs.map(job => {
            const user = users.find(user => parseInt(user.userId) === job.createdBy);
            return { ...job, ...user };
        });
        const filteredData = queryParams.searchText ? combinedData.filter(item => {
            const jobNameMatches = item.jobTitle.toLowerCase().includes(queryParams.searchText.toLowerCase());
            const userNameMatches = item.userName.toLowerCase().includes(queryParams.searchText.toLowerCase());
            return jobNameMatches || userNameMatches;
        }) : combinedData;
        const startIndex = (queryParams.pageNum - 1) * queryParams.pageSize;
        const endIndex = startIndex + queryParams.pageSize;
        const paginatedResults = filteredData.slice(startIndex, endIndex);
        const totalResults = filteredData.length;
        if (queryParams.isActionableJobs) {
            for (var index in filteredData) {
                const data = filteredData[index];
                data.jobValidUpto = calculateRemainingDays(data.acceptedAt, data.jobValidUpto);
                data.noOfApplicants = 1;
            }
        } else {
            for (var index in filteredData) {
                const data = filteredData[index];
                data.jobStatus = (data.jobStatus === JOB_STATUS.pending && data.previousStatus === JOB_STATUS.onHold) ? JOB_STATUS.reRequest : data.jobStatus;
                data.jobStatus = (data.jobStatus === JOB_STATUS.pending && data.previousStatus === JOB_STATUS.drafted) ? JOB_STATUS.newRequest : data.jobStatus;
            }
        }
        const responseData: IListAPIResponse = new ListAPIResponse(
            paginatedResults,
            parseInt(totalResults) > (queryParams.pageNum * queryParams.pageSize),
            offset + 1,
            offset + paginatedResults?.length,
            parseInt(totalResults),
            queryParams.sortBy,
            queryParams.sortOrder,
            queryParams.pageNum,
            queryParams.pageSize
        )
        return responseData;
    } catch (error) {
        if (error.message.includes('ECONNREFUSED')) {
            logger.error(`ERROR occurred  in ${TAG}.getAdminJobsWithPagination() `, error);
            serviceResponse.addBadRequestError('Client server isn\'t active ');
        } else {
            logger.error(`ERROR occurred in ${TAG}.getAdminJobsWithPagination() `, error);
            throw error;
        }
    }
}
export async function updateJobsByUid(userSession: IUserSession, jobDetails: IJobs, jobUid: any): Promise<IServiceResponse> {
    logger.info(`${TAG}.updateJobsByUid() `);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'jobs updated successfully');
    try {
        const jobData = await JobsData.getJobsByUid(jobUid);
        if (jobData.jobUid) {
            if (jobData.jobStatus === JOB_STATUS.drafted || jobData.jobStatus === JOB_STATUS.onHold) {
                const isJobExist = await JobsData.checkJobNameExists(jobData.jobTitle, userSession.userId, jobUid);
                if (isJobExist.jobUid) {
                    serviceResponse.addBadRequestError('job name already exist');
                } else {
                    await JobsData.updateJobsByUid(jobUid, jobDetails, userSession.userId, jobData.jobStatus);
                    serviceResponse.data = { jobUid };
                }
            } else {
                serviceResponse.addBadRequestError("Can't update this job");
            }
        } else {
            serviceResponse.addBadRequestError("job uid does\'t exist");
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.updateJobsByUid()`, error);
        serviceResponse.addServerError(`Failed to update jobs due to technical difficulties`);

    }
    return serviceResponse;
}
export async function getJobsByUid(userSession: IUserSession, jobUid: string): Promise<IServiceResponse> {
    logger.info(`${TAG}.getJobssByUid() `);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'jobs fetched successfully');
    try {
        let jobDetails = await JobsData.getJobsByUid(jobUid);
        if (jobDetails?.jobUid) {
            if (jobDetails?.messageUid) {
                jobDetails.message = await JobPostingMessagesData.getJobPostingMessageByUid(jobDetails.messageUid);
            }
            if (userSession.role === USER_ROLES.admin) {
                jobDetails.jobStatus = (jobDetails.jobStatus === JOB_STATUS.pending && jobDetails.previousStatus === JOB_STATUS.onHold) ? JOB_STATUS.reRequest : jobDetails.jobStatus;
                jobDetails.jobStatus = (jobDetails.jobStatus === JOB_STATUS.pending && jobDetails.previousStatus === JOB_STATUS.drafted) ? JOB_STATUS.newRequest : jobDetails.jobStatus;
            } else if (userSession.role === USER_ROLES.student) {
                const url = AUTH_SERVICE_CONF.baseUrl + AUTH_SERVICE_CONF.recruiter + `/${jobDetails.createdBy}`
                const response = await axios.get(url);
                const recruiterData = response?.data.data;
                const studentJob = await StudentJobData.getStudentJobByUid(jobDetails.jobUid, userSession.userId);
                jobDetails = {
                    ...jobDetails,
                    ...recruiterData,
                    ...(studentJob.isSaved) ? { 'isSaved': true } : { 'isSaved': false },
                    ...studentJob
                };
            }
            serviceResponse.data = jobDetails;
        } else {
            serviceResponse.addBadRequestError('Job Uid does\t exist');
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getJobsByUid()`, error);
        if (error.message.includes('ECONNREFUSED')) {
            serviceResponse.addServerError(`Client server isn't active`);
        } else {
            serviceResponse.addServerError(`Failed to get jobs due to technical difficulties`);
        }
    }
    return serviceResponse;
}
export async function deleteJobsByUid(userSession: IUserSession, jobUid): Promise<IServiceResponse> {
    logger.info(`${TAG}.deleteJobsByUid() `);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'jobs deleted sucessfully');
    try {
        const jobDetails = await JobsData.getJobsByUid(jobUid);
        if (jobDetails.jobUid) {
            await JobsData.deleteJobsByUid(jobUid, userSession.userId);
            serviceResponse.data = {
                jobUid: jobUid
            }
        } else {
            serviceResponse.addBadRequestError('Job Uid does\t exist');
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.deleteJobsByUid()`, error);
        serviceResponse.addServerError(`Failed to delete jobs due to technical difficulties`);
    }
    return serviceResponse;
}

export async function submitRecruiterRequest(jobUid: string, userSession: IUserSession): Promise<IServiceResponse> {
    logger.info(`${TAG}.submitRecruiterRequest() `);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'request submitted successfully');
    try {
        const jobDetails = await JobsData.getJobsByUid(jobUid, userSession.userId);
        if (jobDetails.jobUid) {
            await JobsData.submitRecruiterRequest(jobUid, jobDetails, userSession.userId);
            serviceResponse.data = { jobUid }
        } else {
            serviceResponse.addBadRequestError('job uid doesn\'t exist');
        }
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.submitRecruiterRequest() `);
        serviceResponse.addServerError(`Failed to submit recruiter request due to technical difficulties`);
    }
    return serviceResponse;
}
export async function updateJobStatus(userSession: IUserSession, jobUid: string, payload: any): Promise<IServiceResponse> {
    logger.info(`${TAG}.updateJobStatus() `);
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'job status updated sucessfully');
    try {
        payload = await validRequestForUpdateJobStatus(payload);
        const jobDetails = await JobsData.getJobsByUid(jobUid);
        if (jobDetails.jobUid) {
            if (userSession.role === USER_ROLES.admin) {
                await updateJobStatusByAmdin(userSession, payload, jobDetails, serviceResponse);
            } else if (userSession.role === USER_ROLES.recruiter) {
                await updateJobStatusByRecruiter(userSession, payload, jobDetails, serviceResponse);
            }
        } else {
            serviceResponse.addBadRequestError('Job Uid does\t exist');
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.updateJobStatus()`, error);
        if (error.message.includes('ECONNREFUSED')) {
            serviceResponse.addBadRequestError('Client server isn\'t active ');
        } else {
            serviceResponse.addServerError("Failed to update job status due to tech difficulties");
        }
    }
    return serviceResponse;
}

async function updateJobStatusByRecruiter(userSession: IUserSession, payload: any, jobDetails: any, serviceResponse: IServiceResponse) {
    logger.info(TAG + '.updateJobStatusByRecruiter() ');
    try {
        const ALLOWED_STATUSES = new Set([JOB_STATUS.drafted, JOB_STATUS.active, JOB_STATUS.inActive]);
        if (!ALLOWED_STATUSES.has(payload.status)) {
            serviceResponse.addBadRequestError('Invalid job status');
            return;
        }
        if (jobDetails.jobStatus === JOB_STATUS.active) {
            if (payload.status === JOB_STATUS.inActive) {
                const result = await JobPostingMessagesData.addJobPostingMessage(payload, jobDetails.jobUid, userSession.userId);
                await JobsData.updateJobStatus(jobDetails.jobUid, userSession.userId, payload.status, jobDetails.jobStatus, result.messageUid);
            } else {
                serviceResponse.addBadRequestError('You can\'t change your job status');
            }
        } else {
            serviceResponse.addBadRequestError('You can\'t change your job status');
        }
        return serviceResponse;
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateJobStatusByRecruiter() `, error);
        throw error;
    }
}

async function updateJobStatusByAmdin(userSession: IUserSession, payload: any, jobDetails: any, serviceResponse: IServiceResponse) {
    logger.info(TAG + '.updateJobStatusByAdmin() ');
    try {
        const ALLOWED_STATUSES = new Set([JOB_STATUS.onHold, JOB_STATUS.active, JOB_STATUS.inActive]);
        const url = AUTH_SERVICE_CONF.baseUrl + AUTH_SERVICE_CONF.recruiter + `/${jobDetails.createdBy}`;
        const userReponse = await axios.get(url);
        const user = userReponse?.data?.data;
        if (user) {
            if (!ALLOWED_STATUSES.has(payload.status)) {
             
                serviceResponse.addBadRequestError('Invalid job status');
                return;
            }
            if (jobDetails.jobStatus !== JOB_STATUS.drafted && jobDetails.jobStatus !== JOB_STATUS.expired &&
                jobDetails.jobStatus !== JOB_STATUS.inActive && jobDetails.jobStatus !== JOB_STATUS.onHold) {
                const result = await JobPostingMessagesData.addJobPostingMessage(payload, jobDetails.jobUid, userSession.userId);
                switch (payload.status) {
                    case JOB_STATUS.onHold:
                        if (jobDetails.jobStatus !== JOB_STATUS.active) {
                           
                            await JobsData.updateJobStatus(jobDetails.jobUid, userSession.userId, payload.status, jobDetails.jobStatus, result.messageUid);
                            pendingJobNotification(payload, user);
                        } else {
                            serviceResponse.addBadRequestError('You can\'t update this job');
                        }
                        break;
                    case JOB_STATUS.active:
                        await JobsData.updateJobStatus(jobDetails.jobUid, userSession.userId, payload.status, jobDetails.jobStatus, result.messageUid);
                        activeJobNotification(payload, user, jobDetails);
                        break;
                    case JOB_STATUS.inActive:
                        if (jobDetails.jobStatus === JOB_STATUS.active) {
                            await JobsData.updateJobStatus(jobDetails.jobUid, userSession.userId, payload.status, jobDetails.jobStatus, result.messageUid);
                            inActiveJobNotification(payload, user, jobDetails);
                        } else {
                            serviceResponse.addBadRequestError('You can\'t update this job');
                        }
                        break;
                    default: break;
                }
                serviceResponse.data = { jobUid: jobDetails.jobUid }

            } else {
                serviceResponse.addBadRequestError('Can\'t update this job');
            }
        } else {
            serviceResponse.addBadRequestError('invalid user');
        }
        return serviceResponse;
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateJobStatusByAdmin() `, error);
        throw error;
    }
}

async function validRequestForUpdateJobStatus(payload: any) {
    try {
        if (payload.status === JOB_STATUS.active) {
            payload.subject = 'Your Job Posting on CareerPedia Has Been Approved!';
            payload.description = `We are glad to inform you that your job posting on our CareerPedia platform has been approved.`
        }else{
            payload.subject ='Your Job Posting on Careerpedia had been deactive';
        }
        return payload;
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.validateRequestForUpdateJobStatus() `, error);
        throw error;
    }
}

export async function applyStudentJob(jobUid: string, userSession: IUserSession, token: any): Promise<IServiceResponse> {
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, 'Job applied successfully');
    try {
        const jobDetails = await JobsData.getJobsByUid(jobUid);
        if (jobDetails.jobStatus === JOB_STATUS.active) {
            const url = AUTH_SERVICE_CONF.baseUrl + AUTH_SERVICE_CONF.student + `/${userSession.userUid}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const student = response?.data.data;
            if (student.resumeFileUid) {
                const studentJobDetails = await StudentJobData.getStudentJobByUid(jobUid, userSession.userId);
                if (studentJobDetails.jobUid) {
                    await StudentJobData.updateStudentAppliedJob(studentJobDetails.studentJobUid, student.resumeFileUid, userSession.userId);
                } else {
                    await StudentJobData.addStudentJob(jobUid, userSession, student.resumeFileUid, true,);
                }
            } else {
                serviceResponse.addBadRequestError('Please complete your profile');
            }
        } else {
            serviceResponse.addBadRequestError(`job uid doesn't exist`);
        }
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.applyStudentJob() `, error);
        if (error.message.includes('ECONNREFUSED')) {
            serviceResponse.addBadRequestError('Client server isn\'t active');
        } else {
            serviceResponse.addServerError(`Failed to save apply job due to tech difficulties`);
        }
    }
    return serviceResponse;
}

export async function toggleSaveJobStatus(jobUid: string, userSession: IUserSession, isSaved: boolean): Promise<IServiceResponse> {
    logger.info(TAG + '.toggleSaveJobStatus() ');
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'job action done successfully');
    try {
        const jobDetails = await JobsData.getJobsByUid(jobUid);
        if (jobDetails.jobStatus === JOB_STATUS.active) {
            const studentJobDetails = await StudentJobData.getStudentJobByUid(jobUid, userSession.userId);
            if (studentJobDetails.jobUid) {
                await StudentJobData.updateStudentSavedJob(studentJobDetails.studentJobUid, userSession.userId, isSaved);
            } else {
                await StudentJobData.addStudentJob(jobUid, userSession, null, false, true);
            }
        } else {
            serviceResponse.addBadRequestError(`job uid doesn't exist`);
        }
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.toggleSaveJobStatus() `, error);
        serviceResponse.addServerError(`Failed to save/unsave job due to tech difficulties`);
    }
    return serviceResponse;
}

export async function fetchAppliedCandidates(userSession: IUserSession, queryParams: any, token: any): Promise<IServiceResponse> {
    logger.info(TAG + '.fetchAppliedCandidates() ');
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'data fetched successfully');
    try {
        const allJobs = await JobsData.getRecruiterJobsAppliedStudents(userSession.userId, queryParams);
        const studentIdsSet = new Set(allJobs.map(job => job.studentId));
        const studentIds = Array.from(studentIdsSet).join(',');
        const url = AUTH_SERVICE_CONF.baseUrl + AUTH_SERVICE_CONF.student;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { ids: studentIds }
        });
        const studentList = response?.data.data;
        const combinedData = allJobs.map(job => {
            const student = studentList.find(student => parseInt(student.studentId) === job.studentId);
            return { ...job, ...student };
        });
        // let filteredData = queryParams.searchText ? combinedData.filter(item => {
        //     console.log(item);
        //     const userNameMatches = item.studentName.toLowerCase().includes(queryParams.searchText.toLowerCase());
        //     const emailMatches = item.email.toLowerCase().includes(queryParams.searchText.toLowerCase());
        //     return emailMatches || userNameMatches;
        // }) : combinedData;

        // if (queryParams.jobRole != undefined && queryParams.jobRole !== '') {
        //     filteredData = filteredData.filter(item => {
        //         return item.jobRole === queryParams.jobRole;
        //     })
        // }

        let filteredData = combinedData;
        console.log(studentList);
        // console.log(filteredData);
        if (queryParams.searchText) {
            const searchText = queryParams.searchText.toLowerCase();
            filteredData = combinedData.filter(item => {
                const userNameMatches = item.studentName && item.studentName.toLowerCase().includes(searchText);
                const emailMatches = item.email && item.email.toLowerCase().includes(searchText);
                return emailMatches || userNameMatches;
            });
        }

        if (queryParams.jobRole) {
            filteredData = filteredData.filter(item => item.jobRole === queryParams.jobRole);
        }
        let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
        if (offset < 0) {
            offset = 0;
        }
        const startIndex = (queryParams.pageNum - 1) * queryParams.pageSize;
        const endIndex = startIndex + queryParams.pageSize;
        const paginatedResults = filteredData.slice(startIndex, endIndex);
        const totalResults = filteredData.length;
        const responseData: IListAPIResponse = new ListAPIResponse(
            paginatedResults,
            parseInt(totalResults) > (queryParams.pageNum * queryParams.pageSize),
            offset + 1,
            offset + paginatedResults?.length,
            parseInt(totalResults),
            queryParams.sortBy,
            queryParams.sortOrder,
            queryParams.pageNum,
            queryParams.pageSize
        )
        serviceResponse.data = responseData;
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.fetchAppliedCandidates() `, error);
        if (error.message.includes('ECONNREFUSED')) {
            serviceResponse.addBadRequestError('Client server isn\t active');
        } else {
            serviceResponse.addServerError(`Failed to fetch applied candidates due to tech difficulties `);
        }
    }
    return serviceResponse;
}

export async function getJobsByStudentUid(userSession: IUserSession, studentUid: string, jobUid: string, token: any): Promise<IServiceResponse> {
    logger.info(TAG + 'getStudentJobByUid() ');
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'data fetched successfully');
    try {
        const url = AUTH_SERVICE_CONF.baseUrl + AUTH_SERVICE_CONF.student + `/${studentUid}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const studentData = response?.data.data;
        const studentId = studentData.studentProfileDetails.studentPersonalDetails.studentId;
        const studentJobData = await StudentJobData.getStudentJobByUid(jobUid, parseInt(studentId));
        serviceResponse.data = { ...studentData, studentJobData }
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getJobsByStudentUid() `, error);
        if (error.message.includes('ECONNREFUSED')) {
            serviceResponse.addBadRequestError('Client server isn\'t active');
        } else {
            serviceResponse.addServerError('Failed to get job by student uid due to tech difficulites');
        }
    }
    return serviceResponse;
}

export async function updateStudentJobStatus(userSession: IUserSession, jobUid: string, studentUid: string, status: string): Promise<IServiceResponse> {
    logger.info(TAG + '.updateStudentJobStatus() ');
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'status updated successfully');
    try {
        const studentJob: any = await StudentJobData.getStudentJobByStudentUid(jobUid, studentUid);
        if (studentJob.jobUid) {
            await StudentJobData.updateStudentSelectionStatus(jobUid, studentUid, status, userSession);
        } else {
            serviceResponse.addBadRequestError('student didn\'t applied for this job');
        }
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateStudentJobStatus() `, error);
        serviceResponse.addServerError(`Failed to update job status due to tech difficulties`);
    }
    return serviceResponse;

}