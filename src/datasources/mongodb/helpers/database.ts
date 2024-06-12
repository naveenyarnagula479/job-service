import { MONGO_DATABASE } from "@config";
import logger from "@logger";
import mongoose from "mongoose";


const TAG = 'datasources/mongodb/helpers/database';

const options = {};

let connectionEstablished = false;



export async function getMongoConnection() {
    try {
        if (connectionEstablished) {
            return;
        }
        // let URL = `mongodb://localhost:27017/lms?appname=MongoDB%20Compass&ssl=false`
        let URL = `mongodb://cpdevusr2:sjfio4Qw24Juysds86MBGTu@3.109.121.136:12088/lms?&appname=MongoDB%20Compass&ssl=false`
        if (MONGO_DATABASE?.username?.length && MONGO_DATABASE?.password?.length) {
            URL = `mongodb://${MONGO_DATABASE.username}:${MONGO_DATABASE.password}@${MONGO_DATABASE.address}:${MONGO_DATABASE.port}/${MONGO_DATABASE.name}?&appname=MongoDB%20Compass&ssl=false`;
        }
        console.log(URL)
        await mongoose.connect(URL, options);
        logger.info('Mongo connection initialised successfully!!!');
        connectionEstablished = true;
    } catch (error) {
        logger.error(`ERROR occurred in ${TAG}.mongoConnection() `, error);
        throw error;
    }
}