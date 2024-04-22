const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const { AppLogger, CallPointInfo } = require('../../others/advanceLog');

const app = express();

/**
  * Cross-Origin Resource Sharing or CORS is a mechanism that allows restricted resources
  * (e.g., fonts, JavaScript, etc.) on a web page to be requested from another domain outside the domain
  * from which the resource originated.
  *
  * This is a security feature implemented by web browsers to prevent cross-origin HTTP requests from being
  * executed unless the server explicitly allows them.
  *
  * When you use app.use(cors()), it enables Cross-Origin Resource Sharing for your Express.js application,
  * allowing it to accept requests from domains other than its own domain.
  */
AppLogger.emit('info', 'Using CORS', CallPointInfo());
app.use(cors());

/**
  * express.json() is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
  * This middleware is responsible for parsing incoming requests with JSON payloads and populating the req.body
  * property with the parsed data. It's essential for handling JSON data sent from clients in POST, PUT, PATCH,
  * and other HTTP methods.
  *
  * When you use app.use(express.json()), it sets up the middleware in your Express.js application to automatically
  * parse incoming JSON requests.

  * When you use app.use(cors()), it enables Cross-Origin Resource Sharing for your Express.js application,
  * allowing it to accept requests from domains other than its own domain.
  */
AppLogger.emit('info', 'Using Express', CallPointInfo());
app.use(express.json());

app.use((req, res, next) => {
    let message = `Request: ${req.method} ${req.originalUrl}`;
    AppLogger.emit('info', message, CallPointInfo());
    next();
});

// app.use("/user", proxy("http://localhost:7001"));
// app.use("/products", proxy("http://localhost:7002"));

app.use("/products", proxy("http://localhost:7001"));

app.use("/user", proxy("http://localhost:7007"));


app.listen(8000, () => {
    AppLogger.emit('debug', 'Gateway is Listening to Port 8000', CallPointInfo());
    // console.log("Gateway is Listening to Port 8000");
});