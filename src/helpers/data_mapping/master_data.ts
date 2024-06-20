import logger from '@logger';
import {
    IMasterData,
    MasterDataDetails,
} from '@models';


export function masterDataMapping(payload: any): IMasterData {
    logger.info('helpers.data_mapping.masterdata.masterDataMapping()')
    try {
        if (payload != null && payload !== undefined) {
            return new MasterDataDetails(
                payload.name,
                payload?.categoryId,
                payload?.programId,
                payload?.description
            )
        }
        return payload
    } catch (error) {
        logger.error('ERROR occurred in helpers.data_mapping.masterdata.masterDataMapping()')
        throw error
    }
}