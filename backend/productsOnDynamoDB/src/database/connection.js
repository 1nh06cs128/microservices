// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { fileURLToPath } from "url";

import Client from './client.js'
import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { AppLogger, CallPointInfo } from "../../../../others/advanceLog.js";

const DatabaseConnection = async () => {
    AppLogger.emit('debug', `Originating Database Connection`, CallPointInfo());
    try {
        const command = new ListTablesCommand({});
        const response = await Client.send(command);
        if (response.TableNames.length > 0) {
            AppLogger.emit('debug', `Database Connection Successful, DB has following Tables:- ${response.TableNames.join(", ")}`, CallPointInfo());
        } else {
            AppLogger.emit('error', `Database has No Tables`, CallPointInfo());
        }
        return response;
    } catch (error) {
        AppLogger.emit('error', `error in DataBase Connection:- ${error}`, CallPointInfo());
    }
};

// Invoke main function if this file was run directly.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    AppLogger.emit('error', `Invoking Database Connection from process.arg[1] = ${process.argv[1]}`, CallPointInfo());
    DatabaseConnection();
}

export { DatabaseConnection };