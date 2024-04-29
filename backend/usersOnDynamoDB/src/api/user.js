import UserService from '../services/user-service.js';
import { customLogger } from "../utils/custom-logger.js"

const users = (app, channel) => {
    const userService = new UserService();
    app.post("/create", async (req, res, next) => {
        customLogger('/user/create called');
        const { name, desc, type, unit, price, available, supplier, banner } =
            req.body;
        // validation
        const { data } = await userService.createUser({ name, desc, type, unit, price, available, supplier, banner });
        return res.json(data);
    });

    app.post("/delete", async (req, res, next) => {
        customLogger('/user/delete called');
        const { name, desc, type, unit, price, available, supplier, banner } =
            req.body;
        // validation
        const { data } = await userService.deleteUserById({ name, desc, type, unit, price, available, supplier, banner });
        return res.json(data);
    });

    app.post("/update", async (req, res, next) => {
        customLogger('/user/update called');
        const { name, desc, type, unit, price, available, supplier, banner } =
            req.body;
        // validation
        const { data } = await userService.updateUserById({ name, desc, type, unit, price, available, supplier, banner });
        return res.json(data);
    });

    app.get("/:id", async (req, res, next) => {
        customLogger('/user/:id');
        const productId = req.params.id;

        try {
            const { data } = await userService.GetUserById(productId);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    });

    //get Top products and category
    app.get("/", async (req, res, next) => {
        customLogger('/user/ called');
        //check validation
        try {
            const { data } = await userService.GetUsers(req);
            customLogger(data);
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(404).json({ error });
        }
    });
};

export { users }







