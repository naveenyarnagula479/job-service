import { IServiceResponse, ITemplates, IUserSession, ServiceResponse,  IMasterTemplates } from "@models";
import logger from "@logger";
import { HttpStatusCodes } from "@constants/status_codes";
import { getConnection, releaseConnection, rollBackTransaction } from "@db/helpers/transaction";
import * as masterTemplateData from '@mongodb/helpers/lib/master_template';
import * as templateData from '@mongodb/helpers/lib/jd_template';
import { templatesData } from '@db/queries'

const TAG = 'service.templates'

export async function saveMasterTemplates(userSession, templates: IMasterTemplates): Promise<IServiceResponse>{
    logger.info(`${TAG}.saveMasterTemplates() ==> `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, 'Master templates created successfully');
    try{
        connection = await getConnection();
        const masterTemplates = await masterTemplateData.addMasterTemplates(templates, userSession.userId);
        serviceResponse.data= { masterTemplateUid:masterTemplates.uid}
    }catch(error){
        await rollBackTransaction(connection);
        logger.error(`ERROR occured in ${TAG}.saveTemplates() `, error);
        serviceResponse.addServerError(`Failed to save templates due to technical difficulties`);
        throw error;
    }finally{
        await releaseConnection(connection)
    }
    return serviceResponse;

}
export async function getMasterTemplates(userSession: IUserSession): Promise<IServiceResponse>{
    logger.info(`${TAG}.getMasterTemplates()`);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK,'Master Templates fetched sucessfully')
    try{
        connection = await getConnection();
        const masterTemplates = await masterTemplateData.fetchMasterTemplates()
        serviceResponse.data={
            masterTemplateData : masterTemplates
        }
    }catch(error){
        await rollBackTransaction(connection);
        logger.error(`ERROR occured in ${TAG}.getMasterTemplates()`, error);
        serviceResponse.addServerError(`Failed to fetch master templates due to technical difficulties`);
        throw error;
    }finally{
        await releaseConnection(connection)
    }
    return serviceResponse;
};
export async function saveTemplates(userSession, templates: ITemplates){
    logger.info(`${TAG}.saveTemplates() ==> `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, 'templates created successfully');
    try{
        connection = await getConnection();
        const category = await templatesData.checkCourseCategoryIdExists(connection,templates.categoryId);
        if(category){
         await templateData.checkJobTitleNameExists(templates.jobTitle, category.id)
          const jdTemplates = await templateData.addJDTemplates(templates, userSession.userId,category.programId)
          serviceResponse.data={
            jdTemplatUid : jdTemplates.uid
        }
        }else{
            serviceResponse.addBadRequestError('course category id does\t exist');
        }
        
    }catch(error){
    
        logger.error(`ERROR occured in ${TAG}.saveTemplates() `, error);
        serviceResponse.addServerError(`Failed to save templates due to technical difficulties`);
        throw error;
    }finally{
        await releaseConnection(connection)
    }
    return serviceResponse;

}
export async function getTemplates(queryParams: any,userSession: IUserSession): Promise<IServiceResponse>{
    logger.info(`${TAG}.getTemplates()`);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK,'Templates fetched sucessfully')
    try{
        connection = await getConnection();
        const categoryDetails = await templatesData.checkCourseCategoryIdExists(connection,queryParams.categoryId)
        if(categoryDetails){
            const templateDetails = await templateData.getTemplates(categoryDetails.id)
            serviceResponse.data={
                templates: templateDetails
            }
        }
        else{
            serviceResponse.addBadRequestError('course category id does\t exist');
        }
         
    }catch(error){
        logger.error(`ERROR occured in ${TAG}.getTemplates()`, error);
        serviceResponse.addServerError(`Failed to fetch templates due to technical difficulties`);
        throw error;
    }finally{
        await releaseConnection(connection)
    }
    return serviceResponse;
};

export async function updateTemplatesByUid(userSession: IUserSession, templates: ITemplates, templateUid: any): Promise<IServiceResponse>{
    logger.info(`${TAG}.updateTemplatesByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'templates updated successfully');
    try{
        connection = await getConnection();
        await templateData.checkJobTitleNameExists(templates.jobTitle, templates.categoryId, templateUid)
        const jdTemplateUid = await templateData.getTemplateByUid(templateUid)
        if(jdTemplateUid?.uid){
             const templateDetails= await templateData.updateTemplatesByUid(templates,templateUid,userSession.userId);
             serviceResponse.data={
                templateUid: templateDetails.uid
             }
           
        }else{
            serviceResponse.addBadRequestError('Template Uid does\t exist')
        }

        
    }catch(error){
     
        serviceResponse.addServerError(`Failed to update templates due to technical difficulties`);
        throw error;
    }finally{
        await releaseConnection(connection)
    }
    return serviceResponse;
}

export async function getTemplatesByUid(userSession: IUserSession, templateUid): Promise<IServiceResponse>{
    logger.info(`${TAG}.getTemplatesByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'templates fetched successfully' );
    try{
        connection = await getConnection();
        const jdTemplateUid = await templateData.getTemplateByUid(templateUid)
        if(jdTemplateUid?.uid){
            serviceResponse.data={
                templateData : jdTemplateUid
            }
    }else{
        serviceResponse.addBadRequestError('Template Uid does\t exist')
    }
    }catch(error){
       
        serviceResponse.addServerError(`Failed to get templates due to technical difficulties`);
        throw error;
    }finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function deleteTemplatesByUid(userSession: IUserSession, templateUid): Promise<IServiceResponse>{
    logger.info(`${TAG}.deleteTemplatesByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'templates deleted sucessfully');
    try{
        connection = await getConnection();
        const jdTemplateUid = await templateData.getTemplateByUid(templateUid)
        if(jdTemplateUid?.uid){
            const templateDetails = await templateData.deleteTemplatesByUid(templateUid,userSession.userId)
            serviceResponse.data={
                templateUid: templateDetails
             }
    }else{
        serviceResponse.addBadRequestError('Template Uid does\t exist')
    }
    }catch(error){
     
        serviceResponse.addServerError(`Failed to delete templates due to technical difficulties`);
        throw error;
    }finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}