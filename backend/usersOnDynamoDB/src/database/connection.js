// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { fileURLToPath } from "url";

import { customLogger } from "../utils/custom-logger.js"
import Client from './client.js'
import { ListTablesCommand } from '@aws-sdk/client-dynamodb';

const DatabaseConnection = async () => {
    customLogger('DatabaseConnection');
    try {
        const command = new ListTablesCommand({});
        const response = await Client.send(command);
        // customLogger(Client);
        // customLogger(response);
        // customLogger(response.TableNames);
        customLogger(response.TableNames.length > 0 ? response.TableNames.join("\n") : 'No Tables Found');
        return response;
    } catch (err) {
        console.error(err)
    }
};

// Invoke main function if this file was run directly.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    DatabaseConnection();
}

export { DatabaseConnection };