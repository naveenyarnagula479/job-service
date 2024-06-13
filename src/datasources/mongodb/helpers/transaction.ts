// import logger from "@logger";
// import mongoose, { ClientSession } from "mongoose";

// const TAG = 'datasources.mongodb.helpers.transaction.';

// export async function startSession(): Promise<ClientSession> {
//     logger.info(TAG + 'startSession() ');
//     try {
//         const session = await mongoose.startSession();
//         session.startTransaction();
//         return session; 
//     } catch (error) {
//         logger.error(TAG + 'ERROR occurred in startSession() ');
//         throw error;
//     }
// }

// export async function abortSession(session: ClientSession): Promise<void> {
//     logger.info('abortTransaction()');
//     try {
//         await session.abortTransaction();
//     } catch (error) {
//         logger.error(`ERROR occurred in abortSession() `, error);
//         throw error;
//     }
// }

// export async function commitSession(session: ClientSession): Promise<void> {
//     logger.info('commitTransaction()');
//     try {
//         await session.commitTransaction();
//     } catch (error) {
//         logger.error(`ERROR occurred in commitSession() `, error);
//         throw error;
//     }
// }

// export async function endSession(session: ClientSession): Promise<void> {
//     logger.info('endSession()');
//     try {
//         session.endSession();
//     } catch (err) {
//         logger.error(`ERROR occurred in endSession() `, err);
//         throw err;
//     }
// }
