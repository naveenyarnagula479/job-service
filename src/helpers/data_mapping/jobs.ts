import logger from '@logger';
import { IJobs, jobs } from '@models';

export function jobsDataMapping(payload: any): IJobs {
    logger.info('helpers.data_mapping.jobs.jobsDataMapping()');
    try {
        if (payload != null && payload !== undefined) {
            return new jobs(
                payload.templateUid,
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
                payload.salaryType || "LPA",
                payload.experience
            )
        }
        return payload
    } catch (error) {
        logger.error('ERROR occured in helpers.data_mapping.jobs.jobsDataMapping()')
        throw error;
    }
}