import { HttpStatusCodes } from "@constants/status_codes";
import { getConnection, releaseConnection } from "@db/helpers/transaction";
import logger from "@logger";
import { IJobs, IListAPIResponse, IServiceResponse, IUserSession, ListAPIResponse, ServiceResponse } from "@models";
import * as JobsData from '@mongodb/helpers/lib/jobs';
import * as TemplateData from '@mongodb/helpers/lib/jd_template';
import { JOB_STATUS, USER_ROLES } from "@constants/master_data_constants";
import { AUTH_SERVICE_CONF } from "@config";
import axios from 'axios';


const TAG = 'service.jobs'

export async function saveJobDetails(userSession: IUserSession, jobDetails: IJobs): Promise<IServiceResponse> {
    logger.info(`${TAG}.saveJobDetails() ==> `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, 'Jobs created successfully');
    try {
        connection = await getConnection();
        const templateDetails = await TemplateData.getTemplateByUid(jobDetails.templateUid);
        if (templateDetails.templateUid) {
            const isJobExist = await JobsData.checkJobNameExists(templateDetails.jobTitle, userSession.userId);
            console.log(isJobExist);
            if (isJobExist.templateUid) {
                serviceResponse.addBadRequestError('job name already exist');
            } else {
                const jobInformation = await JobsData.addJobs(jobDetails, templateDetails, userSession.userId);
                serviceResponse.data = { jobUid: jobInformation.jobUid }
            }
        } else {
            serviceResponse.addBadRequestError('job template  doesn\'t exist');
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.saveJobDetails() `, error);
        serviceResponse.addServerError(`Failed to save job details due to technical difficulties`);
    } finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function getJobDetails(queryParams: any, userSession: IUserSession): Promise<IServiceResponse> {
    logger.info(`${TAG}.getJobDetails()`);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'job details fetched sucessfully')
    try {
        connection = await getConnection();
        if (userSession.role === USER_ROLES.admin) {
            serviceResponse.data = await getAdminJobsWithPagination(queryParams, userSession, serviceResponse);
        } else if (userSession.role === USER_ROLES.recruiter) {
            serviceResponse.data = await getRecruiterJobsWithPagination(queryParams, userSession, serviceResponse);
        } else if (userSession.role === USER_ROLES.student) {

        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getJobDetails()`, error);
        serviceResponse.addServerError(`Failed to fetch job details due to technical difficulties`);
    } finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
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
    logger.info(`${TAG}.updateTemplatesByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'jobs updated successfully');
    try {
        connection = await getConnection();
        const jobDetails = await JobsData.getJobsByUid(jobUid);
        if (jobDetails.jobUid) {
            const isJobExist = await JobsData.checkJobNameExists(jobDetails.jobTitle, userSession.userId, jobUid);
            if (isJobExist.jobUid) {
                serviceResponse.addBadRequestError('job name already exist');
            } else {
                await JobsData.updateJobsByUid(jobUid, jobDetails, userSession.userId, jobDetails.jobStatus);
                serviceResponse.data = { jobUid };
            }
        } else {
            serviceResponse.addBadRequestError("job uid does\'t exist");
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.updateJobsByUid()`, error);
        serviceResponse.addServerError(`Failed to update jobs due to technical difficulties`);

    } finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function getJobsByUid(userSession: IUserSession, jobUid: string): Promise<IServiceResponse> {
    logger.info(`${TAG}.getJobssByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'jobs fetched successfully');
    try {
        connection = await getConnection();
        const jobDetails = await JobsData.getJobsByUid(jobUid);
        if (jobDetails?.jobUid) {
            serviceResponse.data = jobDetails
        } else {
            serviceResponse.addBadRequestError('Job Uid does\t exist');
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getJobsByUid()`, error);
        serviceResponse.addServerError(`Failed to get jobs due to technical difficulties`);

    } finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function deleteJobsByUid(userSession: IUserSession, jobUid): Promise<IServiceResponse> {
    logger.info(`${TAG}.deleteJobsByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'jobs deleted sucessfully');
    try {
        connection = await getConnection();
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
    } finally {
        await releaseConnection(connection);
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
export async function updateJobStatus(userSession: IUserSession, jobUid: string, status: string): Promise<IServiceResponse> {
    logger.info(`${TAG}.updateJobStatus() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'job status updated sucessfully');
    try {
        connection = await getConnection();
        const jobDetails = await JobsData.getJobsByUid(jobUid);
        if (jobDetails.jobUid) {
            if (jobDetails.jobStatus !== JOB_STATUS.drafted && jobDetails.jobStatus !== JOB_STATUS.expired && jobDetails.jobStatus !== JOB_STATUS.inActive) {
                await JobsData.updateJobStatus(jobUid, userSession.userId, status);
                serviceResponse.data = {
                    jobUid: jobUid
                }
            } else {
                serviceResponse.addBadRequestError('Can\'t update this job');
            }
        } else {
            serviceResponse.addBadRequestError('Job Uid does\t exist');
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.updateJobStatus()`, error);
        serviceResponse.addServerError(`Failed to update job status due to technical difficulties`);
        throw error;
    } finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}