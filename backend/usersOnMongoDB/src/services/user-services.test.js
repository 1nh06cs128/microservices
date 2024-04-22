// // Sample Test Case
// describe("ProductService", () => {
//     // Which function
//     describe("CreateProduct", () => {
//         // Which Scenario we are testing
//         test("validate user inputs", () => { });
//         test("Validate response", async () => { });
//     });
// });

const ProductService = require('./ProductService');
const { ProductRepository } = require('../database');
const { FormateData } = require('../utils');

jest.mock('../database/ProductRepository');
jest.mock('../utils');

describe('ProductService', () => {
    let productService;

    beforeEach(() => {
        productService = new ProductService();
    });

    describe('CreateProduct', () => {
        it('should create a product', async () => {
            // Mock data
            const productInputs = { name: 'Test Product', price: 10 };
            const mockProductResult = { id: 1, ...productInputs };

            // Mock ProductRepository behavior
            ProductRepository.prototype.CreateProduct.mockResolvedValue(mockProductResult);

            // Call the method
            const result = await productService.CreateProduct(productInputs);

            // Assertion
            expect(ProductRepository.prototype.CreateProduct).toHaveBeenCalledWith(productInputs);
            expect(FormateData).toHaveBeenCalledWith(mockProductResult);
            expect(result).toEqual(mockProductResult);
        });
    });

    describe('GetProducts', () => {
        it('should get products with categories', async () => {
            // Mock data
            const mockProducts = [{ id: 1, name: 'Product 1', type: 'Type1' }, { id: 2, name: 'Product 2', type: 'Type2' }];

            // Mock ProductRepository behavior
            ProductRepository.prototype.Products.mockResolvedValue(mockProducts);

            // Call the method
            const result = await productService.GetProducts();

            // Assertion
            expect(ProductRepository.prototype.Products).toHaveBeenCalled();
            expect(FormateData).toHaveBeenCalledWith({
                products: mockProducts,
                categories: ['Type1', 'Type2']
            });
            expect(result).toEqual({
                products: mockProducts,
                categories: ['Type1', 'Type2']
            });
        });
    });

    describe('GetProductDescription', () => {
        it('should get product description by id', async () => {
            // Mock data
            const productId = 1;
            const mockProduct = { id: productId, name: 'Test Product', description: 'Description' };

            // Mock ProductRepository behavior
            ProductRepository.prototype.FindById.mockResolvedValue(mockProduct);

            // Call the method
            const result = await productService.GetProductDescription(productId);

            // Assertion
            expect(ProductRepository.prototype.FindById).toHaveBeenCalledWith(productId);
            expect(FormateData).toHaveBeenCalledWith(mockProduct);
            expect(result).toEqual(mockProduct);
        });

        it('should return error if product not found', async () => {
            // Mock data
            const productId = 1;

            // Mock ProductRepository behavior
            ProductRepository.prototype.FindById.mockResolvedValue(null);

            // Call the method
            const result = await productService.GetProductDescription(productId);

            // Assertion
            expect(ProductRepository.prototype.FindById).toHaveBeenCalledWith(productId);
            expect(FormateData).toHaveBeenCalledWith({ error: 'No product Available' });
            expect(result).toEqual({ error: 'No product Available' });
        });
    });

    // Add more test cases for other methods...
});
