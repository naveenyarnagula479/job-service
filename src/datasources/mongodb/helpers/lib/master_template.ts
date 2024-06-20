
import logger from "@logger";
import MasterTemplates  from '@mongodb/models/master_template';
import mongoose from "mongoose";
import { toCamelCase } from "@utils/formatter";
import { IMasterTemplates } from "@models";


const TAG = 'datasources.mongodb.helpers.lib.master_templates';

export async function addMasterTemplates(payload: IMasterTemplates, userId: number) {
    logger.info(TAG + '.addMasterTemplates()');
    try {
        const masterTemplates = new MasterTemplates({
            master_template_uid: new mongoose.Types.ObjectId(),
            job_title: payload.jobTitle,
            description: payload.description,
            tools: payload.tools,
            skills: payload.skills,
            employment_type: payload.employmentType,
            job_type: payload.jobType,
            shifts: payload.shifts,
            interview: payload.interview,
            job_summary: payload.jobSummary,
            preferred_skills: payload.preferredSkills,
            about_company: payload.aboutCompany,
            education: payload.education,
            job_start_date: payload.jobStartDate,
            job_end_date: payload.jobEndDate,
            location: payload.location,
            no_of_openings: payload.noOfOpenings,
            salary: payload.salary,
            experience: payload.experience,
            created_by: userId,
        });
        const result = await masterTemplates.save();
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.addMasterTemplates() `, error);
        throw error;
    }
}
export async function fetchMasterTemplates(){
    logger.info(TAG+ '.fetchMasterTemplates()');
    try{
        const result = await MasterTemplates.find();
        return result.map(template => toCamelCase(template.toObject()));
    }catch(error){
        logger.error(`ERROR occurred in ${TAG}.fetchMasterTemplates() `,error);
        throw error;
    }
}

