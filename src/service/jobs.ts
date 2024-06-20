import { IServiceResponse,  IUserSession, ServiceResponse, IJobs   } from "@models";
import logger from "@logger";
import { HttpStatusCodes } from "@constants/status_codes";
import { getConnection, releaseConnection } from "@db/helpers/transaction";
import * as jobsData from '@mongodb/helpers/lib/jobs';


const TAG = 'service.jobs'

export async function saveJobDetails(userSession: IUserSession, jobDetails: IJobs): Promise<IServiceResponse>{
    logger.info(`${TAG}.saveJobDetails() ==> `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, 'Jobs created successfully');
    try{
        connection = await getConnection();
        const jobInformation = await jobsData.addJobs(jobDetails, userSession.userId);
        serviceResponse.data= { jobUid:jobInformation.jobUid}
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.saveJobDetails() `, error);
        serviceResponse.addServerError(`Failed to save job details due to technical difficulties`);
        throw error;
    }finally{
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function getJobDetails(queryParams: any, userSession: IUserSession): Promise<IServiceResponse>{
    logger.info(`${TAG}.getJobDetails()`);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK,'job details fetched sucessfully')
    try{
        connection = await getConnection();
        const templateDetails = await jobsData.checkTemplateUidExist(queryParams.categoryId, queryParams.programId, queryParams.templateUid);
        if(templateDetails){
            const jobDetails = await jobsData.getJobDetails(templateDetails.categoryId, templateDetails.programId, templateDetails.templateUid);
            serviceResponse.data={
                recruiterJobs: jobDetails
            }
        }
        else{
            serviceResponse.addBadRequestError('job uid does\t exist');
        }
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.getJobDetails()`, error);
        serviceResponse.addServerError(`Failed to fetch job details due to technical difficulties`);
        throw error;
    }finally{
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function updateJobsByUid(userSession: IUserSession, jobDetails: IJobs, jobUid: any): Promise<IServiceResponse>{
    logger.info(`${TAG}.updateTemplatesByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'jobs updated successfully');
    try{
        connection = await getConnection();
        const jobExist = await jobsData.checkJobUidExist(jobDetails.categoryId, jobDetails.programId, jobUid);
        if(jobExist){
       const jobInformation = await jobsData.updateJobsByUid(jobDetails, jobUid, userSession.userId);
           serviceResponse.data ={
            jobDetails: jobInformation
           }
        }
        else{
            serviceResponse.addBadRequestError('Job Uid does\t exist');
        }
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.updateJobsByUid()`, error);
        serviceResponse.addServerError(`Failed to update jobs due to technical difficulties`);
        throw error;
    }finally{
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function getJobsByUid(userSession: IUserSession, jobUid: string): Promise<IServiceResponse>{
    logger.info(`${TAG}.getJobssByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'jobs fetched successfully' );
    try{
        connection = await getConnection();
        const jobDetails = await jobsData.getJobsByUid(jobUid);
        if(jobDetails?.jobUid){
            serviceResponse.data={
                jobDetails: jobDetails
            }
    }else{
        serviceResponse.addBadRequestError('Job Uid does\t exist');
    }
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.getJobsByUid()`, error);
        serviceResponse.addServerError(`Failed to get jobs due to technical difficulties`);
        throw error;
    }finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function deleteJobsByUid(userSession: IUserSession, jobUid): Promise<IServiceResponse>{
    logger.info(`${TAG}.deleteJobsByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'jobs deleted sucessfully');
    try{
        connection = await getConnection();
        const jobDetails = await jobsData.getJobsByUid(jobUid);
        if(jobDetails.jobUid){
             await jobsData.deleteJobsByUid(jobUid,userSession.userId);
            serviceResponse.data={
                jobUid: jobUid
             }
    }else{
        serviceResponse.addBadRequestError('Job Uid does\t exist');
    }
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.deleteJobsByUid()`, error);
        serviceResponse.addServerError(`Failed to delete jobs due to technical difficulties`);
        throw error;
    }finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function updateJobStatus(userSession: IUserSession, jobUid: string, status: string): Promise<IServiceResponse>{
    logger.info(`${TAG}.updateJobStatus() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'job status updated sucessfully');
    try{
        connection = await getConnection();
        const jobDetails = await jobsData.getJobsByUid(jobUid);
        if(jobDetails.jobUid){
             await jobsData.updateJobStatus(jobUid,userSession.userId, status);
            serviceResponse.data={
                jobUid: jobUid
             }
    }else{
        serviceResponse.addBadRequestError('Job Uid does\t exist');
    }
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.updateJobStatus()`, error);
        serviceResponse.addServerError(`Failed to update job status due to technical difficulties`);
        throw error;
    }finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}