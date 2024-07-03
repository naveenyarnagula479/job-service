import { HttpStatusCodes } from "@constants/status_codes";
import { getConnection, releaseConnection } from "@db/helpers/transaction";
import { templatesData } from '@db/queries';
import logger from "@logger";
import { IListAPIResponse, IMasterTemplates, IServiceResponse, ITemplates, IUserSession, ListAPIResponse, ServiceResponse } from "@models";
import * as TemplateData from '@mongodb/helpers/lib/jd_template';
import * as MasterTemplateData from '@mongodb/helpers/lib/master_template';

const TAG = 'service.templates'

export async function saveMasterTemplates(userSession: IUserSession, templates: IMasterTemplates): Promise<IServiceResponse> {
    logger.info(`${TAG}.saveMasterTemplates() ==> `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, 'Master templates created successfully');
    try {
        connection = await getConnection();
        const existedMasterTemplate = await MasterTemplateData.fetchMasterTemplates();
        if (existedMasterTemplate.masterTemplateUid) {
            await MasterTemplateData.updateMasterTemplate(existedMasterTemplate.masterTemplateUid, templates, userSession.userId);
            serviceResponse.data = { masterTemplateUid: existedMasterTemplate.masterTemplateUid };
        } else {
            const masterTemplates = await MasterTemplateData.addMasterTemplates(templates, userSession.userId);
            serviceResponse.data = { masterTemplateUid: masterTemplates.masterTemplateUid }
        }

    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.saveMasterTemplates() `, error);
        serviceResponse.addServerError(`Failed to save master templates due to technical difficulties`);
        throw error;
    } finally {
        await releaseConnection(connection)
    }
    return serviceResponse;
}
export async function getMasterTemplates(): Promise<IServiceResponse> {
    logger.info(`${TAG}.getMasterTemplates()`);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'Master Templates fetched sucessfully')
    try {
        connection = await getConnection();
        const masterTemplates = await MasterTemplateData.fetchMasterTemplates();
        serviceResponse.data = {
            masterTemplateData: masterTemplates
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getMasterTemplates()`, error);
        serviceResponse.addServerError(`Failed to fetch master templates due to technical difficulties`);
        throw error;
    } finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function saveTemplates(userSession: IUserSession, templates: ITemplates): Promise<IServiceResponse> {
    logger.info(`${TAG}.saveTemplates() ==> `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.CREATED, 'templates created successfully');
    try {
        connection = await getConnection();
        const category = await templatesData.checkCourseCategoryIdExists(connection, templates.categoryId);
        if (category) {
            const isJobTitleExist = await TemplateData.checkJobTitleNameExists(templates.jobTitle, category.id);
            if (isJobTitleExist.templateUid) {
                serviceResponse.addBadRequestError('job title already exist');
            } else {
                const jdTemplates = await TemplateData.addJDTemplates(templates, userSession.userId, category.programId, category.categoryName)
                serviceResponse.data = {
                    templateUid: jdTemplates.templateUid
                }
            }
        }
        else {
            serviceResponse.addBadRequestError('course category id does\t exist');
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.saveTemplates() `, error);
        serviceResponse.addServerError(`Failed to save templates due to technical difficulties`);
        throw error;
    } finally {
        await releaseConnection(connection)
    }
    return serviceResponse;
}
export async function getTemplates(queryParams: any, userSession: IUserSession): Promise<IServiceResponse> {
    logger.info(`${TAG}.getTemplates()`);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'Templates fetched successfully')
    try {
        connection = await getConnection();
        const categoryDetails = await templatesData.checkCourseCategoryIdExists(connection, queryParams.categoryId)
        if (categoryDetails) {
            const { list, totalResultsCount } = await TemplateData.getTemplatesWithPagination(queryParams)
            let offset: number = (queryParams.pageNum - 1) * queryParams.pageSize;
            if (offset < 0) {
                offset = 0;
            }
            const responseData: IListAPIResponse = new ListAPIResponse(
                list,
                parseInt(totalResultsCount) > (queryParams.pageNum * queryParams.pageSize),
                offset + 1,
                offset + list?.length,
                parseInt(totalResultsCount),
                queryParams.sortBy,
                queryParams.sortOrder,
                queryParams.pageNum,
                queryParams.pageSize
            )
            serviceResponse.data = responseData;
        }
        else {
            serviceResponse.addBadRequestError('course category id does\t exist');
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getTemplates()`, error);
        serviceResponse.addServerError(`Failed to fetch templates due to technical difficulties`);
        throw error;
    } finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function updateTemplatesByUid(userSession: IUserSession, templates: ITemplates, templateUid: any): Promise<IServiceResponse> {
    logger.info(`${TAG}.updateTemplatesByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'templates updated successfully');
    try {
        connection = await getConnection();
        const isJobTitleExist = await TemplateData.checkJobTitleNameExists(templates.jobTitle, templates.categoryId, templateUid)
        if (isJobTitleExist.templateUid) {
            serviceResponse.addBadRequestError('job title already exist');
        } else {
            const jdTemplateUid = await TemplateData.getTemplateByUid(templateUid);
            if (jdTemplateUid?.templateUid) {
                const responseUid = await TemplateData.updateTemplatesByUid(templates, templateUid, userSession.userId);

                serviceResponse.data = {
                    templateUid: responseUid
                }
            } else {
                serviceResponse.addBadRequestError('template Uid does\t exist');
            }
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.updateTemplatesByUid() `, error);
        serviceResponse.addServerError(`Failed to update templates due to technical difficulties`);
        throw error;
    } finally {
        await releaseConnection(connection)
    }
    return serviceResponse;
}
export async function getTemplatesByUid(userSession: IUserSession, templateUid: string): Promise<IServiceResponse> {
    logger.info(`${TAG}.getTemplatesByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'templates fetched successfully');
    try {
        connection = await getConnection();
        const jdTemplate = await TemplateData.getTemplateByUid(templateUid);
        if (jdTemplate?.templateUid) {
            serviceResponse.data = jdTemplate
        } else {
            serviceResponse.addBadRequestError('template Uid does\t exist')
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.getTemplatesByUid() `, error);
        serviceResponse.addServerError(`Failed to get templates due to technical difficulties`);
        throw error;
    } finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}
export async function deleteTemplatesByUid(userSession: IUserSession, templateUid: string): Promise<IServiceResponse> {
    logger.info(`${TAG}.deleteTemplatesByUid() `);
    let connection = null;
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, 'templates deleted successfully');
    try {
        connection = await getConnection();
        const jdTemplate = await TemplateData.getTemplateByUid(templateUid)
        if (jdTemplate?.templateUid) {
            await TemplateData.deleteTemplatesByUid(templateUid, userSession.userId)
            serviceResponse.data = {
                templateUid: templateUid
            }
        } else {
            serviceResponse.addBadRequestError('template Uid does\t exist')
        }
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.deleteTemplatesByUid() `, error);
        serviceResponse.addServerError(`Failed to delete templates due to technical difficulties`);
        throw error;
    } finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}