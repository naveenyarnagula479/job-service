import { Pagination } from '@constants/app_defaults';
import logger from '@logger';
import {
    BaseListAPIRequest,
    IBaseListAPIRequest,
    MasterDataListAPIRequest,
    IMasterDataListAPIRequest
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

        return new MasterDataListAPIRequest(
            query?.searchText,
            query?.pageNum,
            query?.pageSize,
            query?.queryId,
            query?.sortBy,
            query?.sortOrder,
            query?.categoryId
        )
    }
    catch (error) {
        logger.error('ERROR occurred in helpers.request_query.requestMasterDataQueryMapping()');
    }
}



