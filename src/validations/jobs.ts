import logger from '@logger';
import { compile, processErrors } from './ajv_helper'
import * as validationSchema from './schemas/jobs';

const TAG = 'validations.jobs';

export async function saveJobs(req, res, next) {
    logger.info(`${TAG}.saveJobs() `);
    const validateSaveJobsValidator = compile(validationSchema.saveJobs);
    return await processErrors(req, validateSaveJobsValidator, next);
}
export async function getJobs(req, res, next){
    logger.info(`${TAG}.getJods() `);
    const validateGetJobsValidator = compile(validationSchema.getJobs);
    return await processErrors(req, validateGetJobsValidator, next);
}
export async function jobUid(req, res, next){
    logger.info(`${TAG}.saveJobs() `);
    const validateJobUidValidator = compile(validationSchema.jobUid);
    return await processErrors(req, validateJobUidValidator, next);
}
export async function updateJob(req, res, next){
    logger.info(`${TAG}.updateJob() `);
    const validateUpdateJobValidator = compile(validationSchema.updateJob);
    return await processErrors(req, validateUpdateJobValidator, next);
}