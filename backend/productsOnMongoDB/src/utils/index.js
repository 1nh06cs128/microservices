
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import axios from "axios"
import amqplib from "amqplib"

import {
    USER_CONFIG,
    // BASE_URL,
    // EXCHANGE_NAME,
    // MSG_QUEUE_URL
} from "../config/index.js";
import { AppLogger, CallPointInfo } from "../../../../others/advanceLog.js"

//Utility functions
const GenerateSalt = async () => {
    AppLogger.emit('debug', 'GenerateSalt', CallPointInfo());
    return await bcrypt.genSalt();
};

const GeneratePassword = async (password, salt) => {
    AppLogger.emit('debug', 'GeneratePassword', CallPointInfo());
    return await bcrypt.hash(password, salt);
};

const ValidatePassword = async (
    enteredPassword,
    savedPassword,
    salt
) => {
    AppLogger.emit('debug', 'ValidatePassword', CallPointInfo());
    return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

const GenerateSignature = async (payload) => {
    AppLogger.emit('debug', 'GenerateSignature', CallPointInfo());
    try {
        return await jwt.sign(payload, USER_CONFIG.APP_SECRET, { expiresIn: "30d" });
    } catch (error) {
        AppLogger.emit('error', `GenerateSignature - error:- \n${error}`, CallPointInfo());
        return error;
    }
};

const ValidateSignature = async (req) => {
    try {
        const signature = req.get("Authorization");
        const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
        req.user = payload;
        AppLogger.emit('debug', 'ValidateSignature returning TRUE', CallPointInfo());
        return true;
    } catch (error) {
        AppLogger.emit('error', `ValidateSignature retuning FALSE | error:- \n${error}`, CallPointInfo());
        return false;
    }
};

const FormateData = (data) => {
    AppLogger.emit('debug', `FormateData called for - ${JSON.stringify(data)}`, CallPointInfo(), 'yellow');
    if (data) {
        return { data };
    } else {
        AppLogger.emit('error', `Data Not found Error on FormateData - ${JSON.stringify(data)}`, CallPointInfo());
        throw new Error("Data Not found!");
    }
};

//Raise Events
// const PublishCustomerEvent = async (payload) => {
// axios.post("http://customer:8001/app-events/", {
//     payload,
// });

//     axios.post(`${BASE_URL}/customer/app-events/`,{
//         payload
//     });
// };

// const PublishShoppingEvent = async (payload) => {
// axios.post('http://gateway:8000/shopping/app-events/',{
//         payload
// });

// axios.post(`http://shopping:8003/app-events/`, {
//     payload,
// });
// };

//Message Broker

const CreateChannel = async () => {
    AppLogger.emit('debug', `CreateChannel`, CallPointInfo());
    try {
        const connection = await amqplib.connect(USER_CONFIG.MSG_QUEUE_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(USER_CONFIG.EXCHANGE_NAME, "direct", { durable: true });
        return channel;
    } catch (error) {
        AppLogger.emit('error', `CreateChannel Error - ${error}`, CallPointInfo());
        // throw new Error(error);
        return {};
    }
};

// const PublishMessage = (channel, service, msg) => {
//     channel.publish(EXCHANGE_NAME, service, Buffer.from(msg))
// };

// export {
//     GenerateSalt,
//     GeneratePassword,
//     ValidatePassword,
//     GenerateSignature,
//     ValidateSignature,
//     FormateData,
//     PublishCustomerEvent,
//     PublishShoppingEvent,
//     CreateChannel,
//     PublishMessage
// }

export {
    GenerateSalt,
    GeneratePassword,
    ValidatePassword,
    ValidateSignature,
    GenerateSignature,
    FormateData,
    CreateChannel
}
