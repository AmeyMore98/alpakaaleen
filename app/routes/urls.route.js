const { body } = require("express-validator");
const { createShortURL } = require("../handlers/urls.handler");
const { validate } = require("../middlewares/validation.middleware");

const router = require("express").Router();

router.post(
    "",
    body("url").isURL().withMessage("Must be a valid URL"),
    body("slug")
        .optional()
        .matches(/^[a-zA-Z0-9]*$/)
        .bail()
        .withMessage("Must be a slug")
        .isLength({
            max: 10,
        })
        .withMessage("Must be less than 10 characters long"),
    body("expiresAt")
        .optional()
        .isDate({ format: "YYYY-MM-DDTHH:mm:ss.sssZ" })
        .withMessage("Must be a valid Date"),
    validate,
    createShortURL
);
module.exports = router;
