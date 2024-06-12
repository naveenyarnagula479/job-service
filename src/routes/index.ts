import log from '@logger';
import { errorHandler } from '@middleware/error_handler';
import { Application } from 'express';
import v1Routes from './v1';

export default function initializeRoutes(app: Application) {
    log.info('initializeRoutes()');
    app.use('/api/v1/cs/', v1Routes);
    app.use(errorHandler);
}
