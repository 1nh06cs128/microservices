// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const { users, appEvents } = require("./api");

// const { CreateChannel } = require("./utils");

import express from "express"
import cors from "cors"
import path from "path"
// import { users, appEvents } from "./api/index.js"
import { products } from "./api/index.js"

import { CreateChannel } from "./utils/index.js"
import { AppLogger, CallPointInfo } from "../../../others/advanceLog.js"


const expressApp = async (app) => {
    // customLogger('expressApp');
    AppLogger.emit('debug', 'ExpressApp', CallPointInfo());
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    app.use(express.json());
    app.use(cors());
    // app.use(express.static(__dirname + "/public"));
    app.use(express.static(path.join(__dirname, 'public')));
    //api
    // appEvents(app);

    const channel = await CreateChannel();
    products(app, channel);
    // error handling
};

export { expressApp }
