import ProductRepository from "../database/repository/product-repo.js"
import { ProductsModel } from '../database/models/index.js'; // Import Dynamoose model for products
import { FormateData } from "../utils/index.js";
import { AppLogger, CallPointInfo, forMethods } from "../../../../others/advanceLog.js";

class ProductService {

    constructor() {
        AppLogger.emit('info', `Product Service Constructor - ProductsModel - ${ProductsModel}`, CallPointInfo());
        // Initialize ProductRepository with Dynamoose model
        this.productRepository = new ProductRepository(ProductsModel);
    }

    async CreateProduct(product) {
        AppLogger.emit('debug', `ProductService CreateProduct`, CallPointInfo(), 'cyan');
        const productResult = await this.productRepository.createProduct(product);
        return FormateData(productResult);
    }

    async GetProducts() {
        AppLogger.emit('debug', `ProductService GetProducts`, CallPointInfo());
        const products = await this.productRepository.getAllProducts();
        AppLogger.emit('debug', `ProductService GetProducts Product Items - \n${JSON.stringify(products)}`, CallPointInfo());
        return FormateData(products);
    }

    async GetProductById(productId, productName) {
        AppLogger.emit('debug', `ProductService GetProductById - ${productId}`, CallPointInfo());
        const product = await this.productRepository.getProductById(productId, productName);
        return FormateData(product);
    }

    async UpdateProductById(productId, updatedProduct) {
        AppLogger.emit('debug', `ProductService UpdateProductById - ${productId}`, CallPointInfo());
        const product = await this.productRepository.updateProductById(productId, updatedProduct);
        return FormateData(product);
    }

    async DeleteProductById(productId, productName) {
        AppLogger.emit('debug', `ProductService DeleteProductById - ${productId}`, CallPointInfo());
        const product = await this.productRepository.deleteProductById(productId, productName);
        return FormateData(product);
    }
}

forMethods(ProductService);

export default ProductService;
