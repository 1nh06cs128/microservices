// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// snippet-start:[dynamodb.JavaScript.tables.createclientv3]
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { USER_CONFIG } from '../config/index.js'

const Client = new DynamoDBClient({
    credentials: {
        accessKeyId: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.ACCESSKEY.ID,
        secretAccessKey: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.ACCESSKEY.SECRET,
    },
    region: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.REGION
});

export default Client;