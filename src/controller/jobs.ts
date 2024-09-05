import { jobsDataMapping } from '@helpers/data_mapping/jobs';
import { responseBuilder } from '@helpers/response_builder';
import logger from '@logger';
import { IServiceResponse, IUserSession, IJobs } from '@models';
import { NextFunction, Response } from 'express';
import * as jobService from '@service/jobs';
import { requestCandidateListQueryMapping, requestJobsListQueryMapping } from '@helpers/data_mapping/request_query';


const TAG = 'controller.jobs';

export async function saveJobDeatils(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `.saveJobDeatils()`);
        logger.debug(`saveJobDeatils object = ${JSON.stringify(req.body)}`);
        const jobs: IJobs = jobsDataMapping(req.body);
        const userSession: IUserSession = req.userSession;
        const jobResponse: IServiceResponse = await jobService.saveJobDetails(userSession, jobs);
        responseBuilder(jobResponse, res, next, req);
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}. saveJobDeatils() `, error);
        next(error);
    }
}
export async function getJobDetails(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `getJobDetails()`);
        const userSession: IUserSession = req.userSession;
        const queryParams = requestJobsListQueryMapping(req.query);
        const templateResponse: IServiceResponse = await jobService.getJobDetails(queryParams, userSession)
        responseBuilder(templateResponse, res, next, req);
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getJobDetails() `, error);
        next(error);
    }
}
export async function updateJobsByUid(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `.updateJobssByUid()`);
        logger.debug(`update jobs object = ${JSON.stringify(req.body)}`);
        const jobs: IJobs = jobsDataMapping(req.body);
        const { jobUid } = req.params;
        const userSession: IUserSession = req.userSession;
        const jobResponse: IServiceResponse = await jobService.updateJobsByUid(userSession, jobs, jobUid);
        responseBuilder(jobResponse, res, next, req);
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.updateJobsByUid() `, error);
        next(error);
    }
}

export async function getJobsByUid(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `.getJobssByUid()`);
        const { jobUid } = req.params;
        const userSession: IUserSession = req.userSession;
        const jobResponse: IServiceResponse = await jobService.getJobsByUid(userSession, jobUid);
        responseBuilder(jobResponse, res, next, req);
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getJobsByUid() `, error);
        next(error);
    }
}
export async function deleteJobsByUid(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `.deleteJobsByUid()`);
        const { jobUid } = req.params;
        const userSession: IUserSession = req.userSession;
        const jobResponse: IServiceResponse = await jobService.deleteJobsByUid(userSession, jobUid);
        responseBuilder(jobResponse, res, next, req);
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.deleteJobsByUid() `, error);
        next(error);
    }
}

export async function submitRecruiterRequest(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + '.submitRecruiterRequest() ');
        const { jobUid } = req.params;
        const userSession: IUserSession = req.userSession;
        const response: IServiceResponse = await jobService.submitRecruiterRequest(jobUid, userSession);
        responseBuilder(response, res, next, req);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.submitRecruiterRequest() `, error);
        next(error);
    }
}
export async function updateJobStatus(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `.updateJobStatus()`);
        const { jobUid } = req.params;
        const userSession: IUserSession = req.userSession;
        const payload = req.body;
        const jobResponse: IServiceResponse = await jobService.updateJobStatus(userSession, jobUid, payload);
        responseBuilder(jobResponse, res, next, req);
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.updateJobStatus() `, error);
        next(error);
    }
}

export async function applyStudentJob(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `.applyStudentJob() `);
        const { jobUid } = req.params;
        const userSession: IUserSession = req.userSession;
        const token = req.headers.authorization.split(' ')[1];
        const jobResponse: IServiceResponse = await jobService.applyStudentJob(jobUid, userSession, token);
        responseBuilder(jobResponse, res, next, req);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.applyStudentJob() `, error);
        next(error);
    }
}

export async function toggleSaveJobStatus(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `.toggleSAveJobStatus() `);
        const { jobUid } = req.params;
        const userSession: IUserSession = req.userSession;
        const isSaved = req.body.isSaved;
        const jobResponse: IServiceResponse = await jobService.toggleSaveJobStatus(jobUid, userSession, isSaved);
        responseBuilder(jobResponse, res, next, req);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.toggleSaveJobStatus`, error);
        next(error);
    }
}

export async function fetchAppliedCandidates(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `.fetchAppliedCandidates() `);
        const userSession: IUserSession = req.userSession;
        const queryParams = requestCandidateListQueryMapping(req.query);
        const token = req.headers.authorization.split(' ')[1];
        const response: IServiceResponse = await jobService.fetchAppliedCandidates(userSession, queryParams, token);
        responseBuilder(response, res, next, req);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.fetchAppliedCandidates() `, error);
        next(error);
    }
}

export async function getJobsByStudentUid(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + '.getJobsByStudentUid() ');
        const userSession: IUserSession = req.userSession;
        const { jobUid, studentUid } = req.params;
        const token = req.headers.authorization.split(' ')[1];
        const response: IServiceResponse = await jobService.getJobsByStudentUid(userSession, studentUid, jobUid, token);
        responseBuilder(response, res, next, req);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getJobsByStudentUid() `, error);
        next(error);
    }
}

export async function updateStudentJobStatus(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + '.updateStudentJobStatus() ');
        const userSession: IUserSession = req.userSession;
        const { jobUid, studentUid } = req.params;
        const response: IServiceResponse = await jobService.updateStudentJobStatus(userSession, jobUid, studentUid, req.body.status);
        responseBuilder(response, res, next, req);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateStudentJobStatus() `, error);
        next(error);
    }
}