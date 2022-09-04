const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const config = require("../config");
const router = require("./routes");

const app = express();

app.use(morgan("common"));

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

app.use(bodyParser.json());

app.use(router);

app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.statusCode = 404;
    next(err);
});

app.use(function onError(err, req, res, next) {
    err = err || {};
    const error = {
        message: err.errors || err.message || String(err),
        name: err.name || "UnknownError",
        meta: err.meta,
    };
    const status = err.statusCode || 500;

    if (config.env !== "production") {
        error.stack = err.stack;
    }

    if (status === 500) {
        console.log(err);
    }

    res.status(status).json(error);
});

module.exports = app;
