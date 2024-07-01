import logger from '@logger';
import { ITemplates, templates, masterTemplates, IMasterTemplates } from '@models';

export function templateDataMapping(payload: any): ITemplates {
    logger.info('helpers.data_mapping.templates.templateDataMapping()');
    try {
        if (payload !== null && payload !== undefined) {
            return new templates(
                payload.categoryId,
                payload.jobTitle,
                payload.description,
                payload.tools,
                payload.skills,
                payload.employmentType,
                payload.jobType,
                payload.shifts,
                payload.interview,
                payload.requirements,
                payload.jobSummary,
                payload.preferredSkills,
                payload.aboutCompany,
                payload.education,
                payload.jobValidUpto,
                payload.location,
                payload.noOfOpenings,
                payload.salary,
                payload.salaryType || 'LPA',
                payload.experience
            )
        }
        return payload
    } catch (error) {
        logger.error('ERROR occured in helpers.data_mapping.template.templateDataMapping()')
        throw error;
    }
}

export function masterTemplateDataMapping(payload: any): IMasterTemplates {
    logger.info('helpers.data_mapping.templates.masterTemplateDataMapping()');
    try {
        if (payload !== null && payload !== undefined) {
            return new masterTemplates(
                payload.jobTitle || "",
                payload.description,
                payload.tools || [],
                payload.skills || [],
                payload.employmentType || [],
                payload.jobType || [],
                payload.shifts || [],
                payload.interview || [],
                payload.requirements,
                payload.jobSummary,
                payload.preferredSkills,
                payload.aboutCompany,
                payload.education,
                payload.jobValidUpto,
                payload.location,
                payload.noOfOpenings,
                payload.salary,
                payload.salaryType || 'LPA',
                payload.experience
            );
        }
        return payload;
    } catch (error) {
        logger.error('ERROR occurred in helpers.data_mapping.template.masterTemplateDataMapping()', error);
        throw error;
    }
}