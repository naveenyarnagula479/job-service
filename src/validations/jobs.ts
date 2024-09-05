import logger from '@logger';
import { compile, processErrors } from './ajv_helper';
import * as jobs from './schemas/jobs';

const TAG = 'validations.jobs';

export async function validateJobs(req, res, next) {
    logger.info(`${TAG}.validateJobs() `);
    const jobsValidations = compile(jobs.saveJobs);
    return await processErrors(req, jobsValidations, next);
}
export async function jobUid(req, res, next) {
    logger.info(`${TAG}.jobUid() `);
    const jobUidValidations = compile(jobs.jobUid)
    return await processErrors(req, jobUidValidations, next);
}
export async function updateJobs(req, res, next){
    logger.info(`${TAG}.updateJobs() `);
    const updateJobsValidations = compile(jobs.updateJobs);
    return await processErrors(req, updateJobsValidations, next);
}
export async function updateStudentJobStatus(req, res, next) {
    logger.info(`${TAG}.updateStudentJobs() `);
    const updateStudentJobStatusValidations = compile(jobs.updateStudentJobStatus);
    return await processErrors(req, updateStudentJobStatusValidations, next);   
}
export async function getJobsByStudentUid(req, res, next){
    logger.info(`${TAG}.getJobsByStudentUid() `);
    const getJobsByStudentUidValidation = compile(jobs.getJobsByStudentUid);
    return await processErrors(req, getJobsByStudentUidValidation, next);
}
export async function updateJobStatus(req, res, next){
    logger.info(`${TAG}.updateJobStatus() `);
    const updateJobStatusValidation = compile(jobs.updateJobStatus);
    return await processErrors(req, updateJobStatusValidation, next); 
}
export async function saveStudentJobs(req, res, next){
    logger.info(`${TAG}.saveStudentJobs() `);
    const saveStudentJobsValidation = compile(jobs.saveStudentJobs);
    return await processErrors(req, saveStudentJobsValidation, next);
}
export async function candidates(req, res, next){
    logger.info(`${TAG}.candidates() `);
    const getCandidatesValidation = compile(jobs.candidates);
    return await processErrors(req, getCandidatesValidation, next);
}