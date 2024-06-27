import logger from '@logger';
import { compile, processErrors } from './ajv_helper'
import * as validationSchema from './schemas/templates';

const TAG = 'validations.templates';

export async function saveMasterTemplate(req, res, next) {
    logger.info(`${TAG}.saveMasterTemplate() `);
    const validateSaveMasterTemlplatesValidator = compile(validationSchema.saveMasterTemplate);
    return await processErrors(req, validateSaveMasterTemlplatesValidator, next);
}

export async function saveTemplates(req, res, next){
    logger.info(`${TAG}.saveTemplates() `);
    const validateSaveTemplatesValidator = compile(validationSchema.saveTemplates);
    return await processErrors(req, validateSaveTemplatesValidator, next);
}

export async function getTemplates(req, res, next){
    logger.info(`${TAG}.getTemplates() `);
    const validateGetTemplatesValidator = compile(validationSchema.getTemplates);
    return await processErrors(req, validateGetTemplatesValidator, next);
}
export async function templateUid(req, res, next){
    logger.info(`${TAG}.templateUid() `);
    const validateTemplateUidValidator = compile(validationSchema.templateUid);
    return await processErrors(req, validateTemplateUidValidator, next);
}

export async function updateTemplate(req, res, next){
    logger.info(`${TAG}.updateTemplate() `);
    const validateUpdateTemplateValidator = compile(validationSchema.updateTemplates);
    return await processErrors(req, validateUpdateTemplateValidator, next);
}