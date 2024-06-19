import logger from "@logger";
import JDTemplates  from '@mongodb/models/jd_template';
import mongoose from "mongoose";
import { toCamelCase } from "@utils/formatter";
import {  AppError, ITemplates } from "@models";
import { findOne, findOneAndUpdate, joinTables, findAllRecords } from '../query';
import { HttpStatusCodes } from "@constants/status_codes";

const TAG = 'datasources.mongodb.helpers.lib.jd_templates';
export async function addJDTemplates(payload: ITemplates, userId: number, programId: number) {
        logger.info(TAG + '.addJDTemplates()');
        try {
            const jdTemplates = new JDTemplates({
                uid: new mongoose.Types.ObjectId(),
                category_id: payload.categoryId,
                program_id: programId,
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
            const pipeLine = [{
                $lookup: {
                    from:JDTemplates.modelName,
                    localField: 'uid',
                    foreignField: 'uid',
                    as: 'templateInfo'
                }
            },
            {
                $match: {
                   category_id : categoryId,
                    'templateInfo.job_title': { $regex: `^${jobTitleName}$`, $options: 'i' },
                    'templateInfo.is_deleted': false,
                    ...(jdTemplateUid && { 'templateInfo.uid': { $ne: jdTemplateUid } })
                }
            },
            {
                $project: {
                    _id: 0,
                    category_id: 1,
                    job_title: { $arrayElemAt: ['$testInfo.job_title', 0] }
                }
            }]
            const result = toCamelCase(await joinTables(JDTemplates, pipeLine));
          
            if (result.length > 0) {
                throw new AppError('job title  already exist', HttpStatusCodes.BAD_REQUEST);
            }
          
    
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.checkJobTitleNameExists() `, error);
            throw error;
        }
    }
    export async function getTemplates(categoryId: number) {
        logger.info(TAG + '.getTemplates()');
        try {
            const result = await findAllRecords(JDTemplates,{'category_id': categoryId,'is_deleted':false},{ _id: 0});
            return result.map(template => toCamelCase(template.toObject()));
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.getTemplates() `, error);
            throw error;
        }
    }
    export async function getTemplateByUid(jdTemplateUid: string) {
  
        logger.info(TAG + '.getTemplateByUid ');
        try {
            const result = await findOne(JDTemplates, { 'uid': jdTemplateUid, 'is_deleted': false }, { _id: 0 });
            return toCamelCase(result?.toObject());
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.getTemplateByUid() `, error);
            throw error;
        }
    }
    
    export async function updateTemplatesByUid(templateDetails: any, templateUid: string, userId: number) {
       
        logger.info(`${TAG}.updateTemplatesByUid() `);
        try {
            // const existingTemplate = await findOne(JDTemplates, { 'uid': templateUid, 'is_deleted': false }, { _id: 0 });
            // const updatedTools = templateDetails.tools.map(tool => {
            //     const existingTool = existingTemplate.tools.find(t => t.id === tool.id);
            //     if (existingTool) {
            //         return { ...existingTool, ...tool };
            //     }
            //     return tool;
            // });
            const result = await findOneAndUpdate(JDTemplates,
                { 'uid': templateUid, 'is_deleted': false },
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
                
                return result
           
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.updateTemplatesByUid() `, error);
            throw error;
        }
    }
    export async function deleteTemplatesByUid(templateUid: string, userId: number) {
        logger.info(TAG + '.deleteTemplatesByUid() ');
        try {
            const result = await findOneAndUpdate(JDTemplates,
                { 'uid': templateUid, 'is_deleted': false },
                {
                    is_deleted: true,
                    updated_by: userId,
                    updated_at: new Date()
                });
            if (!result) {
                throw new AppError(`template Uid doesn't exist`, HttpStatusCodes.BAD_REQUEST);
            }
        } catch (error) {
            logger.error(`ERROR occurred in ${TAG}.deleteTemplatesByUid() `, error);
            throw error;
        }
    }
    