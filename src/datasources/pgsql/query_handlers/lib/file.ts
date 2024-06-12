import { fetchRecord, saveRecord, updateRecord } from "@db/helpers/query_execution"
import logger from "@logger"
import { PoolClient } from "pg"
import crypto from 'crypto'
import { toCamelCase } from "@utils/formatter"


const TAG = 'data_stores_mysql_lib_file'

export async function fetchFileDetails(connection: PoolClient, fileId: number): Promise<any> {
    logger.info(`${TAG}.fetchFileDetails()`);
    try {
        const query = 'select * from file_details where id = $1';
        const result = await fetchRecord(connection, query, [
            fileId
        ]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`ERROR occured in ${TAG}.fetchFileDetails() `, error);
        throw error;
    }
}

export async function fetchFileDetailsByUid(connection: PoolClient, fileUid: string): Promise<any> {
    logger.info(`${TAG}.fetchFileDetailsByUid() `);
    try {
        const query: string = `select * from file_details where uid = $1`;
        const result = await fetchRecord(connection, query, [fileUid]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.fetchFileDetailsByUid() `, error);
        throw error;
    }
}

export async function saveFile(connection: PoolClient, fileDetails: any, userId: number): Promise<any> {
    logger.info(`${TAG}.saveFile()`)
    try {
        const uid = crypto.randomUUID();
        fileDetails['createdBy'] = userId

        const fileInsertQuery = `INSERT INTO FILE_DETAILS
  (Uid, FILE_NAME,ORIGINAL_FILE_NAME, CONTENT_TYPE, S3_BUCKET, FILE_PATH, FILE_URL, IS_PUBLIC,  CREATED_BY)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id`
        const result = await saveRecord(connection, fileInsertQuery, [
            uid,
            fileDetails.fileName,
            fileDetails.originalFileName,
            fileDetails.contentType,
            fileDetails.s3Bucket,
            fileDetails.filePath,
            fileDetails.fileUrl,
            fileDetails.isPublic,
            fileDetails.createdBy
        ])
        return { id: result.id, uid: uid }
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveFile()`, error)
        throw error
    }
}

export async function saveVideoFile(connection: PoolClient, userId: number, file: any): Promise<any> {
    logger.info(`${TAG}.saveVideoFile() `);
    try {
        const uid = crypto.randomUUID();
        const fileInsertQuery = `INSERT INTO VIDEO_FILE_DETAILS (UID, VIDEO_FILE_NAME, CONTENT_TYPE, CREATED_BY)
        VALUES ($1, $2, $3, $4) returning id`
        const result = await saveRecord(connection, fileInsertQuery, [
            uid,
            file.originalname,
            file.mimetype,
            userId
        ]);
        return { id: result.id, uid: uid };
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.saveVideoFile() `, error);
        throw error;
    }
}


export async function getVideoFileDetailsByUid(connection: PoolClient, videoFileUid: string): Promise<any> {
    logger.info(`${TAG}.getVideoFileDetailsByUid() `);
    try {
        const query: string = `select * from video_file_details where uid = $1 and is_deleted = false`;
        const result = await fetchRecord(connection, query, [videoFileUid]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getVideoFileDetailsByUid() `, error);
        throw error;
    }
}

export async function updateVideoDuration(connection: PoolClient, videoFileUid: string, videoDuration) {
    logger.info(`${TAG}.updateVideoDuration() `);
    try {
        const query: string = `update video_file_details set video_duration = $1 where uid = $2`;
        await updateRecord(connection, query, [videoDuration, videoFileUid]);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateVideoDuration() `, error);
        throw error;
    }
}
export async function updateVideoFileDetails(connection: PoolClient, vodId: string, videoFileUid: string, assetId: string) {
    logger.info(`${TAG}.updateVideoFileDetails() `);
    try {
        const query = `UPDATE VIDEO_FILE_DETAILS SET VOD_ID = $1, ASSET_ID = $2 WHERE UID = $3`;
        await updateRecord(connection, query, [vodId, assetId, videoFileUid]);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateVideoFileDetails() `, error);
        throw error;
    }
}

export async function uploadThumbnailByUid(connection: PoolClient, videoFileUid: string, fileName: string) {
    logger.info(`${TAG}.uploadVideoThumbnail() `);
    try {
        const query = `update video_file_details set thumbnail_file_name = $1 where uid = $2`;
        await updateRecord(connection, query, [fileName, videoFileUid]);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.uploadVideoThumbnail() `, error);
        throw error;
    }
}

export async function checkFolderExists(connection: PoolClient, folderPath: string) {
    logger.info(`${TAG}.checkFolderExists() `);
    try {
        const query: string = `select * from dacast_folders where folder_path = $1`;
        const result = await fetchRecord(connection, query, [folderPath]);
        return toCamelCase(result);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.checkFolderExists() `, error);
        throw error;
    }
}

export async function deleteVideoFileDetailsByUid(connection: PoolClient, videoFileUid: string, vodId: string) {
    logger.info(`${TAG}.deleteVideoFileDetailsByUid() `);
    try {
        const query: string = `update video_file_details set is_deleted = true where uid = $1 and vod_id = $2`;
        await updateRecord(connection, query, [videoFileUid, vodId]);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.deleteVideoFileDetailsByUid() `, error);
        throw error;
    }
}

export async function createFolder(connection: PoolClient, id: string, folderPath: string, videoFileUid: string, userId: number) {
    logger.info(TAG + '.createFolder() ');
    try {
        const query: string = `insert into dacast_folders (folder_id, folder_path, created_by) values ($1, $2, $3) returning id`;
        const result = await saveRecord(connection, query, [id, folderPath, userId]);
        const updateQuery: string = `update video_file_details set folder_id = $1 where uid = $2`
        await updateRecord(connection, updateQuery, [result?.id, videoFileUid]);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.createFolder() `, error);
        throw error;
    }
}

export async function updateFolderDetails(connection: PoolClient, folderId: string, videoFileUid: string, vodId: string) {
    logger.info(TAG + '.updateFolderDetails() ');
    try {
        const query: string = `update video_file_details set folder_id = $1 where uid = $2 and vod_id = $3`;
        await updateRecord(connection, query, [folderId, videoFileUid, vodId]);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.updateFolderDetails() `, error);
        throw error;
    }
}