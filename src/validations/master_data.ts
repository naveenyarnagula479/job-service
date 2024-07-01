import logger from '@logger';
import { compile, processErrors } from './ajv_helper';
import * as masterData from './schemas/masterdata';

const TAG = 'validations.master_data';


export async function validateMasterData(req, res, next) {
    logger.info(`${TAG}.validateMasterData()`);
    const masterDataValidation = compile(masterData.masterDataTypes);
    return await processErrors(req, masterDataValidation, next)
}

export async function updateJobType(req, res, next) {
    logger.info(`${TAG}.updateJobType()`);
    console.log(masterData.updateJobType)
    const jobTypeUpdates = compile(masterData.updateJobType);
    return await processErrors(req, jobTypeUpdates, next)
}

export async function getJobTypeByUid(req, res, next){
    logger.info(`${TAG}.getJobTypeByUid()`);
    const fetchJobType = compile(masterData.jobTypeUid);
    return await processErrors(req, fetchJobType, next)
}


export async function updateEmploymentType(req, res, next) {
    logger.info(`${TAG}.updateEmploymentType()`);
    const employmentTypevalidation = compile(masterData.updateEmploymentType);
    return await processErrors(req, employmentTypevalidation, next)
}

export async function getEmploymentTypeByUid(req, res, next){
    logger.info(`${TAG}.getEmploymentTypeByUid()`);
    const employmentTypevalidation = compile(masterData.employmentTypeUid);
    return await processErrors(req, employmentTypevalidation, next)
}
export async function updateJobShifts(req, res, next) {
    logger.info(`${TAG}.updateJobShifts()`);
    const updateJobShiftsValidation = compile(masterData.updateJobShifts);
    return await processErrors(req, updateJobShiftsValidation, next)
}

export async function getJobShiftsByUid(req, res, next){
    logger.info(`${TAG}.getJobShiftsByUid()`);
    const fetchGetJobShiftsValidation = compile(masterData.jobShiftUid);
    return await processErrors(req, fetchGetJobShiftsValidation, next)
}

export async function saveCourseCategory(req, res, next){
    logger.info(`${TAG}.saveCourseCategory()`);
    const saveCourseCategoryValidation = compile(masterData.courseCategory);
    return await processErrors(req, saveCourseCategoryValidation, next)
}

export async function updateCourseCategory(req, res, next){
    logger.info(`${TAG}.updateCourseCategory()`);
    const updateCourseCategoryValidations = compile(masterData.updateCourseCategory);
    return await processErrors(req, updateCourseCategoryValidations, next)
}

export async function getCourseCategoriesByUid(req, res, next){
    logger.info(`${TAG}.getCourseCategoriesByUid()`);
    const fetchCourseCategories = compile(masterData.courseCategoryId);
    return await processErrors(req, fetchCourseCategories, next)
}

export async function  validateMasterDataWithCategoryId(req, res, next){
    logger.info(`${TAG}.validateMasterDataWithCategoryId()`);
    const saveMasterDataValidation = compile(masterData.nameWithCategorySchema);
    return await processErrors(req, saveMasterDataValidation, next)
}

export async function getMasterData(req,res, next){
    logger.info(`${TAG}.getMasterData()`);
    const fetchMasterDataValidation = compile(masterData.getMasterData);
    return await processErrors(req, fetchMasterDataValidation, next);
}

export async function updateSkill(req, res, next){
    logger.info(`${TAG}.updateSkill()`);
    const updateSkillValidation = compile(masterData.updateSkill);
    return await processErrors(req, updateSkillValidation, next)
}

export async function fetchSkillByUid(req, res, next){
    logger.info(`${TAG}.fetchSkillByUid()`);
    const fetchSkillValidation = compile(masterData.skillsUid);
    return await processErrors(req, fetchSkillValidation, next)
}

export async function updateTool(req, res, next){
    logger.info(`${TAG}.updateTool()`);
    const updateSkillValidation = compile(masterData.updateTools);
    return await processErrors(req, updateSkillValidation, next)
}

export async function fetchToolByUid(req, res, next){
    logger.info(`${TAG}.fetchToolByUid()`);
    const fetchSkillValidation = compile(masterData.toolsUid);
    return await processErrors(req, fetchSkillValidation, next)
}


export async function updateInterviewRound(req, res, next){
    logger.info(`${TAG}.updateInterviewRound()`);
    const updateInterviewRoundValidation = compile(masterData.updateInterviewRound);
    return await processErrors(req, updateInterviewRoundValidation, next)
}

export async function fetchInterviewRoundByUid(req, res, next){
    logger.info(`${TAG}.fetchInterviewRoundByUid()`);
    const fetchInterviewRoundValidation = compile(masterData.interviewRoundsUid);
    return await processErrors(req, fetchInterviewRoundValidation, next)
}


