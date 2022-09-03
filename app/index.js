const express = require("express");
const morgan = require("morgan");
const config = require("../config");

const app = express();

app.use(morgan(config.env === "dev" ? "dev" : "common"));

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`);
});

module.exports = app;
