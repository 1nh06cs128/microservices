import { AppLogger, CallPointInfo, forMethods } from "../../../../../others/advanceLog.js";
import ProductsModel from '../models/Products.model.js';

class ProductRepository {

    async preFunc(data) {
        // Custom logic before saving
        // AppLogger.emit('debug', `Pre-Save Triggered on ProductSchema - ${data}`, CallPointInfo(), 'green');
    }

    // Function to perform post-save processing
    async postFunc(result) {
        // Custom logic after saving
        // AppLogger.emit('debug', `Post-Save Triggered on ProductSchema - ${result}`, CallPointInfo(), 'green');
    }

    constructor() {
        AppLogger.emit('info', `Product Repository Constructor`, CallPointInfo(), 'cyan');
    }

    async buildResponse(callback) {
        await this.preFunc(callback); // Execute pre-save processing
        let response = {};
        try {
            const opRes = await callback();
            AppLogger.emit('debug', `Try Block opRes - ${JSON.stringify(opRes)}`, CallPointInfo(), 'cyan');
            if (!opRes) {
                const code = 404,
                    errorMessage = this.getDynamoDBErrorMessage(code);
                response = {
                    statusCode: code,
                    message: errorMessage,
                    error: `DynamoDB operation error: ${code}`,
                };
                AppLogger.emit('error', `Unexpected error: ${error}`, CallPointInfo(), 'cyan');
            } else {
                const code = 200;
                AppLogger.emit('debug', `DynamoDB operation Passed with: ${code}`, CallPointInfo(), 'cyan');
                response = {
                    statusCode: code,
                    message: 'Operation successful',
                    data: opRes
                };
            }
        } catch (error) {
            AppLogger.emit('error', `Unexpected error: ${error}`, CallPointInfo(), 'cyan');
            const code = 500,
                errorMessage = this.getDynamoDBErrorMessage(code);
            response = {
                statusCode: code,
                message: `Failed to perform operation as an unexpected error occurred. ${JSON.stringify(errorMessage)}`,
                error: `DynamoDB operation error: ${code}`,
            };
        }
        AppLogger.emit('debug', `response - ${JSON.stringify(response)}`, CallPointInfo(), 'cyan');
        await this.postFunc(response); // Execute post-save processing
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

    async getAllProducts() {
        // AppLogger.emit('debug', `getAllProducts`, CallPointInfo(), 'cyan');
        return await this.buildResponse(async () => {
            const result = await ProductsModel.scan().exec();
            // AppLogger.emit('debug', `getAllProducts - ${result}`, CallPointInfo(), 'cyan');
            return result;
        });
    }

    async getProductById(id, name) {
        // AppLogger.emit('debug', `getProductById - ${id} and ${name}`, CallPointInfo(), 'cyan');
        try {
            const result = await this.buildResponse(async () => {
                // const existingProduct = await ProductsModel.get({id}) // does not work
                const existingProduct = await ProductsModel.scan('id').eq(id).exec().then((product) => {
                    if (product.length == 1) {
                        const { id, name, description, category, price } = product[0];
                        return { id, name, description, category, price };
                    }
                });
                return existingProduct;
            });
            return result;
        } catch (error) {
            AppLogger.emit('error', `Error fetching product by id: ${id}`, CallPointInfo());
            throw error;
        }
    }

    async createProduct(product) {
        AppLogger.emit('debug', `createProduct - ${JSON.stringify(product)}`, CallPointInfo(), 'cyan');
        try {
            const opRes = await this.buildResponse(async () => {
                try {
                    const result = await ProductsModel.create(product);
                    return result;
                } catch (error) {
                    return { success: false, message: error.message };
                }
            });
            return opRes;
        } catch (error) {
            AppLogger.emit('error', `Error fetching product by id: ${id}`, CallPointInfo());
            return { success: false, message: error.message };
        }
    }

    async updateProductById(id, name, updatedProduct) {
        AppLogger.emit('debug', `updateProductById - ${id} and ${name}`, CallPointInfo(), 'cyan');
        try {
            const opRes = await this.buildResponse(async () => {
                try {
                    const existingProduct = await ProductsModel.get({ id, name }, function (err, data) {
                        AppLogger.emit('debug', `updateProductById - ${err}`, CallPointInfo(), 'cyan');
                    });
                    if (existingProduct) {
                        const result = await ProductsModel.update(updatedProduct);
                        return result;
                    } else {
                        AppLogger.emit('error', `updateProductById - 'Product not found'`, CallPointInfo());
                        throw new Error('Product not found');
                    }
                } catch (error) {
                    AppLogger.emit('error', `Error fetching product by id: ${id}`, CallPointInfo());
                    return { success: false, message: error.message };
                }
            });
            return opRes;
        } catch (error) {
            AppLogger.emit('error', `Error fetching product by id: ${id}`, CallPointInfo());
            return { success: false, message: error.message };
        }
    }

    async deleteProductById(id, name) {
        AppLogger.emit('debug', `deleteProductById - - ${id} and ${name}`, CallPointInfo(), 'red');
        try {
            const opRes = await this.buildResponse(async () => {
                try {
                    const products = await ProductsModel.query('id').eq(id).exec();
                    AppLogger.emit('debug', `deleteProductById - ${JSON.stringify(products)}`, CallPointInfo(), 'red');

                    if (products && products.length === 1) {
                        const productToDelete = products[0];
                        AppLogger.emit('debug', `productToDelete - ${JSON.stringify(productToDelete)}`, CallPointInfo(), 'red');

                        await ProductsModel.delete({ id: productToDelete.id, name: productToDelete.name });
                        AppLogger.emit('debug', `Product deleted successfully`, CallPointInfo(), 'cyan');

                        return {
                            success: true,
                            message: `Product deleted successfully`,
                            product: productToDelete
                        };
                    } else {
                        AppLogger.emit('error', `deleteProductById - More than 1 Product not found`, CallPointInfo());
                        return {
                            success: false,
                            message: 'More than 1 Product not found'
                        };
                    }
                } catch (error) {
                    AppLogger.emit('error', `deleteProductById - Error deleting Product: - ${error}`, CallPointInfo());
                    return {
                        success: false,
                        message: error.message
                    };
                }
            });

            return opRes;
        } catch (error) {
            AppLogger.emit('error', `deleteProductById - ${error}`, CallPointInfo());
            return {
                success: false,
                message: error.message
            };
        }
    }

}

forMethods(ProductRepository);

export default ProductRepository;
