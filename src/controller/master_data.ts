import {  masterDataMapping} from "@helpers/data_mapping/master_data";
import { responseBuilder } from "@helpers/response_builder";
import logger from "@logger";
import {IMasterData , IServiceResponse, IUserSession} from "@models";
import * as MasterData from '@service/master_data';
import { NextFunction, Response } from "express";

const TAG = 'controller.master_data.ts';


export async function saveJobType(req: any, res : Response, next : NextFunction): Promise<void>{
    logger.info(TAG + '.saveJobType() ', req.body);
    try {
        const userSession : IUserSession = req.userSession
        const jobTypeDetails: IMasterData = masterDataMapping(req.body);
        const response: IServiceResponse = await MasterData.saveJobType(jobTypeDetails, userSession);
        responseBuilder(response, res, next, req);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveJobType() `, error);
        next(error);
    }
}

export async function updateJobType(req: any, res : Response, next : NextFunction){
    logger.info(TAG + '.updateJobType()', req.body);
    try{
        const userSession : IUserSession = req.userSession;
        const jobTypeDetails : IMasterData = masterDataMapping(req.body);
        const jobTypeUid  = req.params.jobTypeUid
        const response : IServiceResponse = await MasterData.updateJobType(jobTypeDetails, jobTypeUid,userSession)
        responseBuilder(response, res, next, req);

    }catch(error){
        logger.error(`Error occured in ${TAG}.updateJobType()`, error);
        next(error);
    }
}

export async function deleteJobType(req: any, res : Response, next : NextFunction) {
    logger.info(TAG +  '.deleteJobType()');
    try{
        const userSession : IUserSession = req.userSession;
        const jobTypeUid = req.params.jobTypeUid
        const response : IServiceResponse = await MasterData.deleteJobType(jobTypeUid, userSession);
        responseBuilder(response, res, next, req);
    }catch(error){
        logger.error(`Error occure in ${TAG}.deleteJobType`, error);
        next(error);
    }
}

export async function getJobTypes(req: any , res : Response , next : NextFunction){
    logger.info(TAG +  '.getJobTypes()');
    try{
        const userSession : IUserSession = req.userSession;
        const response : IServiceResponse = await MasterData.getJobTypes( userSession);
        responseBuilder(response, res, next, req);
    }catch(error){
        logger.error(`Error occure in ${TAG}.getJobTypes`, error);
        next(error);
    } 
}

export async function getJobTypeByUid(req : any, res : Response , next : NextFunction){
    logger.info(TAG + '.getJobTypeByUid');
    try{
        const jobTypeUid = req.params.jobTypeUid
        const response : IServiceResponse = await MasterData.getJobTypeByUid(jobTypeUid);
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getJobTypeByUid`, error)
        next (error)
    }
}

//employment type

export async function saveEmploymentType(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.saveEmploymentType');
    try{
        const userSession : IUserSession = req.userSession;
        const employmentDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.saveEmploymentType(employmentDetails, userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.saveEmploymentType`, error);
        next(error)
    }
}

export async function getEmploymentTypes(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getEmploymentTypes');
    try{
        const userSession : IUserSession = req.userSession;
        const response : IServiceResponse = await MasterData.getEmploymentTypes(userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getEmploymentTypes`, error);
        next(error)
    }
}

export async function getEmploymentTypeByUid(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getEmploymentTypeByUid');
    try{
        const userSession : IUserSession = req.userSession;
        const employmentTypeUid = req.params.employmentTypeUid
        const response : IServiceResponse = await MasterData.getEmploymentTypeByUid(employmentTypeUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getEmploymentTypeByUid`, error);
        next(error)
    }
}

export async function updateEmploymentType(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.updateEmploymentType');
    try{
        const userSession : IUserSession = req.userSession;
        const employmentTypeUid = req.params.employmentTypeUid
        const employmentDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.updateEmploymentType(employmentDetails, employmentTypeUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.updateEmploymentType`, error);
        next(error)
    }
}

