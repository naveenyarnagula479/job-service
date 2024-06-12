import { responseBuilder } from '@helpers/response_builder';
import logger from '@logger';
import { IServiceResponse, IUserSession } from '@models';
import { NextFunction, Response } from 'express';
import nodeUtil from 'util';
import * as service from '@service/dummy'

const TAG = 'controller.dummy';

export async function getUsers(req: any, res: Response, next: NextFunction): Promise<void> {
    logger.info(TAG + '.getUsers() ');
    try {
        logger.debug(`${TAG}.getUsers()  req file: ` + nodeUtil.inspect(req.file));
        const userSession: IUserSession = req.userSession;
        const response: IServiceResponse = await service.getUsers();
        responseBuilder(response, res, next, req);
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getUsers() `, error);
        next(error);
    }
}