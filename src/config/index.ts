import { config } from 'dotenv';
import { AppError } from '@models';
import { resolve } from 'path';

// TODO: get path from env.
// option to load conf from Param store as well
config({ path: resolve(__dirname, '../../.env') });

export const LOG_LEVEL = process.env?.LOG_LEVEL ?? 'debug';
export const LOG_DIRECTORY = process.env?.LOG_DIRECTORY ?? './logs';

import logger from '@logger';

export const PORT = process.env.PORT || 8001;
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'careerpedia_jwt_a';
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'careerpedia_jwt_r';
export const JWT_ACCESS_TOKEN_EXPIRY_TIME = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME || '') || (2 * 60 * 60);
export const JWT_REFRESH_TOKEN_EXPIRY_TIME = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY_TIME || '') || (30 * 24 * 60 * 60);
export const CORS_ORIGIN_URLS = process.env.CORS_ORIGIN || '*';
export const API_CALL_LOG_FORMAT = process.env.API_CALL_LOG_FORMAT ||
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';
export const REQUEST_BODY_LIMIT = parseInt(process.env.REQUEST_BODY_LIMIT || '100');
export const CONF_DIR_PATH = process.env.CONF_DIR_PATH || resolve('./config/');
export const SWAGGER_DOC_PATH = process.env.SWAGGER_DOC_PATH || resolve('./auth_service_doc.yaml');
export const AES_ENC_KEY = process.env.ASE_ENC_KEY || 'bf3c199c2470cb477d907b1e0917c17b';
export const AES_IV = process.env.ASE_IV || '5183666c72eec9e4';
export const SENDER_EMAIL_ID = process.env.SENDER_EMAIL_ID || '';
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';
export const OTP_EXPIRY_TIME = 6000
export const DEFAULT_OTP_LENGTH = 6;
export const DEFAULT_PASSWORD_LENGTH = 8;
export const PRESIGNED_URL_EXPIRY_TIME = 3600;

export const AWS_S3 = {
    accessKeyId: process.env.S3_ACCESS_KEY || '',
    secretAccessKey: process.env.S3_SECRET_CODE || '',
    acl: process.env.ACL || '"public-read"',
    bucketName: process.env.S3_BUCKET_NAME || '',
    courseBucketName: process.env.S3_COURSE_BUCKET_NAME || '',
    region: process.env.S3_REGION || '',

};
export const PG_DATABASE = {
    host: process.env.SQL_DATABASE_HOST || 'localhost',
    port: parseInt(process.env.SQL_DATABASE_PORT || '3306'),
    username: process.env.SQL_DATABASE_USERNAME,
    password: process.env.SQL_DATABASE_PASSWORD,
    db_name: process.env.SQL_DATABASE_NAME || '',
    options: process.env.SQL_DATABASE_OPTIONS || "-c search_path=some_schema",
    pool_size: parseInt(process.env.SQL_DATABASE_POOL_SIZE || '30'),
};

export const MONGO_DATABASE = {
    URL: process.env.MONGO_URL || '',
    address: process.env.MONGO_DATABASE_ADDRESS || '127.0.0.1',
    port: process.env.MONG_DATABASE_PORT || 27017,
    username: encodeURIComponent(process.env.MONGO_DATABASE_USERNAME),
    password: encodeURIComponent(process.env.MONGO_DATABASE_PASSWORD),
    name: process.env.MONGO_DATABASE_NAME || 'lms',
};

export async function checkEnv() {
    logger.info('STARTED Validation of env variables!');
    const mandatoryFields = ['SQL_DATABASE_HOST', 'SQL_DATABASE_USERNAME', 'SQL_DATABASE_PASSWORD'];
    mandatoryFields.forEach((field) => {
        if (!process.env[field]) {
            throw new AppError(`Required configuration '${field}' is missing`);
        }
    });
}
