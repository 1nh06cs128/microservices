// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

// snippet-start:[dynamodb.JavaScript.tables.createdocclientv3]
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import Client from './client.js'

const docClient = DynamoDBDocumentClient.from(Client);
// snippet-end:[dynamodb.JavaScript.tables.createdocclientv3]

export default docClient;