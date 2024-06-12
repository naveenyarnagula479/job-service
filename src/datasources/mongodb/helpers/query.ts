import logger from '@logger';
import nodeUtil from 'util';

const TAG = 'data_stores.mongodb.helpers.query';

export async function findOne(model: any, conditions: any, projections: any, options?: any, populatePaths?: any) {
    logger.info(TAG + '.findOne()');
    try {
        return await model.findOne(conditions, projections, options)
            .populate();

    } catch (error) {
        logger.error(TAG, 'findOne()', error);
        throw error;
    }
}

export async function findAllRecords(model: any, conditions: any, projections: any, options?: any,
    populatePaths: any[] = []) {
    logger.info(TAG + '.find()');
    try {
        logger.debug('Conditions', nodeUtil.inspect(conditions));
        return await model.find(conditions, projections, options)
            .populate(populatePaths);

    } catch (error) {
        logger.error(TAG, 'findAllRecords()', error);
        throw error;
    }
}

export async function findAllDistinctRecords(model: any, conditions: any, projections: any, options?: any,
    populatePaths: any[] = []) {
    logger.info(TAG + '.find()');
    try {
        logger.debug('Conditions', nodeUtil.inspect(conditions));
        return await model.distinct(conditions, projections, options)
            .populate(populatePaths);

    } catch (error) {
        logger.error(TAG, 'findAllDistinctRecords()', error);
        throw error;
    }
}

export async function findOneAndUpdate(model: any, conditions: any, update: any, options?: any,
    populatePaths: any[] = []) {
    logger.info(TAG + '.findOneAndUpdate()');
    try {
        logger.debug('Conditions', nodeUtil.inspect(conditions));
        logger.debug('Updates', nodeUtil.inspect(update));

        return await model.findOneAndUpdate(conditions, update, options)
            .populate(populatePaths)
            .lean()
            .exec();
    } catch (error) {
        logger.error(TAG, 'findOneAndUpdate()', error);
        throw error;

    }
}

export async function updateMany(model: any, conditions: any, update: any) {
    logger.info(TAG + '.updateMany() ');
    try {
        return await model.updateMany(conditions, update);
    } catch (error) {
        logger.error(TAG, '.updateMany() ', error);
        throw error;
    }
}

export async function findOneAndDelete(model: any, conditions: any, options?: any, populatePaths: any[] = []) {
    logger.info(TAG + '.findOneAndDelete()');
    try {
        return await model.findOneAndDelete(conditions, options)
            .populate(populatePaths);

    } catch (error) {
        logger.error(TAG, 'findOneAndDelete()', error);
        throw error;
    }
}

export async function countRecords(model: any, conditions: any, options?: any) {
    logger.info(TAG + '.countRecords()');
    try {
        logger.debug('Conditions', nodeUtil.inspect(conditions));

        return await model.countDocuments(conditions);
    } catch (error) {
        logger.error(TAG, 'countRecords()', error);
        throw error;
    }
}

export async function deleteManyRecords(model: any, conditions: any) {
    logger.info(TAG + 'deleteMany()');
    try {
        logger.debug('Conditions', nodeUtil.inspect(conditions));
        return await model.deleteMany(conditions);
    } catch (error) {
        logger.error(TAG, 'deleteMany()', error);
        throw error;
    }
}

export async function joinTables(model: any, pipeLine: any) {
    logger.info(TAG + 'joinTables() ');
    try {
        return await model.aggregate(pipeLine);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.joinTables() `, error);
    }
}