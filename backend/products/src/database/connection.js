// SPDX-License-Identifier: Apache-2.0
import { fileURLToPath } from "url";
import dynamoose from 'dynamoose';
import { ProductsModel } from '../database/models/index.js'
import { AppLogger, CallPointInfo } from "../../../../others/advanceLog.js";

import { USER_CONFIG } from "../config/index.js";

// console.log(dynamoose.aws);
// console.log(dynamoose.aws.sdk);

// dynamoose.aws.sdk.config.update({
// });

// const ddb = new dynamoose.aws.ddb.DynamoDB({
//     accessKeyId: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.ACCESSKEY.ID,
//     secretAccessKey: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.ACCESSKEY.SECRET,
//     region: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.REGION
// });

// dynamoose.aws.ddb.set(ddb);


// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        accessKeyId: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.ACCESSKEY.ID,
        secretAccessKey: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.ACCESSKEY.SECRET,
    },
    region: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.REGION
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

const DatabaseConnection = async () => {
    AppLogger.emit('debug', `Originating Database Connection`, CallPointInfo());
    try {
        // Dynamoose automatically manages the connection, no explicit connection setup needed

        // List tables using Dynamoose
        // const tables = await dynamoose.listTables();
        // const ProductsModel = dynamoose.model('ProductsModel', { id: String });
        AppLogger.emit('debug', `ProductsModel - ${ProductsModel} `, CallPointInfo(), 'red');
        await ProductsModel.scan().exec();

        // if (tables.length > 0) {
        //     AppLogger.emit('debug', `Database Connection Successful, DB has following Tables:- ${tables.join(", ")}`, CallPointInfo());
        // } else {
        //     AppLogger.emit('error', `Database has No Tables`, CallPointInfo());
        // }
        // return tables;
    } catch (error) {
        AppLogger.emit('error', `Error in Database Connection:- ${error}`, CallPointInfo());
    }
};

// Invoke main function if this file was run directly.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    AppLogger.emit('error', `Invoking Database Connection from process.argv[1] = ${process.argv[1]}`, CallPointInfo());
    DatabaseConnection();
}

export { DatabaseConnection };
