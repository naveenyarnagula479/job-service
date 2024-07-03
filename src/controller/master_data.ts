import { masterDataMapping } from "@helpers/data_mapping/master_data";
import { requestMasterDataQueryMapping, requestQueryDataMapping } from "@helpers/data_mapping/request_query";
import { responseBuilder } from "@helpers/response_builder";
import logger from "@logger";
import { IBaseListAPIRequest, IMasterData, IMasterDataListAPIRequest, IServiceResponse, IUserSession } from "@models";
import * as MasterData from '@service/master_data';
import { NextFunction, Response } from "express";

const TAG = 'controller.master_data.ts';


export async function saveJobType(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.saveJobType() ', req.body);
    try {
        logger.debug(`save job type object ${JSON.stringify(req.body)}`)
        const userSession: IUserSession = req.userSession
        const jobTypeDetails: IMasterData = masterDataMapping(req.body);
        const response: IServiceResponse = await MasterData.saveJobType(jobTypeDetails, userSession);
        responseBuilder(response, res, next, req);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveJobType() `, error);
        next(error);
    }
}

export async function updateJobType(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.updateJobType()', req.body);
    try {
        logger.debug(`update job type object : ${JSON.stringify(req.body)}`)
        const userSession: IUserSession = req.userSession;
        const jobTypeDetails: IMasterData = masterDataMapping(req.body);
        const jobTypeUid = req.params.jobTypeUid
        const response: IServiceResponse = await MasterData.updateJobType(jobTypeDetails, jobTypeUid, userSession)
        responseBuilder(response, res, next, req);

    } catch (error) {
        logger.error(`Error occured in ${TAG}.updateJobType()`, error);
        next(error);
    }
}

export async function deleteJobType(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.deleteJobType()');
    try {
        const userSession: IUserSession = req.userSession;
        const jobTypeUid = req.params.jobTypeUid
        const response: IServiceResponse = await MasterData.deleteJobType(jobTypeUid, userSession);
        responseBuilder(response, res, next, req);
    } catch (error) {
        logger.error(`Error occure in ${TAG}.deleteJobType`, error);
        next(error);
    }
}

export async function getJobTypes(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getJobTypes()');
    try {
        const userSession: IUserSession = req.userSession;
        const queryParams: IBaseListAPIRequest = requestMasterDataQueryMapping(req.query);
        const response: IServiceResponse = await MasterData.getJobTypes(userSession, queryParams);
        responseBuilder(response, res, next, req);
    } catch (error) {
        logger.error(`Error occure in ${TAG}.getJobTypes`, error);
        next(error);
    }
}

export async function getJobTypeByUid(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getJobTypeByUid');
    try {
        const jobTypeUid = req.params.jobTypeUid
        const response: IServiceResponse = await MasterData.getJobTypeByUid(jobTypeUid);
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getJobTypeByUid`, error)
        next(error)
    }
}

//employment type

export async function saveEmploymentType(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.saveEmploymentType');
    try {
        logger.debug(`employment type object ${JSON.stringify(req.body)}`)
        const userSession: IUserSession = req.userSession;
        const employmentDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.saveEmploymentType(employmentDetails, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.saveEmploymentType`, error);
        next(error)
    }
}

export async function getEmploymentTypes(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getEmploymentTypes');
    try {
        const userSession: IUserSession = req.userSession;
        const queryParams: IBaseListAPIRequest = requestMasterDataQueryMapping(req.query);
        const response: IServiceResponse = await MasterData.getEmploymentTypes(userSession, queryParams)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getEmploymentTypes`, error);
        next(error)
    }
}

export async function getEmploymentTypeByUid(req: any, res: Response, next: NextFunction) {
    logger.info(TAG + '.getEmploymentTypeByUid');
    try {
        const userSession: IUserSession = req.userSession;
        const employmentTypeUid = req.params.employmentTypeUid
        const response: IServiceResponse = await MasterData.getEmploymentTypeByUid(employmentTypeUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getEmploymentTypeByUid`, error);
        next(error)
    }
}

export async function updateEmploymentType(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.updateEmploymentType');
    try {
        logger.debug(`update employment type object ${JSON.stringify(req.body)}`)
        const userSession: IUserSession = req.userSession;
        const employmentTypeUid = req.params.employmentTypeUid
        const employmentDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.updateEmploymentType(employmentDetails, employmentTypeUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.updateEmploymentType`, error);
        next(error)
    }
}

