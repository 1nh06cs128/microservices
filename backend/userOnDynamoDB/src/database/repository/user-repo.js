
// docClient is dependency Injected from user-service
// import docClient from '../doc-client.js'

import { ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

import { customLogger } from '../../utils/custom-logger.js';

/**
 * 
 * class UserRepository {

    async getAllUsers() {
        customLogger('getAllUsers');
        const response = {};
        try {
            const params = {
                TableName: tableName || 'users',
            };
            const scanCommand = new ScanCommand(params);
            const opRes = await docClient.send(scanCommand);
            if (opRes.$metadata.httpStatusCode === 200) {
                // Process successful response
                response.statusCode = 200;
                customLogger('DynamoDB operation Passed with:', opRes.$metadata.httpStatusCode);
                if (!users || opRes.Count === 0) {
                    // Handle empty users case (e.g., return empty array or specific message)
                    response.body = JSON.stringify({
                        message: 'No users found.',
                        data: [],
                    });
                } else {
                    response.body = {
                        message: 'Successfully retrieved Users',
                        data: opRes.Items,
                        rawData: users
                    }
                }
            } else {
                // Handle unsuccessful response
                customLogger('DynamoDB operation FAILED with:', opRes.$metadata.httpStatusCode);
            }
        } catch (error) {
            customLogger('Logging error ', error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: 'Failed to get Users.',
                error: error.message
            })
        }
        return response;
    }

    async queryUser(tableName, ids) {
        customLogger('queryUser');
        const response = {};
        try {
            const params = {
                TableName: tableName || 'users',
                Key: {
                    userid: ids || 0,
                },
            };
            const getCommand = new GetCommand(params);
            const opRes = await docClient.send(getCommand);
            if (opRes$metadata.httpStatusCode === 200) {
                customLogger('DynamoDB operation Passed with:', opRes$metadata.httpStatusCode);
                response.body = JSON.stringify({
                    message: 'Successfully retrieved User',
                    data: opResItem,
                })
            } else {
                customLogger('DynamoDB operation FAILED with:', opRes$metadata.httpStatusCode);
            }
        } catch (error) {
            customLogger('Logging error ', error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: 'Failed to get User.',
                error: error.message
            })
        }
        return response;
    };

    async createUser() {
        customLogger('createUser');
        const response = {};
        try {
            const params = {
                TableName: tableName || 'users',
                Item: {
                    userid: "4",
                    description: "Test4",
                    category: "Test",
                    sku: "Test",
                    size: 9,
                    email: "testUser4@test.com"
                },
            };

            const putCommand = new PutCommand(params);
            const opRes = await docClient.send(putCommand);

            customLogger('DynamoDB operation Passed with:', opRes);

            // if (users.$metadata.httpStatusCode === 200) {
            //     // Process successful response
            //     response.statusCode = 200;
            //     if (!users || users.Count === 0) {
            //         // Handle empty users case (e.g., return empty array or specific message)
            //         response.body = JSON.stringify({
            //             message: 'No users found.',
            //             data: [],
            //         });
            //     } else {
            //         response.body = {
            //             message: 'Successfully retrieved Users',
            //             data: users.Items,
            //             rawData: users
            //         }
            //     }
            // } else {
            //     // Handle unsuccessful response
            //     customLogger('DynamoDB operation FAILED with:', users.$metadata.httpStatusCode);
            // }
        } catch (error) {
            customLogger('Logging error ', error);
            // response.statusCode = 500;
            // response.body = JSON.stringify({
            //     message: 'Failed to get Users.',
            //     error: error.message
            // })
        }
        return response;
    }

    async updateUserById(tableName, ids) {
        customLogger('updateUserById');
        const response = {};
        try {
            const params = {
                TableName: tableName || 'users',
                Key: {
                    userid: ids || 0,
                },
            };
            const command = new GetCommand(params);
            const user = await docClient.send(command);
            if (user.$metadata.httpStatusCode === 200) {
                customLogger('DynamoDB operation Passed with:', user.$metadata.httpStatusCode);
                response.body = JSON.stringify({
                    message: 'Successfully retrieved User',
                    data: user.Item,
                })
            } else {
                customLogger('DynamoDB operation FAILED with:', user.$metadata.httpStatusCode);
            }
        } catch (error) {
            customLogger('Logging error ', error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: 'Failed to get User.',
                error: error.message
            })
        }
        return response;
    };

    async deleteUserById(tableName, ids) {
        customLogger('deleteUserById');
        const response = {};
        try {
            const params = {
                TableName: tableName || 'users',
                Key: {
                    userid: ids || 0,
                },
            };
            const command = new GetCommand(params);
            const user = await docClient.send(command);
            if (user.$metadata.httpStatusCode === 200) {
                customLogger('DynamoDB operation Passed with:', user.$metadata.httpStatusCode);
                response.body = JSON.stringify({
                    message: 'Successfully retrieved User',
                    data: user.Item,
                })
            } else {
                customLogger('DynamoDB operation FAILED with:', user.$metadata.httpStatusCode);
            }
        } catch (error) {
            customLogger('Logging error ', error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: 'Failed to get User.',
                error: error.message
            })
        }
        return response;
    };


}

export default UserRepository;

 * 
 */

/*
class UserRepository {

    async getAllUsers(tableName = 'users') {
        customLogger('getAllUsers');
        const response = {};
        try {
            const params = {
                TableName: tableName,
            };
            const scanCommand = new ScanCommand(params);
            const opRes = await docClient.send(scanCommand);
            customLogger(opRes);
            if (opRes.$metadata.httpStatusCode === 200) {
                // Process successful response
                response.statusCode = 200;
                customLogger('DynamoDB operation Passed with:', opRes.$metadata.httpStatusCode);
                if (!opRes.Items || opRes.Count === 0) {
                    // Handle empty users case
                    response.body = JSON.stringify({
                        message: 'No users found.',
                        data: [],
                    });
                } else {
                    response.body = JSON.stringify({
                        message: 'Successfully retrieved Users',
                        data: opRes.Items,
                    });
                }
            } else {
                // Handle unsuccessful response
                customLogger('DynamoDB operation FAILED with:', opRes.$metadata.httpStatusCode);
                response.statusCode = 500;
                response.body = JSON.stringify({
                    message: 'Failed to get Users.',
                    error: `DynamoDB operation error: ${opRes.$metadata.httpStatusCode}`,
                });
            }
        } catch (error) {
            customLogger('Logging error:', error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: 'Failed to get Users.',
                error: error.message,
            });
        }
        return response;
    }

    async getUser(tableName = 'users', userId) {
        customLogger('getUser');
        const response = {};
        try {
            const params = {
                TableName: tableName,
                Key: {
                    userid: userId,
                },
            };
            const getCommand = new GetCommand(params);
            const opRes = await docClient.send(getCommand);

            if (opRes.$metadata.httpStatusCode === 200) {
                customLogger('DynamoDB operation Passed with:', opRes.$metadata.httpStatusCode);
                response.body = JSON.stringify({
                    message: 'Successfully retrieved User',
                    data: opRes.Item,
                });
            } else {
                customLogger('DynamoDB operation FAILED with:', opRes.$metadata.httpStatusCode);
                response.statusCode = 404; // Consider specific error code for "Not Found"
                response.body = JSON.stringify({
                    message: 'User not found.',
                    error: `DynamoDB operation error: ${opRes.$metadata.httpStatusCode}`,
                });
            }
        } catch (error) {
            customLogger('Logging error:', error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: 'Failed to get User.',
                error: error.message,
            });
        }
        return response;
    }

    async createUser(tableName = 'users', user) {
        customLogger('createUser');
        const response = {};
        try {
            const params = {
                TableName: tableName,
                Item: user,
            };

            const putCommand = new PutCommand(params);
            const opRes = await docClient.send(putCommand);

            customLogger('DynamoDB operation Passed with:', opRes);
            response.statusCode = 201; // Created status code
            response.body = JSON.stringify({
                message: 'User created successfully.',
            });
        } catch (error) {
            customLogger('Logging error:', error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: 'Failed to create User.',
                error: error.message,
            });
        }
        return response;
    }

    async updateUserById(tableName = 'users', userId, updatedUser) {
        customLogger('updateUserById');
        const response = {};
        try {
            const params = {
                TableName: tableName,
                Key: {
                    userid: userId,
                },
            };
            const getCommand = new GetCommand(params);
            const existingUser = await docClient.send(getCommand);

            if (existingUser.httpStatusCode === 200) {
                // Update existing user
                const updateParams = {
                    TableName: tableName,
                    Key: {
                        userid: userId,
                    },
                    UpdateExpression: 'SET #attrName = :attrValue', // Use UpdateExpression for efficiency
                    ExpressionAttributeNames: {
                        '#attrName': Object.keys(updatedUser)[0], // Update the first attribute only for now (modify as needed)
                    },
                    ExpressionAttributeValues: {
                        ':attrValue': Object.values(updatedUser)[0], // Update the value of the first attribute
                    },
                };

                const updateCommand = new UpdateCommand(updateParams);
                const opRes = await docClient.send(updateCommand);

                if (opRes.$metadata.httpStatusCode === 200) {
                    customLogger('DynamoDB operation Passed with:', opRes.$metadata.httpStatusCode);
                    response.statusCode = 200;
                    response.body = JSON.stringify({
                        message: 'User updated successfully.',
                    });
                } else {
                    customLogger('DynamoDB operation FAILED with:', opRes.$metadata.httpStatusCode);
                    response.statusCode = 500;
                    response.body = JSON.stringify({
                        message: 'Failed to update User.',
                        error: `DynamoDB operation error: ${opRes.$metadata.httpStatusCode}`,
                    });
                }
            } else {
                customLogger('User not found:', existingUser.httpStatusCode);
                response.statusCode = 404;
                response.body = JSON.stringify({
                    message: 'User not found.',
                });
            }
        } catch (error) {
            customLogger('Logging error:', error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: 'Failed to update User.',
                error: error.message,
            });
        }
        return response;
    }

    async deleteUserById(tableName = 'users', userId) {
        customLogger('deleteUserById');
        const response = {};
        try {
            const params = {
                TableName: tableName,
                Key: {
                    userid: userId,
                },
            };
            const deleteCommand = new DeleteCommand(params);
            const opRes = await docClient.send(deleteCommand);

            if (opRes.$metadata.httpStatusCode === 200) {
                customLogger('DynamoDB operation Passed with:', opRes.$metadata.httpStatusCode);
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: 'User deleted successfully.',
                });
            } else {
                customLogger('DynamoDB operation FAILED with:', opRes.$metadata.httpStatusCode);
                response.statusCode = 404; // Consider specific error code for "Not Found"
                response.body = JSON.stringify({
                    message: 'User not found.',
                    error: `DynamoDB operation error: ${opRes.$metadata.httpStatusCode}`,
                });
            }
        } catch (error) {
            customLogger('Logging error:', error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: 'Failed to delete User.',
                error: error.message,
            });
        }
        return response;
    }

}

export default UserRepository;
*/



class UserRepository {
    constructor(docClient) {
        this.docClient = docClient;
    }

    async buildResponse(callback) {
        customLogger('buildResponse');
        // customLogger(callback);
        const response = {};
        try {
            const opRes = await callback();
            customLogger('try block');
            customLogger(opRes);
            if (opRes.$metadata.httpStatusCode >= 400) {
                // Handle specific DynamoDB errors
                const errorMessage = this.getDynamoDBErrorMessage(opRes.$metadata.httpStatusCode);
                response.statusCode = opRes.$metadata.httpStatusCode;
                response.body = JSON.stringify({
                    message: errorMessage,
                    error: `DynamoDB operation error: ${opRes.$metadata.httpStatusCode}`,
                });
            } else {
                // Process successful response (unchanged)
                customLogger('DynamoDB operation Passed with:', opRes.$metadata.httpStatusCode);
                // ... (rest of successful response logic)
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: 'Successfully retrieved User',
                    data: opRes.Items ? opRes.Items : opRes.Item,
                    count: opRes.Count ? opRes.Count : '1',
                });
            }
        } catch (error) {
            // Handle unexpected errors (including network issues, parsing errors, etc.)
            customLogger('Unexpected error:', error);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: 'Failed to perform operation.',
                error: 'An unexpected error occurred.',
            });
        }
        customLogger(response);
        return response;
    }

    getDynamoDBErrorMessage(statusCode) {
        switch (statusCode) {
            case 400:
                return 'Invalid request parameters.';
            case 404:
                return 'User not found.';
            case 403:
                return 'Forbidden operation.';
            case 412:
                return 'Precondition failed.';
            case 500:
                return 'Internal server error.'; // Consider more specific handling for DynamoDB internal errors
            case 502:
                return 'Bad Gateway.'; // Could be network issues or service unavailability
            case 503:
                return 'Service Unavailable.';
            default:
                return 'Failed to perform operation.';
        }
    }

    async getAllUsers(tableName = 'users') {
        customLogger('getAllUsers');
        return await this.buildResponse(async () => {
            const params = {
                TableName: tableName,
            };
            const scanCommand = new ScanCommand(params);
            const opRes = await this.docClient.send(scanCommand);
            return opRes;
        });
    }

    async getUserById(tableName = 'users', userId = '0') {
        customLogger('getUser');
        return await this.buildResponse(async () => {
            const params = {
                TableName: tableName,
                Key: {
                    userid: userId,
                },
            };
            const getCommand = new GetCommand(params);
            const opRes = await this.docClient.send(getCommand);
            return opRes;
        });
    }

    async createUser(tableName = 'users', user) {
        customLogger('createUser');
        return await this.buildResponse(async () => {
            const params = {
                TableName: tableName,
                Item: user,
            };

            const putCommand = new PutCommand(params);
            const opRes = await this.docClient.send(putCommand);
            customLogger(opRes);
            return opRes;
        });
    }

    async updateUserById(tableName = 'users', userId, updatedUser) {
        customLogger('updateUserById');
        return await this.buildResponse(async () => {
            const params = {
                TableName: tableName,
                Key: {
                    userid: userId,
                },
            };
            const getCommand = new GetCommand(params);
            const existingUser = await this.docClient.send(getCommand);
            customLogger(opRes);
            if (existingUser.HttpStatusCode === 200) {
                // Update existing user logic
                const updateParams = {
                    TableName: tableName,
                    Key: {
                        userid: userId,
                    },
                    UpdateExpression: 'SET #attrName = :attrValue', // Use UpdateExpression for efficiency
                    ExpressionAttributeNames: {
                        '#attrName': Object.keys(updatedUser)[0], // Update the first attribute only for now (modify as needed)
                    },
                    ExpressionAttributeValues: {
                        ':attrValue': Object.values(updatedUser)[0], // Update the value of the first attribute
                    },
                };

                const updateCommand = new UpdateCommand(updateParams);
                const opRes = await this.docClient.send(updateCommand);

                if (opRes.$metadata.httpStatusCode === 200) {
                    customLogger('DynamoDB operation Passed with:', opRes.$metadata.httpStatusCode);
                    return opRes;
                } else {
                    throw new Error('Failed to update user'); // Or handle specific errors
                }
            } else {
                throw new Error('User not found'); // Or handle not found case differently
            }
        });
    }

    async deleteUserById(tableName = 'users', userId) {
        customLogger('deleteUserById');
        return await this.buildResponse(async () => {
            const params = {
                TableName: tableName,
                Key: {
                    userid: userId,
                },
            };
            const deleteCommand = new DeleteCommand(params);
            const opRes = await this.docClient.send(deleteCommand);
            customLogger(opRes);
            if (opRes.$metadata.httpStatusCode === 200) {
                customLogger('DynamoDB operation Passed with:', opRes.$metadata.httpStatusCode);
                return opRes;
            } else {
                throw new Error('Failed to delete user'); // Or handle specific errors
            }
        });
    }
}

export default UserRepository;
