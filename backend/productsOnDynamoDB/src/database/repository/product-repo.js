import { AppLogger, CallPointInfo, forMethods } from "../../../../../others/advanceLog.js";
// import { nanoid } from 'nanoid';

/**
 * OPERATIONS WITHOUT TABLE ENTITY AND SCHEMA
 */
// import Client from './client.js'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { USER_CONFIG } from '../../config/index.js'

import { ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

class ProductRepository {

    constructor() {
        AppLogger.emit('info', `Product Repository Constructor`, CallPointInfo());
        const client = new DynamoDBClient({
            credentials: {
                accessKeyId: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.ACCESSKEY.ID,
                secretAccessKey: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.ACCESSKEY.SECRET,
            },
            region: USER_CONFIG.AWS_CREDS.REMOTE_CONFIG.REGION
        });

        const docClient = DynamoDBDocumentClient.from(client);
        this.docClient = docClient;
    }

    async buildResponse(callback) {
        // AppLogger.emit('debug', `buildResponse, callback - ${callback}`, CallPointInfo());
        let response = {};
        try {
            const opRes = await callback();
            AppLogger.emit('debug', `Try Block opRes - ${JSON.stringify(opRes)}`, CallPointInfo());
            if (opRes.$metadata.httpStatusCode >= 400) {
                AppLogger.emit('debug', `DynamoDB operation Failed with: ${opRes.$metadata.httpStatusCode}`, CallPointInfo());
                // Handle specific DynamoDB errors
                const errorMessage = this.getDynamoDBErrorMessage(opRes.$metadata.httpStatusCode);
                response = {
                    statusCode: opRes.$metadata.httpStatusCode,
                    message: errorMessage,
                    error: `DynamoDB operation error: ${opRes.$metadata.httpStatusCode}`,
                };
            } else {
                // Process successful response (unchanged)
                AppLogger.emit('debug', `DynamoDB operation Passed with: ${opRes.$metadata.httpStatusCode}`, CallPointInfo());
                // ... (rest of successful response logic)
                response = {
                    statusCode: 200,
                    message: 'Successfully retrieved Product',
                    data: opRes.Items ? opRes.Items : opRes.Item,
                    count: opRes.Count ? opRes.Count : '1',
                };
            }
        } catch (error) {
            // Handle unexpected errors (including network issues, parsing errors, etc.)
            AppLogger.emit('error', `Unexpected error: ${error}`, CallPointInfo());
            console.error(error);
            response = {
                statusCode: 500,
                message: 'Failed to perform operation.',
                error: 'An unexpected error occurred.',
            };
        }
        AppLogger.emit('debug', `response - ${JSON.stringify(response)}`, CallPointInfo());
        return response;
    }

    getDynamoDBErrorMessage(statusCode) {
        let errorMessage;
        switch (statusCode) {
            case 400:
                errorMessage = 'Invalid request parameters.';
                break;
            case 404:
                errorMessage = 'Product not found.';
                break;
            case 403:
                errorMessage = 'Forbidden operation.';
                break;
            case 412:
                errorMessage = 'Precondition failed.';
                break;
            case 500:
                errorMessage = 'Internal server error.'; // Consider more specific handling for DynamoDB internal errors
                break;
            case 502:
                errorMessage = 'Bad Gateway.'; // Could be network issues or service unavailability
                break;
            case 503:
                errorMessage = 'Service Unavailable.';
                break;
            default:
                errorMessage = 'Failed to perform operation.';
        }
        AppLogger.emit('debug', `DynamoDB Error: ${errorMessage}`, CallPointInfo());
        return errorMessage;
    }

    async getAllProducts(tableName = 'products') {
        AppLogger.emit('debug', `getAllProducts`, CallPointInfo());
        return await this.buildResponse(async () => {
            const params = {
                TableName: tableName,
            };
            const scanCommand = new ScanCommand(params);
            const opRes = await this.docClient.send(scanCommand);
            return opRes;
        });
    }

    async getProductById(tableName = 'products', productId = '0') {
        AppLogger.emit('debug', `getProductById`, CallPointInfo());
        return await this.buildResponse(async () => {
            const params = {
                TableName: tableName,
                Key: {
                    productId: productId,
                },
            };
            const getCommand = new GetCommand(params);
            const opRes = await this.docClient.send(getCommand);
            return opRes;
        });
    }

    async createProduct(tableName = 'products', Product) {
        AppLogger.emit('debug', `createProduct`, CallPointInfo());
        return await this.buildResponse(async () => {
            const params = {
                TableName: tableName,
                Item: Product,
            };

            const putCommand = new PutCommand(params);
            const opRes = await this.docClient.send(putCommand);
            AppLogger.emit('debug', `opRes - ${opRes}`, CallPointInfo());
            return opRes;
        });
    }

    async updateProductById(tableName = 'products', productId, updatedProduct) {
        AppLogger.emit('debug', `updateProductById`, CallPointInfo());
        return await this.buildResponse(async () => {
            const params = {
                TableName: tableName,
                Key: {
                    productId: productId,
                },
            };
            const getCommand = new GetCommand(params);
            const existingUser = await this.docClient.send(getCommand);
            AppLogger.emit('debug', `opRes;- ${opRes}`, CallPointInfo());
            if (existingUser.HttpStatusCode === 200) {
                // Update existing Product logic
                const updateParams = {
                    TableName: tableName,
                    Key: {
                        productId: productId,
                    },
                    UpdateExpression: 'SET #attrName = :attrValue', // Use UpdateExpression for efficiency
                    ExpressionAttributeNames: {
                        '#attrName': Object.keys(updatedProduct)[0], // Update the first attribute only for now (modify as needed)
                    },
                    ExpressionAttributeValues: {
                        ':attrValue': Object.values(updatedProduct)[0], // Update the value of the first attribute
                    },
                };

                const updateCommand = new UpdateCommand(updateParams);
                const opRes = await this.docClient.send(updateCommand);

                if (opRes.$metadata.httpStatusCode === 200) {
                    AppLogger.emit('debug', `DynamoDB operation Passed with: ${opRes.$metadata.httpStatusCode}`, CallPointInfo());
                    return opRes;
                } else {
                    AppLogger.emit('error', `DynamoDB operation Failed to update Product`, CallPointInfo());
                    throw new Error('Failed to update Product'); // Or handle specific errors
                }
            } else {
                AppLogger.emit('error', `DynamoDB operation FAILED as Product not found`, CallPointInfo());
                throw new Error('Product not found'); // Or handle not found case differently
            }
        });
    }

    async deleteProductById(tableName = 'products', productId) {
        // AppLogger.emit('debug', `deleteProductById - productId = ${productId}`, CallPointInfo());
        return await this.buildResponse(async () => {
            // AppLogger.emit('debug', `deleteProductById Inside BuildResponse`, CallPointInfo());
            const scanParams = {
                TableName: tableName,
            };
            const scanCommand = new ScanCommand(scanParams);
            const products = await this.docClient.send(scanCommand);
            // console.log(products);
            let productName;
            products['Items'].map(product => {
                if (product && product.id == productId) {
                    // Assuming userId is unique, so we only expect one result
                    // const productToDelete = products[0];
                    productName = product.name;
                }
            })

            // await ProductsModel.query('id').eq(id).exec()
            // .then((products) => {
            //     AppLogger.emit('debug', `deleteProductById - ${JSON.stringify(products)}`, CallPointInfo(), 'red');
            //     if (products && products.length == 1) {
            //         // Assuming userId is unique, so we only expect one result
            //         const productToDelete = products[0];
            //         console.log(productToDelete)
            //         // Delete the product
            //         const opRes = ProductsModel.delete({ id: productToDelete.id, name: productToDelete.name });
            //         return {
            //             statusCode: 200,
            //             message: `Product deleted successfully - ${JSON.stringify(opRes)}`,
            //             productToDelete
            //         }
            //     } else {
            //         console.log('More than 1 Product not found');
            //     }
            // }).catch((error) => {
            //     console.error('Error deleting Product:', error);
            //     return error;
            // });

            const params = {
                "TableName": String(tableName),
                "Key": {
                    "id": {
                        S: String(productId),
                    },
                    "name": {
                        S: String(productName)
                    }
                },
            };
            AppLogger.emit('debug', `deleteProductById params = ${JSON.stringify(params)}`, CallPointInfo());
            const deleteCommand = new DeleteCommand(params);
            AppLogger.emit('debug', `deleteProductById deleteCommand = ${JSON.stringify(deleteCommand)}`, CallPointInfo());
            const opRes = await this.docClient.send(deleteCommand);
            AppLogger.emit('debug', `opRes - ${opRes}`, CallPointInfo());
            if (opRes.$metadata.httpStatusCode === 200) {
                AppLogger.emit('debug', `DynamoDB operation Passed with : ${opRes.$metadata.httpStatusCode}`, CallPointInfo());
                return opRes;
            } else {
                AppLogger.emit('error', `DynamoDB operation FAILEd with : ${opRes.$metadata.httpStatusCode}, Failed to delete Product`, CallPointInfo());
                throw new Error('Failed to delete Product'); // Or handle specific errors
            }
        });
    }
}
forMethods(ProductRepository);

export default ProductRepository;
