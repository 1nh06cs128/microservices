
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import axios from "axios"
import amqplib from "amqplib"

import { customLogger } from "./custom-logger.js"

import {
    USER_CONFIG,
    // BASE_URL,
    // EXCHANGE_NAME,
    // MSG_QUEUE_URL
} from "../config/index.js";

//Utility functions
const GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

const GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

const ValidatePassword = async (
    enteredPassword,
    savedPassword,
    salt
) => {
    return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

const GenerateSignature = async (payload) => {
    try {
        return await jwt.sign(payload, USER_CONFIG.APP_SECRET, { expiresIn: "30d" });
    } catch (error) {
        customLogger(error);
        return error;
    }
};

// const ValidateSignature = async (req) => {
//     try {
//         const signature = req.get("Authorization");
//         customLogger(signature);
//         const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
//         req.user = payload;
//         return true;
//     } catch (error) {
//         customLogger(error);
//         return false;
//     }
// };

const FormateData = (data) => {
    customLogger('FormateData');
    if (data) {
        return { data };
    } else {
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
    try {
        const connection = await amqplib.connect(USER_CONFIG.MSG_QUEUE_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(USER_CONFIG.EXCHANGE_NAME, "direct", { durable: true });
        return channel;
    } catch (err) {
        throw err;
    }
};

// const PublishMessage = (channel, service, msg) => {
//     channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
//     customLogger("Sent: ", msg);
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
    GenerateSignature,
    FormateData,
    CreateChannel
}