export async function deleteEmploymentType(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.deleteEmploymentType');
    try{
        const userSession : IUserSession = req.userSession;
        const employmentTypeUid = req.params.employmentTypeUid
        const response : IServiceResponse = await MasterData.deleteEmploymentType( employmentTypeUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.deleteEmploymentType`, error);
        next(error)
    }
}


export async function saveJobShifts(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.saveJobShifts');
    try{
        const userSession : IUserSession = req.userSession;
        const jobShiftDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.saveJobShifts(jobShiftDetails, userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.saveJobShifts`, error);
        next(error)
    }
}

export async function updateJobShifts(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.updateJobShifts');
    try{
        const userSession : IUserSession = req.userSession;
        const jobShiftUid = req.params.jobShiftUid
        const jobShiftDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.updateJobShifts(jobShiftDetails, jobShiftUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.updateJobShifts`, error);
        next(error)
    }
}

export async function deleteJobShifts(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.deleteJobShifts');
    try{
        const userSession : IUserSession = req.userSession;
        const jobShiftUid = req.params.jobShiftUid
        const response : IServiceResponse = await MasterData.deleteJobShifts( jobShiftUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.deleteJobShifts`, error);
        next(error)
    }
}

export async function getJobShifts(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getJobShifts');
    try{
        const userSession : IUserSession = req.userSession;
        const response : IServiceResponse = await MasterData.getJobShifts(userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getJobShifts`, error);
        next(error)
    }
}

export async function getJobShiftsByUid(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getJobShiftsByUid');
    try{
        const userSession : IUserSession = req.userSession;
        const jobShiftUid = req.params.jobShiftUid
        const response : IServiceResponse = await MasterData.getJobShiftsByUid(jobShiftUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getJobShiftsByUid`, error);
        next(error)
    }
}



export async function saveSkill(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.saveSkill');
    try{
        const userSession : IUserSession = req.userSession;
        const skillDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.saveSkill(skillDetails, userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.saveSkill`, error);
        next(error)
    }
}

export async function updateSkill(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.updateSkill');
    try{
        const userSession : IUserSession = req.userSession;
        const skillUid = req.params.skillUid
        const skillDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.updateSkill(skillDetails, skillUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.updateSkill`, error);
        next(error)
    }
}

export async function deleteSkill(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.deleteSkill');
    try{
        const userSession : IUserSession = req.userSession;
        const skillUid = req.params.skillUid
        const response : IServiceResponse = await MasterData.deleteSkill( skillUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.deleteSkill`, error);
        next(error)
    }
}

export async function getSkills(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getSkills');
    try{
        const userSession : IUserSession = req.userSession;
        const queryParams = req.query.categoryId
        const response : IServiceResponse = await MasterData.getSkills(queryParams,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getSkills`, error);
        next(error)
    }
}

export async function getSkillByUid(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getSkillByUid');
    try{
        const userSession : IUserSession = req.userSession;
        const skillUid = req.params.skillUid
        const response : IServiceResponse = await MasterData.getSkillByUid(skillUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getSkillByUid`, error);
        next(error)
    }
}





export async function saveTool(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.saveTool()');
    try{
        const userSession : IUserSession = req.userSession;
        const toolDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.saveTool(toolDetails, userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.saveTool()`, error);
        next(error)
    }
}

export async function updateTool(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.updateTool()');
    try{
        const userSession : IUserSession = req.userSession;
        const toolUid = req.params.toolUid
        const toolDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.updateTool(toolDetails, toolUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.updateTool()`, error);
        next(error)
    }
}

export async function deleteTool(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.deleteTool()');
    try{
        const userSession : IUserSession = req.userSession;
        const toolUid = req.params.toolUid
        const response : IServiceResponse = await MasterData.deleteTool( toolUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.deleteTool()`, error);
        next(error)
    }
}


