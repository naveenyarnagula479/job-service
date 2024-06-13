import { HttpStatusCodes } from "@constants/status_codes";
import { getConnection, releaseConnection } from "@db/helpers/transaction";
import logger from "@logger";
import { IServiceResponse, ServiceResponse } from "@models";

const TAG = 'service.dummy';

export async function getUsers(): Promise<IServiceResponse> {
    logger.info(TAG + '.getUsers() ');
    const serviceResponse: IServiceResponse = new ServiceResponse(HttpStatusCodes.OK, "fetch users");
    let connection = null;
    try {
        connection = await getConnection();
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.getUsers() `, error);

    } finally {
        await releaseConnection(connection);
    }
    return serviceResponse;
}