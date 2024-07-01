import { jobsDataMapping } from '@helpers/data_mapping/jobs';
import { responseBuilder } from '@helpers/response_builder';
import logger from '@logger';
import { IServiceResponse, IUserSession, IJobs } from '@models';
import { NextFunction, Response } from 'express';
import * as jobService from '@service/jobs';
import { requestJobsListQueryMapping } from '@helpers/data_mapping/request_query';


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
        logger.error(`ERROR occured in ${TAG}. saveJobDeatils()`);
        next(error);
    }
}
export async function getJobDetails(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `getJobDetails()`);
        const userSession: IUserSession = req.userSession;
        const queryParams = requestJobsListQueryMapping(req.query);
        console.log(queryParams);
        const templateResponse: IServiceResponse = await jobService.getJobDetails(queryParams, userSession)
        responseBuilder(templateResponse, res, next, req);
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getJobDetails() `);
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
        logger.error(`ERROR occured in ${TAG}.updateJobsByUid() `);
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
        logger.error(`ERROR occured in ${TAG}.getJobsByUid() `);
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
        logger.error(`ERROR occured in ${TAG}.deleteJobsByUid() `);
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
        logger.error(`ERROR occurred in ${TAG}.submitRecruiterRequest() `);
        next(error);
    }
}
export async function updateJobStatus(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
        logger.info(TAG + `.updateJobStatus()`);
        const { jobUid } = req.params;
        const userSession: IUserSession = req.userSession;
        const status = req.body.status;
        const jobResponse: IServiceResponse = await jobService.updateJobStatus(userSession, jobUid, status);
        responseBuilder(jobResponse, res, next, req);
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.updateJobStatus() `);
        next(error);
    }
}