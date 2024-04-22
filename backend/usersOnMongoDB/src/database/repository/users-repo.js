const mongoose = require('mongoose');
const { UserModel } = require("../models");
const Logger = require('../../utils/customLogger');
// const bcrypt = require('bcrypt');

// const { forMethods } = require('../../utils/performance-tracker.js');
const { AppLogger, CallPointInfo, forMethods } = require('../../../../../others/advanceLog.js');
// const { forMethods } = require('../../../../../others/performance-tracker');

//Dealing with data base operations
class UserRepository {

    async existingUser({ email, username }) {
        AppLogger.emit('debug', `Existing User Check Input: \n\tEmail:${email}\n\Username:${username}`, CallPointInfo());
        const existingUser = await UserModel.findOne({
            $and: [{ email: email }, { username: username }]
        });
        AppLogger.emit('debug', `Existing User Check Output: ${existingUser}`, CallPointInfo());
        return existingUser ? { user_exist: true, data: existingUser } : { user_exist: false };
    }

    async CheckUser({ username }) {
        AppLogger.emit('debug', `Existing User Check Input: ${username}`, CallPointInfo());
        const existingUser = await UserModel.findOne({ username });
        AppLogger.emit('debug', `Existing User Check Output: ${existingUser}`, CallPointInfo());
        // Logger(existingUser);
        if (existingUser) {
            return {
                success: true,
                message: `username '${username}' combination is registered with us`,
                data: existingUser
            };
        }
    }

    async CreateUser({ firstName, middleName, lastName, email, username, password }) {
        const existingUser = await this.existingUser({ email, username });
        Logger(`Does email '${email}' and username '${username}' combination already exist?:- `, existingUser.user_exist);

        if (existingUser.user_exist) {
            // throwing error will break the API to not send (from BE) / receive (at FE) any response from this point.
            // throw new Error(`email '${email}' and username '${username}' combination is already registered.`);

            // using a custom error message will push the status up in call chain.
            return {
                error: true,
                message: `email '${email}' and username '${username}' combination is already registered.`
            };
        }

        try {
            Logger('Try Block');
            //  encrypt password before saving
            // const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds
            // Logger(hashedPassword);
            const userModel = new UserModel({
                // firstName, middleName, lastName, email, username, password: hashedPassword
                firstName, middleName, lastName, email, username, password
            })
            const user = await userModel.save();
            // Logger(user);
            return user;
        } catch (error) {
            Logger('Catch Block', error.message);
            error.ok = false;
            return error;
        }
    }

    async Users() {
        Logger('Users');
        try {
            const users = await UserModel.find();
            Logger("Fetched users:", users);
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error; // Rethrow the error for further investigation
        }
    }

    async FindById(id) {
        Logger('FindById');
        return await UserModel.findById(id);
    }

    async FindByCategory(category) {
        Logger('FindByCategory');
        const users = await UserModel.find({ type: category });
        return users;
    }

    async FindSelectedUsers(selectedIds) {
        Logger('FindSelectedProducts');
        const users = await UserModel.find().where('_id').in(selectedIds.map(_id => _id)).exec();
        return users;
    }
}

forMethods(UserRepository);

module.exports = UserRepository;



