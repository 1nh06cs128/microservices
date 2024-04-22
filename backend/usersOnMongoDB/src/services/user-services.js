const { UserRepository } = require("../database");
const { FormateData } = require("../utils");

// const { Logger } = require('../utils/customLogger')
const { AppLogger, CallPointInfo, forMethods } = require('../../../../others/advanceLog');

// const { forMethods } = require('../utils/performance-tracker.js');
// const { forMethods } = require('../../../../others/performance-tracker');
// All Business logic will be here
class UserService {

    constructor() {
        AppLogger.emit('debug', 'constructor', CallPointInfo());
        this.repository = new UserRepository();
    }

    async CheckUser(userInputs) {
        AppLogger.emit('debug', `CheckUser:- ${JSON.stringify(userInputs)}`, CallPointInfo());
        try {
            const userResult = await this.repository.CheckUser(userInputs)
            AppLogger.emit('debug', `User Result: ${JSON.stringify(userResult)}`, CallPointInfo());
            return FormateData(userResult);
        } catch (errors) {
            AppLogger.emit('error', `Errored at this.repository.CheckUser:- ${errors}`, CallPointInfo());
        }
    }

    async CreateUser(userInputs) {
        AppLogger.emit('debug', `CreateUser:- ${userInputs}`, CallPointInfo());
        try {
            const userResult = await this.repository.CreateUser(userInputs)
            AppLogger.emit('debug', `User Result: ${JSON.stringify(userResult)}`, CallPointInfo());
            return FormateData(userResult);
        } catch (errors) {
            AppLogger.emit('error', `Errored at this.repository.CreateUser:- ${errors}`, CallPointInfo());
        }
    }

    async GetUsers() {
        AppLogger.emit('debug', 'GetUsers', CallPointInfo());
        const users = await this.repository.Users();
        // let categories = {};

        // products.map(({ type }) => {
        //     categories[type] = type;
        // });

        // return FormateData({
        //     products,
        //     // categories: Object.keys(categories)
        // })
        return FormateData(users);
    }

    async GetUserDescription(productId) {
        AppLogger.emit('debug', 'GetUserDescription', CallPointInfo());
        const product = await this.repository.FindById(productId);
        return FormateData(product)
    }

    async GetUsersByCategory(category) {
        AppLogger.emit('debug', 'GetUsersByCategory', CallPointInfo());
        const products = await this.repository.FindByCategory(category);
        return FormateData(products)
    }

    async GetSelectedUsers(selectedIds) {
        AppLogger.emit('debug', 'GetSelectedUsers', CallPointInfo());
        const users = await this.repository.FindSelectedUsers(selectedIds);
        return FormateData(users);
    }

    // async GetUserPayload(userId, { productId, qty }, event) {
    //     AppLogger.'debug',emit('GetUserPayload', CallPointInfo());
    //     const product = await this.repository.FindById(productId);

    //     if (product) {
    //         const payload = {
    //             event: event,
    //             data: { userId, product, qty }
    //         };
    //         return FormateData(payload)
    //     } else {
    //         return FormateData({ error: 'No product Available' });
    //     }
    // }
}

forMethods(UserService);

module.exports = UserService;