export async function deleteEmploymentType(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.deleteEmploymentType');
    try {
        const userSession: IUserSession = req.userSession;
        const employmentTypeUid = req.params.employmentTypeUid
        const response: IServiceResponse = await MasterData.deleteEmploymentType(employmentTypeUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.deleteEmploymentType`, error);
        next(error)
    }
}


export async function saveJobShifts(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.saveJobShifts');
    try {
        logger.debug(`job shift object ${JSON.stringify(req.body)}`);
        const userSession: IUserSession = req.userSession;
        const jobShiftDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.saveJobShifts(jobShiftDetails, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.saveJobShifts`, error);
        next(error)
    }
}

export async function updateJobShifts(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.updateJobShifts');
    try {
        logger.debug(`update job shift object ${JSON.stringify(req.body)}`)
        const userSession: IUserSession = req.userSession;
        const jobShiftUid = req.params.jobShiftUid
        const jobShiftDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.updateJobShifts(jobShiftDetails, jobShiftUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.updateJobShifts`, error);
        next(error)
    }
}

export async function deleteJobShifts(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.deleteJobShifts');
    try {
        const userSession: IUserSession = req.userSession;
        const jobShiftUid = req.params.jobShiftUid
        const response: IServiceResponse = await MasterData.deleteJobShifts(jobShiftUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.deleteJobShifts`, error);
        next(error)
    }
}

export async function getJobShifts(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getJobShifts');
    try {
        const userSession: IUserSession = req.userSession;
        const queryParams: IBaseListAPIRequest = requestMasterDataQueryMapping(req.query);
        const response: IServiceResponse = await MasterData.getJobShifts(userSession, queryParams)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getJobShifts`, error);
        next(error)
    }
}

export async function getJobShiftsByUid(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getJobShiftsByUid');
    try {
        const userSession: IUserSession = req.userSession;
        const jobShiftUid = req.params.jobShiftUid
        const response: IServiceResponse = await MasterData.getJobShiftsByUid(jobShiftUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getJobShiftsByUid`, error);
        next(error)
    }
}



export async function saveSkill(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.saveSkill');
    try {
        logger.debug(`save skill  object ${JSON.stringify(req.body)}`);
        const userSession: IUserSession = req.userSession;
        const skillDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.saveSkill(skillDetails, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.saveSkill`, error);
        next(error)
    }
}

export async function updateSkill(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.updateSkill');
    try {
        logger.debug(`update skill object ${JSON.stringify(req.body)}`);
        const userSession: IUserSession = req.userSession;
        const skillUid = req.params.skillUid
        const skillDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.updateSkill(skillDetails, skillUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.updateSkill`, error);
        next(error)
    }
}

export async function deleteSkill(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.deleteSkill');
    try {
        const userSession: IUserSession = req.userSession;
        const skillUid = req.params.skillUid
        const response: IServiceResponse = await MasterData.deleteSkill(skillUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.deleteSkill`, error);
        next(error)
    }
}

export async function getSkills(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getSkills');
    try {
        const userSession: IUserSession = req.userSession;
        const queryParams: IMasterDataListAPIRequest = requestMasterDataQueryMapping(req.query);
        const response: IServiceResponse = await MasterData.getSkills(queryParams)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getSkills`, error);
        next(error)
    }
}

export async function getSkillByUid(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getSkillByUid');
    try {
        const userSession: IUserSession = req.userSession;
        const skillUid = req.params.skillUid
        const response: IServiceResponse = await MasterData.getSkillByUid(skillUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getSkillByUid`, error);
        next(error)
    }
}


export async function saveTool(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.saveTool()');
    try {
        logger.debug(`tool object ${JSON.stringify(req.body)}`)
        const userSession: IUserSession = req.userSession;
        const toolDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.saveTool(toolDetails, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.saveTool()`, error);
        next(error)
    }
}

export async function updateTool(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.updateTool()');
    try {
        logger.debug(`update tool object ${JSON.stringify(req.body)}`);
        const userSession: IUserSession = req.userSession;
        const toolUid = req.params.toolUid
        const toolDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.updateTool(toolDetails, toolUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.updateTool()`, error);
        next(error)
    }
}

export async function deleteTool(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.deleteTool()');
    try {
        const userSession: IUserSession = req.userSession;
        const toolUid = req.params.toolUid
        const response: IServiceResponse = await MasterData.deleteTool(toolUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.deleteTool()`, error);
        next(error)
    }
}


