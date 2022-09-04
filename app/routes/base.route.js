const { redirectShortUrl } = require("../handlers/base.handler");

const baseRouter = require("express").Router();

baseRouter.get("/:slug([a-zA-Z0-9]{1,10})", redirectShortUrl);

module.exports = baseRouter;
