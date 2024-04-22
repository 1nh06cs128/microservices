import ProductRepository from "../database/repository/product-repo.js"

import { FormateData } from "../utils/index.js"
import docClient from '../database/doc-client.js'
import { AppLogger, CallPointInfo, forMethods } from "../../../../others/advanceLog.js"

// All Business logic will be here
class ProductService {

    constructor() {
        AppLogger.emit('info', `Product Service Constructor`, CallPointInfo());
        this.productRepository = new ProductRepository(docClient);
    }

    async CreateProduct(product) {
        AppLogger.emit('debug', `ProductService CreateProduct`, CallPointInfo(), 'cyan');
        const productResult = await this.productRepository.createProduct('products', product);
        return FormateData(productResult);
    }

    async GetProducts() {
        AppLogger.emit('debug', `ProductService GetProducts`, CallPointInfo());
        const products = await this.productRepository.getAllProducts('products');
        AppLogger.emit('debug', `ProductService GetProducts Product Items - \n${JSON.stringify(products)}`, CallPointInfo());
        return FormateData(products);
    }

    async GetProductById(productId) {
        AppLogger.emit('debug', `ProductService GetProductById`, CallPointInfo());
        const product = await this.productRepository.getProductById('products', productId);
        return FormateData(product)
    }

    async UpdateProductById(productId) {
        AppLogger.emit('debug', `ProductService UpdateProductById`, CallPointInfo());
        const product = await this.productRepository.updateProductById('products', productId);
        return FormateData(product)
    }

    async DeleteProductById(productId) {
        AppLogger.emit('debug', `ProductService DeleteProductById - ${productId}`, CallPointInfo());
        const product = await this.productRepository.deleteProductById('products', productId);
        return FormateData(product)
    }

}

forMethods(ProductService);

export default ProductService;