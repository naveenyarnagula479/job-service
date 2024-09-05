import logger from '@logger';
import { compile, processErrors } from './ajv_helper';
import * as templates from './schemas/templates';

const TAG = 'validations.templates';

export async function validateTemplate(req, res, next) {
    logger.info(`${TAG}.validateTemplates() `);
    const templateValidation = compile(templates.saveTemplates);
    return await processErrors(req, templateValidation, next);
}
export async function getTemplate(req, res, next){
   logger.info(`${TAG}.getTemplate() `);
   const getTemplateValidation = compile(templates.getTemplates);
   return await processErrors(req, getTemplateValidation, next);
}
export async function templateUid(req, res, next){
    logger.info(`${TAG}.templateUid() `);
    const templateUidValidation = compile(templates.templateUid);
    return await processErrors(req, templateUidValidation, next);
}
export async function updateTemplates(req, res, next){
    logger.info(`${TAG}.updateTemplate() `);
    const updateTemplateValidation = compile(templates.updateTemplates);
    return await processErrors(req, updateTemplateValidation, next);
}