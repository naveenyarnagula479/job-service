import logger from '@logger';
import { compile, processErrors } from './ajv_helper';
import * as templates from './schemas/templates';

const TAG = 'validations.templates';

export async function validateTemplate(req, res, next) {
    logger.info(`${TAG}.validateTemplates() `);;
    const templateValidation = compile(templates.saveTemplates);
    return await processErrors(req, templateValidation, next);
}