import logger from '@logger';
import { compile, processErrors } from './ajv_helper';
import * as jobs from './schemas/jobs';

const TAG = 'validations.jobs';

export async function validateJobs(req, res, next) {
    logger.info(`${TAG}.validateJobs() `);
    const jobsValidations = compile(jobs.saveJobs);
    return await processErrors(req, jobsValidations, next);
}