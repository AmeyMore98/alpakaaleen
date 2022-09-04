const router = require("express").Router();
const baseRouter = require("./base.route");
const urlsRouter = require("./urls.route");

router.use("/urls", urlsRouter);
router.use("/", baseRouter);

module.exports = router;