export async function getTools(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getTools');
    try{
        const userSession : IUserSession = req.userSession;
        const queryParams = req.query.categoryId
        const response : IServiceResponse = await MasterData.getTools(queryParams,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getTools`, error);
        next(error)
    }
}

export async function getToolsByUid(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getToolsByUid');
    try{
        const userSession : IUserSession = req.userSession;
        const toolUid = req.params.toolUid
        const response : IServiceResponse = await MasterData.getToolsByUid(toolUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getToolsByUid`, error);
        next(error)
    }
}




export async function saveInterviewRound(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.saveInterviewRound()');
    try{
        const userSession : IUserSession = req.userSession;
        const interviewRoundDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.saveInterviewRound(interviewRoundDetails, userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.saveInterviewRound()`, error);
        next(error)
    }
}

export async function updateInterviewRound(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.updateInterviewRound()');
    try{
        const userSession : IUserSession = req.userSession;
        const interviewRoundUid = req.params.interViewRoundUid
        const interviewRoundDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.updateInterviewRound(interviewRoundDetails, interviewRoundUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.updateInterviewRound()`, error);
        next(error)
    }
}

export async function deleteInterviewRound(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.deleteInterviewRound()');
    try{
        const userSession : IUserSession = req.userSession;
        const interViewRoundUid = req.params.interViewRoundUid
        const response : IServiceResponse = await MasterData.deleteInterviewRound( interViewRoundUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.deleteInterviewRound()`, error);
        next(error)
    }
}

export async function getInterviewRounds(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getInterviewRounds()');
    try{
        const userSession : IUserSession = req.userSession;
        const queryParams = req.query.categoryId
        const response : IServiceResponse = await MasterData.getInterviewRounds(queryParams,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getInterviewRounds`, error);
        next(error)
    }
}

export async function getInterviewRoundsByUid(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getInterviewRoundsByUid');
    try{
        const userSession : IUserSession = req.userSession;
        const interviewRoundUid = req.params.interViewRoundUid
        const response : IServiceResponse = await MasterData.getInterviewRoundsByUid(interviewRoundUid,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getInterviewRoundsByUid`, error);
        next(error)
    }
}


export async function saveCourseCategory(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.saveCourseCategory()');
    try{
        const userSession : IUserSession = req.userSession;
        const courseCategoryDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.saveCourseCategory(courseCategoryDetails, userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.saveCourseCategory()`, error);
        next(error)
    }
}


export async function updateCourseCategory(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.updateCourseCategory()');
    try{
        const userSession : IUserSession = req.userSession;
        const categoryId = req.params.categoryId
        const courseCategoryDetails : IMasterData = await masterDataMapping(req.body)
        const response : IServiceResponse = await MasterData.updateCourseCategory(courseCategoryDetails, parseInt(categoryId),userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.updateCourseCategory()`, error);
        next(error)
    }
}

export async function deleteCourseCategory(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.deleteCourseCategory()');
    try{
        const userSession : IUserSession = req.userSession;
        const categoryId = req.params.categoryId
        const response : IServiceResponse = await MasterData.deleteCourseCategory(parseInt(categoryId),userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.deleteCourseCategory()`, error);
        next(error)
    }
}

export async function getCourseCategories(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getCourseCategories()');
    try{
        const userSession : IUserSession = req.userSession;
        const response : IServiceResponse = await MasterData.getCourseCategories(userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getCourseCategories()`, error);
        next(error)
    }
}

export async function getCourseCategoriesByUid(req : any, res : Response, next : NextFunction){
    logger.info(TAG + '.getCourseCategoriesByUid()');
    try{
        const userSession : IUserSession = req.userSession;
        const categoryId = req.params.categoryId
        const response : IServiceResponse = await MasterData.getCourseCategoriesByUid(categoryId,userSession)
        responseBuilder(response, res, next, req)
    }catch(error){
        logger.error(`Error occured in ${TAG}.getCourseCategoriesByUid()`, error);
        next(error)
    }
}