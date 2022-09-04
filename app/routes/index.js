const router = require("express").Router();
const urlsRouter = require("./urls.route");

router.use("/urls", urlsRouter);

module.exports = router;
