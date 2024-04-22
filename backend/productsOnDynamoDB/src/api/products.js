import { AppLogger, CallPointInfo } from '../../../../others/advanceLog.js';
import ProductService from '../services/product-service.js';

const products = (app, channel) => {
    const productService = new ProductService();
    app.post("/create", async (req, res, next) => {
        AppLogger.emit('debug', '/products/create called', CallPointInfo(), 'cyan');
        AppLogger.emit('debug', `req.body - ${JSON.stringify(req.body)}`, CallPointInfo(), 'cyan');

        const { id, name, description, price, category } = req.body;
        // validation
        const { data } = await productService.CreateProduct({ id, name, description, price, category });
        AppLogger.emit('debug', `Data - ${JSON.stringify(data)}`, CallPointInfo(), 'cyan');
        return res.json(data);
    });

    app.delete("/delete/:id", async (req, res, next) => {
        AppLogger.emit('debug', '/products/delete called', CallPointInfo());
        const productId = req.params.id;
        // validation
        AppLogger.emit('debug', `productId - ${productId}`, CallPointInfo(), 'cyan');
        const { data } = await productService.DeleteProductById(productId);
        AppLogger.emit('debug', JSON.stringify(data), CallPointInfo());
        return res.json(data);
    });

    app.put("/update/:id", async (req, res, next) => {
        AppLogger.emit('debug', '/products/update called', CallPointInfo());
        const productId = req.params.id;
        const { name, description, price, category } = req.body;
        // validation
        const { data } = await productService.UpdateProductById(productId, { name, description, price, category });
        AppLogger.emit('debug', data, CallPointInfo());
        return res.json(data);
    });

    app.get("/:id", async (req, res, next) => {
        const productId = req.params.id;
        AppLogger.emit('debug', `/products/:id - ${productId}`, CallPointInfo(), 'yellow');

        try {
            const { data } = await productService.GetProductById(productId);
            AppLogger.emit('debug', data, CallPointInfo(), 'yellow');
            return res.status(200).json(data);
        } catch (error) {
            AppLogger.emit('error', error, CallPointInfo());
            return res.status(404).json({ error });
        }
    });

    //get Top products and category
    app.get("/", async (req, res, next) => {
        AppLogger.emit('debug', '/products/ called', CallPointInfo());
        //check validation
        try {
            const { data } = await productService.GetProducts(req);
            AppLogger.emit('debug', `userService.GetProducts(req) response :- ${JSON.stringify(data)}`, CallPointInfo());
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            AppLogger.emit('error', error, CallPointInfo());
            return res.status(404).json({ error });
        }
    });
};

export { products }







