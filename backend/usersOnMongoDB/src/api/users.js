const { CUSTOMER_SERVICE, SHOPPING_SERVICE } = require("../config");

const UserService = require("../services/user-services");
const {
    // PublishCustomerEvent,
    // PublishShoppingEvent,
    // PublishMessage,
} = require("..");
const UserAuth = require("./middleware/auth");
// const { Logger } = require("../utils/customLogger");
const { AppLogger, CallPointInfo } = require('../../../../others/advanceLog');

module.exports = (app, channel) => {
    const service = new UserService();

    app.post("/login", async (req, res, next) => {
        try {
            AppLogger.emit('debug', `/user/login called`, CallPointInfo());
            const { username, password } = req.body;
            const { data } = await service.CheckUser({ username, password });
            AppLogger.emit('debug', `Check User Data - ${JSON.stringify(data)}`, CallPointInfo());
            if (data && data.error) {
                // from the operation up float the internal response
                // trigger Error from 1 point for better debugging
                // below line triggers the catch block here.
                AppLogger.emit('error', `Check User Data Error at /login Call - ${JSON.stringify(data.error)}`, CallPointInfo());
                throw new Error(data.message);
            }
            return res.status(200).json({
                success: true,
                data: {
                    message: 'User Found successfully',
                    internal_id: data._id
                }
            });
        } catch (error) {
            // Log specific properties of the error object
            AppLogger.emit('error', `No Such User - ${error.stack}`, CallPointInfo());
            return res.status(400).json({
                error: true,
                type: error.type,
                message: error.message,
            });
        }
    });

    app.post("/create", async (req, res, next) => {
        try {
            AppLogger.emit('debug', `/user/create called`, CallPointInfo());
            const { firstName, middleName, lastName, email, username, password } = req.body;
            const { data } = await service.CreateUser({ firstName, middleName, lastName, email, username, password });
            if (data && data.error) {
                // from the operation up float the internal response
                // trigger Error from 1 point for better debugging
                // below line triggers the catch block here.
                throw new Error(data.message);
            }
            return res.status(200).json({
                success: true,
                data: {
                    message: 'User created successfully',
                    internal_id: data._id
                }
            });
            // return res;
        } catch (error) {
            // Log specific properties of the error object
            AppLogger.emit('error', `Error Object:- ${error.message}`, CallPointInfo());
            AppLogger.emit('error', `Errored at service.CreateUser:-  ${error.stack}`, CallPointInfo());
            return res.status(400).json({
                error: true,
                type: error.type,
                message: error.message,
            });
        }
    });

    app.post("/delete", async (req, res, next) => {
        AppLogger.emit('debug', `/user/delete called`, CallPointInfo());
        const { firstName, middleName, lastName, email, username, password } = req.body;
        // validation
        const { data } = await service.CreateUser({ firstName, middleName, lastName, email, username, password });
        return res.json(data);
    });

    app.post("/update", async (req, res, next) => {
        AppLogger.emit('debug', `/user/update called`, CallPointInfo());
        const { firstName, middleName, lastName, email, username, password } = req.body;
        // validation
        const { data } = await service.CreateUser({ firstName, middleName, lastName, email, username, password });
        return res.json(data);
    });

    app.get("/category/:type", async (req, res, next) => {
        const type = req.params.type;

        try {
            const { data } = await service.GetUsersByCategory(type);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    });

    app.get("/:id", async (req, res, next) => {
        const userId = req.params.id;

        try {
            const { data } = await service.GetUserDescription(userId);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    });

    app.post("/ids", async (req, res, next) => {
        const { ids } = req.body;
        const users = await service.GetSelectedusers(ids);
        return res.status(200).json(users);
    });

    app.put("/wishlist", UserAuth, async (req, res, next) => {
        const { _id } = req.user;

        const { data } = await service.GetUserPayload(
            _id,
            { userId: req.body._id },
            "ADD_TO_WISHLIST"
        );

        // PublishCustomerEvent(data);
        // PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(data));

        res.status(200).json(data.data.user);
    });

    app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const userId = req.params.id;

        const { data } = await service.GetUserPayload(
            _id,
            { userId },
            "REMOVE_FROM_WISHLIST"
        );
        // PublishCustomerEvent(data);
        // PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(data));

        res.status(200).json(data.data.user);
    });

    app.put("/cart", UserAuth, async (req, res, next) => {
        const { _id } = req.user;

        const { data } = await service.GetUserPayload(
            _id,
            { userId: req.body._id, qty: req.body.qty },
            "ADD_TO_CART"
        );

        // PublishCustomerEvent(data);
        // PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(data));

        // PublishShoppingEvent(data);
        // PublishMessage(channel, SHOPPING_SERVICE, JSON.stringify(data));

        const response = { user: data.data.user, unit: data.data.qty };

        res.status(200).json(response);
    });

    app.delete("/cart/:id", UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const userId = req.params.id;

        const { data } = await service.GetUserPayload(
            _id,
            { userId },
            "REMOVE_FROM_CART"
        );

        // PublishCustomerEvent(data);
        // PublishMessage(channel, CUSTOMER_SERVICE, JSON.stringify(data));

        // PublishShoppingEvent(data);
        // PublishMessage(channel, SHOPPING_SERVICE, JSON.stringify(data));

        const response = { user: data.data.user, unit: data.data.qty };

        res.status(200).json(response);
    });

    app.get("/whoami", (req, res, next) => {
        return res
            .status(200)
            .json({ msg: "/ or /users : I am users Service" });
    });

    //get Top users and category
    app.get("/", async (req, res, next) => {
        AppLogger.emit('debug', `/ called`, CallPointInfo());
        //check validation
        try {
            const { data } = await service.GetUsers();
            return res.status(200).json(data);
        } catch (error) {
            AppLogger.emit('error', `/ called. Error occurred = ${error}`, CallPointInfo());
            return res.status(404).json({ error });
        }
    });
};