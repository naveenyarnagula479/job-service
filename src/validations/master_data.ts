import logger from '@logger';
import { compile, processErrors } from './ajv_helper';
import * as masterData from './schemas/masterdata';

const TAG = 'validations.master_data';


export async function validateMasterData(req, res, next) {
    logger.info(`${TAG}.validateMasterData()`);
    const masterDataValidation = compile(masterData.masterDataTypes);
    return await processErrors(req, masterDataValidation, next)
}