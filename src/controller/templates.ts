import { templateDataMapping, masterTemplateDataMapping } from '@helpers/data_mapping/templates';
import { responseBuilder } from '@helpers/response_builder';
import logger from '@logger';
import { IServiceResponse, ITemplates, IUserSession, IMasterTemplates } from '@models';
import { NextFunction, Response } from 'express';
import * as templateService from '@service/templates';
import { requestTemplatesListQueryMapping } from '@helpers/data_mapping/request_query';

const TAG = 'controller.templates';

export async function saveMasterTemplates(req: any, res: Response, next: NextFunction):Promise<void>{
    try{
        logger.info(TAG + `.saveTemplates()`);
        logger.debug(`saveMasterTemplates object = ${ JSON.stringify(req.body)}`);
        const templates : IMasterTemplates =  masterTemplateDataMapping(req.body);
        const userSession: IUserSession = req.userSession;
        const templateResponse: IServiceResponse = await templateService.saveMasterTemplates(userSession, templates);
        responseBuilder(templateResponse, res, next, req);
    }catch(error){
        logger.error(`ERROR occured in ${TAG}. saveMasterTemplates()`);
        next(error);
    }
}

export async function getMasterTemplates(req: any, res:Response, next: NextFunction):Promise<void>{
    try{
        logger.info(TAG + `getMasterTemplates()`);
        const userSession : IUserSession = req.userSession;
        const masterTemplateResponse: IServiceResponse = await templateService.getMasterTemplates(userSession);
        responseBuilder(masterTemplateResponse, res, next, req);
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.getMasterTemplates() `);
        next(error);
    }
}

export async function saveTemplates(req: any, res: Response, next: NextFunction):Promise<void>{
    try{
        logger.info(TAG + `.saveTemplates()`);
        logger.debug(`saveTemplates object = ${ JSON.stringify(req.body)}`);
        const templates : ITemplates =  templateDataMapping(req.body);
        const userSession: IUserSession = req.userSession;
        const templateResponse: IServiceResponse = await templateService.saveTemplates(userSession, templates);
        responseBuilder(templateResponse, res, next, req);
    }catch(error){
        logger.error(`ERROR occured in ${TAG}. saveTemplates()`);
        next(error);
    }
}

export async function getTemplates(req: any, res:Response, next: NextFunction):Promise<void>{
    try{
        logger.info(TAG + `getTemplates()`);
        const userSession : IUserSession = req.userSession;
        const queryParams = requestTemplatesListQueryMapping(req.query);
        const templateResponse: IServiceResponse = await templateService.getTemplates(queryParams,userSession);
        responseBuilder(templateResponse, res, next, req);
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.getTemplates() `);
        next(error);
    }
}
export async function updateTemplatesByUid(req: any, res:Response, next: NextFunction):Promise<void>{
    try{
        logger.info(TAG + `.updateTemplatesByUid()`);
        logger.debug(`update templates object = ${JSON.stringify(req.body)}`);
        const templates:ITemplates = templateDataMapping(req.body);
        const {templateUid}= req.params;
        const userSession: IUserSession = req.userSession;
        const templateResponse: IServiceResponse = await templateService.updateTemplatesByUid(userSession,templates,templateUid);
        responseBuilder(templateResponse, res, next, req);
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.updateTemplateByUid() `);
        next(error);
    }
}

export async function getTemplatesByUid(req: any, res: Response, next: NextFunction):Promise<void>{
    try{
        logger.info(TAG + `.getTemplatesByUid()`);
        const {templateUid} = req.params;
        const userSession: IUserSession = req.userSession;
        const templateResponse: IServiceResponse = await templateService.getTemplatesByUid(userSession,templateUid);
        responseBuilder(templateResponse, res, next, req);
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.getTemplatesByUid() `);
        next(error);
    }
}
export async function deleteTemplatesByUid(req: any, res: Response, next: NextFunction):Promise<void>{
    try{
        logger.info(TAG + `.deleteTemplatesByUid()`);
        const {templateUid} = req.params;
        const userSession: IUserSession = req.userSession;
        const templateResponse: IServiceResponse = await templateService.deleteTemplatesByUid(userSession, templateUid);
        responseBuilder(templateResponse, res, next, req);
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.deleteTemplatesByUid() `);
        next(error);
    }
}
