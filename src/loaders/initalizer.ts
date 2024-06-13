import { checkEnv } from '@config';
import { connectionPool } from '@db/helpers/database';
import { s3ConnectionLoader } from '@loaders/s3_config';
import { loadTemplates } from '@loaders/template';
import log from '@logger';
import { getMongoConnection } from '@mongodb/helpers/database';
import initializeRoutes from '@routes/initializer';
import { Application } from 'express';
import { emailClientLoader } from './email_client';
import serverLoader from './server';



export async function initializeApp(app: Application) {
    try {
        await checkEnv();
        await getMongoConnection();
        await connectionPool();
        // await schedulars.updateStudentExamCronJob();
        serverLoader(app);
        s3ConnectionLoader();
        emailClientLoader();
        loadTemplates();
        initializeRoutes(app);
    } catch (error) {
        log.error('ERROR occurred in initializeApp().', error);
        throw error;
    }
}
