import { deleteRecord, fetchRecord, fetchRecords, saveRecord, updateRecord } from '@db/helpers/query_execution';
import { PoolClient } from "pg";
import logger from '@logger';
const TAG = 'datasources.pgsql.query_handlers.lib.templates';
import { toCamelCase } from '@utils/formatter';
import { AppError } from '@models';
import { HttpStatusCodes } from '@constants/status_codes';

export async function checkCourseCategoryIdExists(connection: PoolClient,categoryId : number) {
    logger.info(`${TAG}.getCourseCategories() `);
    try {
        const query: string = `select * from course_categories where id= $1`;
        const result = await fetchRecord(connection, query, [categoryId]);
        
        return toCamelCase(result);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getCourseCategories() `, error);
        throw error;
    }
}