import { Pagination } from '@constants/app_defaults';
import logger from '@logger';
import {
    BaseListAPIRequest,
    IBaseListAPIRequest,
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
        return new JobsListAPIRequest(
            query?.searchText,
            query?.pageNum,
            query?.pageSize,
            query?.categoryId,
            query?.programId,
            query?.templateUid
           
        )
    } catch (error) {
        logger.error(`ERROR occurred in helpers.data_mapping.request_query.requestJobsListQueryMapping() `);
        throw error;
    }
}

