import { Pagination } from '@constants/app_defaults';
import logger from '@logger';
import {
    BaseListAPIRequest,
    IBaseListAPIRequest,
    MasterDataListAPIRequest,
    IMasterDataListAPIRequest,
    IJobsListAPIRequest,
    ITemplatesListAPIRequest,
    JobsListAPIRequest,
    TemplatesListAPIRequest,
} from '@models';


export function requestQueryDataMapping(query: any): IBaseListAPIRequest {
    logger.info('helpers.data_mapping.request_query.requestQueryDataMapping()');

    try {
        if (query?.pageNum === '') {
            query.pageNum = Pagination.PAGE_NUM;
        }
        if (query?.pageSize === '') {
            query.pageSize = Pagination.PAGE_SIZE;
        }

        return new BaseListAPIRequest(
            query?.searchText,
            query?.pageNum,
            query?.pageSize,
            query?.queryId,
            query?.sortBy,
            query?.sortOrder,
        );
    } catch (error) {
        logger.error('ERROR occurred in helpers.request_query.requestQueryDataMapping()');
    }
}

export function requestMasterDataQueryMapping(query: any): IMasterDataListAPIRequest {
    logger.info('helpers.data_mapping.request_query.requestMasterDataQueryMapping() ');
    try {
        if (query?.pageNum === '') {
            query.pageNum = Pagination.PAGE_NUM;
        }
        if (query?.pageSize === '') {
            query.pageSize = Pagination.PAGE_SIZE;
        }
        query.isPaginated = query.isPaginated !== undefined && query.isPaginated !== '' ? query.isPaginated === 'true' : true;

        return new MasterDataListAPIRequest(
            query?.searchText,
            query?.pageNum,
            query?.pageSize,
            query?.queryId,
            query?.sortBy,
            query?.sortOrder,
            query?.categoryId,
            query?.isPaginated ?? true
        )
    }
    catch (error) {
        logger.error('ERROR occurred in helpers.request_query.requestMasterDataQueryMapping()');
    }
}
export function requestTemplatesListQueryMapping(query: any): ITemplatesListAPIRequest {
    logger.info('helpers.data_mapping.request_query.requestTemplatesListQueryMapping() ');
    try {
        if (query?.pageNum === '') {
            query.pageNum = Pagination.PAGE_NUM;
        }
        if (query?.pageSize === '') {
            query.pageSize = Pagination.PAGE_SIZE;
        }
        return new TemplatesListAPIRequest(
            query?.searchText,
            query?.pageNum,
            query?.pageSize,
            query?.categoryId,

        )
    } catch (error) {
        logger.error(`ERROR occurred in helpers.data_mapping.request_query.requestTemplatesListQueryMapping() `);
        throw error;
    }
}
export function requestJobsListQueryMapping(query: any): IJobsListAPIRequest {
    logger.info('helpers.data_mapping.request_query.requestJobsListQueryMapping() ');
    try {
        if (query?.pageNum === '') {
            query.pageNum = Pagination.PAGE_NUM;
        }
        if (query?.pageSize === '') {
            query.pageSize = Pagination.PAGE_SIZE;
        }
        if (query?.isActionableJobs === 'true') {
            query.isActionableJobs = true
        } else {
            query.isActionableJobs = false
        }
        return new JobsListAPIRequest(
            query?.searchText || '',
            query?.pageNum,
            query?.pageSize,
            query?.categoryId,
            query?.isActionableJobs

        )
    } catch (error) {
        logger.error(`ERROR occurred in helpers.data_mapping.request_query.requestJobsListQueryMapping() `);
        throw error;
    }
}


