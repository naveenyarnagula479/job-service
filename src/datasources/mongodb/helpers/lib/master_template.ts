
import logger from "@logger";
import MasterTemplates from '@mongodb/models/master_template';
import mongoose from "mongoose";
import { toCamelCase } from "@utils/formatter";
import { IMasterTemplates } from "@models";
import { findOne, findOneAndUpdate } from "../query";


const TAG = 'datasources.mongodb.helpers.lib.master_templates';

export async function addMasterTemplates(payload: IMasterTemplates, userId: number) {
    logger.info(TAG + '.addMasterTemplates()');
    try {
        const obj = {
            master_template_uid: new mongoose.Types.ObjectId(),
            job_title: payload.jobTitle,
            description: payload.description,
            tools: payload.tools,
            skills: payload.skills,
            employment_type: payload.employmentType,
            job_type: payload.jobType,
            shifts: payload.shifts,
            interview: payload.interview,
            requirements: payload.requirements,
            job_summary: payload.jobSummary,
            preferred_skills: payload.preferredSkills,
            about_company: payload.aboutCompany,
            education: payload.education,
            location: payload.location,
            no_of_openings: payload.noOfOpenings,
            salary: payload.salary,
            salary_type: payload.salaryType,
            job_valid_upto: payload.jobValidUpto,
            experience: payload.experience,
            created_by: userId,
        }
        const masterTemplates = new MasterTemplates(obj);
        const result = await masterTemplates.save();
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.addMasterTemplates() `, error);
        throw error;
    }
}
export async function fetchMasterTemplates() {
    logger.info(TAG + '.fetchMasterTemplates()');
    try {
        const result = await findOne(MasterTemplates, {}, { _id: 0 });
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.fetchMasterTemplates() `, error);
        throw error;
    }
}


export async function updateMasterTemplate(templateUid: string, template: IMasterTemplates, userId: number): Promise<any> {
    logger.info(TAG + '.updateMasterTemplates() ');
    try {
        await findOneAndUpdate(MasterTemplates, { master_template_uid: templateUid },
            {
                job_title: template.jobTitle,
                description: template.description,
                requirements: template.requirements,
                job_summary: template.jobSummary,
                preferred_skills: template.preferredSkills,
                about_company: template.aboutCompany,
                education: template.education,
                job_valid_upto: template.jobValidUpto,
                location: template.location,
                no_of_openings: template.noOfOpenings,
                salary: template.salary,
                salary_type: template.salaryType,
                experience: template.experience,
                updated_by: userId,
                updated_at: new Date()
            }
        );
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateMasterTemplate() `, error);
        throw error;
    }
}