export async function getTools(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getTools');
    try {
        const userSession: IUserSession = req.userSession;
        const queryParams: IMasterDataListAPIRequest = requestMasterDataQueryMapping(req.query)
        const response: IServiceResponse = await MasterData.getTools(queryParams, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getTools`, error);
        next(error)
    }
}

export async function getToolsByUid(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getToolsByUid');
    try {
        const userSession: IUserSession = req.userSession;
        const toolUid = req.params.toolUid
        const response: IServiceResponse = await MasterData.getToolsByUid(toolUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getToolsByUid`, error);
        next(error)
    }
}


export async function saveInterviewRound(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.saveInterviewRound()');
    try {
        logger.debug(`save interview round ${JSON.stringify(req.body)}`);
        const userSession: IUserSession = req.userSession;
        const interviewRoundDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.saveInterviewRound(interviewRoundDetails, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.saveInterviewRound()`, error);
        next(error)
    }
}

export async function updateInterviewRound(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.updateInterviewRound()');
    try {
        logger.debug(`update interview round object ${JSON.stringify(req.body)}`)
        const userSession: IUserSession = req.userSession;
        const interviewRoundUid = req.params.interviewRoundUid
        const interviewRoundDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.updateInterviewRound(interviewRoundDetails, interviewRoundUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.updateInterviewRound()`, error);
        next(error)
    }
}

export async function deleteInterviewRound(req: any, res: Response, next: NextFunction) {
    logger.info(TAG + '.deleteInterviewRound()');
    try {
        const userSession: IUserSession = req.userSession;
        const interViewRoundUid = req.params.interviewRoundUid
        const response: IServiceResponse = await MasterData.deleteInterviewRound(interViewRoundUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.deleteInterviewRound()`, error);
        next(error)
    }
}

export async function getInterviewRounds(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getInterviewRounds()');
    try {
        const userSession: IUserSession = req.userSession;
        const queryParams: IMasterDataListAPIRequest = requestMasterDataQueryMapping(req.query);
        const response: IServiceResponse = await MasterData.getInterviewRounds(queryParams, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getInterviewRounds`, error);
        next(error)
    }
}

export async function getInterviewRoundsByUid(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getInterviewRoundsByUid');
    try {
        const userSession: IUserSession = req.userSession;
        const interviewRoundUid = req.params.interviewRoundUid
        const response: IServiceResponse = await MasterData.getInterviewRoundsByUid(interviewRoundUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getInterviewRoundsByUid`, error);
        next(error)
    }
}


export async function saveCourseCategory(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.saveCourseCategory()');
    try {
        logger.debug(`course category object ${JSON.stringify(req.body)}`);
        const userSession: IUserSession = req.userSession;
        const courseCategoryDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.saveCourseCategory(courseCategoryDetails, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.saveCourseCategory()`, error);
        next(error)
    }
}


export async function updateCourseCategory(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.updateCourseCategory()');
    try {
        logger.debug(`update course category object ${JSON.stringify(req.body)}`)
        const userSession: IUserSession = req.userSession;
        const categoryUid = req.params.categoryUid
        const courseCategoryDetails: IMasterData = masterDataMapping(req.body)
        const response: IServiceResponse = await MasterData.updateCourseCategory(courseCategoryDetails, categoryUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.updateCourseCategory()`, error);
        next(error)
    }
}

export async function deleteCourseCategory(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.deleteCourseCategory()');
    try {
        const userSession: IUserSession = req.userSession;
        const categoryUid = req.params.categoryUid
        const response: IServiceResponse = await MasterData.deleteCourseCategory(categoryUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.deleteCourseCategory()`, error);
        next(error)
    }
}

export async function getCourseCategories(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getCourseCategories()');
    try {
        const userSession: IUserSession = req.userSession;
        const response: IServiceResponse = await MasterData.getCourseCategories(userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getCourseCategories()`, error);
        next(error)
    }
}

export async function getCourseCategoriesByUid(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getCourseCategoriesByUid()');
    try {
        const userSession: IUserSession = req.userSession;
        const categoryUid = req.params.categoryUid
        const response: IServiceResponse = await MasterData.getCourseCategoriesByUid(categoryUid, userSession)
        responseBuilder(response, res, next, req)
    } catch (error) {
        logger.error(`Error occured in ${TAG}.getCourseCategoriesByUid()`, error);
        next(error)
    }
}