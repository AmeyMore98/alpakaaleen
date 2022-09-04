const router = require("express").Router();
const baseRouter = require("./base.route");
const urlsRouter = require("./urls.route");

router.use("/", baseRouter);
router.use("/urls", urlsRouter);

module.exports = router;
