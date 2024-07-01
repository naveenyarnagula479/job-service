import logger from "@logger";
import { ITemplates } from "@models";
import JDTemplates from '@mongodb/models/jd_template';
import { toCamelCase } from "@utils/formatter";
import mongoose from "mongoose";
import { countDocuments, findAllRecords, findOne, findOneAndUpdate } from '../query';


const TAG = 'datasources.mongodb.helpers.lib.jd_templates';

export async function addJDTemplates(payload: ITemplates, userId: number, programId: number, categoryName: string) {
    logger.info(TAG + '.addJDTemplates()');
    try {
        const jdTemplates = new JDTemplates({
            template_uid: new mongoose.Types.ObjectId(),
            category_id: payload.categoryId,
            category_name: categoryName,
            program_id: programId,
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
            job_valid_upto: payload.jobValidUpto,
            location: payload.location,
            no_of_openings: payload.noOfOpenings,
            salary: payload.salary,
            salary_type: payload.salaryType,
            experience: payload.experience,
            created_by: userId,

        });
        const result = await jdTemplates.save();
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.addJDTemplates() `, error);
        throw error;
    }
}
export async function checkJobTitleNameExists(jobTitleName: string, categoryId: number, jdTemplateUid?: string) {
    logger.info(TAG + '.checkJobTitleNameExists()');
    try {
        const result = await findOne(JDTemplates,
            {
                'category_id': categoryId,
                'job_title': jobTitleName,
                'is_deleted': false,
                ...(jdTemplateUid && { 'template_uid': { $ne: jdTemplateUid } })

            }, { _id: 0 })
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.checkJobTitleNameExists() `, error);
        throw error;
    }
}
export async function getTemplatesWithPagination(queryParams: any) {
    logger.info(TAG + '.getTemplatesWithPagination()');
    try {
        const result = await findAllRecords(JDTemplates, { 'category_id': queryParams.categoryId, 'is_deleted': false },
            {
                _id: 0,
                template_uid: 1,
                job_title: 1,
                category_name: 1,
                description: 1
            }, { skip: (queryParams.pageNum - 1) * queryParams.pageSize, limit: queryParams.pageSize });
        const list = result.map(template => toCamelCase(template.toObject()));
        const totalResultsCount = await countDocuments(JDTemplates, { 'category_id': queryParams.categoryId, 'is_deleted': false });
        return { list, totalResultsCount };
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getTemplatesWithPagination() `, error);
        throw error;
    }
}
export async function getTemplateByUid(jdTemplateUid: string) {
    logger.info(TAG + '.getTemplateByUid ');
    try {
        const result = await findOne(JDTemplates, { 'template_uid': jdTemplateUid, 'is_deleted': false }, { _id: 0 });
        return toCamelCase(result?.toObject());
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getTemplateByUid() `, error);
        throw error;
    }
}
export async function updateTemplatesByUid(templateDetails: any, templateUid: string, userId: number) {
    logger.info(`${TAG}.updateTemplatesByUid() `);
    try {
        const result = await findOneAndUpdate(JDTemplates,
            { 'template_uid': templateUid, 'is_deleted': false },
            {
                job_title: templateDetails.jobTitle,
                description: templateDetails.description,
                tools: templateDetails.tools,
                skills: templateDetails.skills,
                employment_type: templateDetails.employmentType,
                job_type: templateDetails.jobType,
                shifts: templateDetails.shifts,
                interview: templateDetails.interview,
                job_summary: templateDetails.jobSummary,
                preferred_skills: templateDetails.preferredSkills,
                about_company: templateDetails.aboutCompany,
                education: templateDetails.education,
                job_start_date: templateDetails.jobStartDate,
                job_end_date: templateDetails.jobEndDate,
                location: templateDetails.location,
                no_of_openings: templateDetails.noOfOpenings,
                salary: templateDetails.salary,
                experience: templateDetails.experience,
                updated_at: new Date(),
                updated_by: userId
            });

        return result?.template_uid;

    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateTemplatesByUid() `, error);
        throw error;
    }
}
export async function deleteTemplatesByUid(templateUid: string, userId: number) {
    logger.info(TAG + '.deleteTemplatesByUid() ');
    try {
        await findOneAndUpdate(JDTemplates,
            { 'template_uid': templateUid, 'is_deleted': false },
            {
                is_deleted: true,
                updated_by: userId,
                updated_at: new Date()
            });
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.deleteTemplatesByUid() `, error);
        throw error;
    }
}
