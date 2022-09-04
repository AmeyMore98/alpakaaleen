const { body } = require("express-validator");
const { createShortURL } = require("../handlers/urls.handler");
const { validate } = require("../middlewares/validation.middleware");

const urlsRouter = require("express").Router();

const RESERVED_SLUGS = ["urls", "URLS"];

urlsRouter.post(
    "",
    body("url")
        .isURL()
        .withMessage("Must be a valid URL")
        .customSanitizer((value) => {
            if (!value.startsWith("http")) {
                value = "http://" + value;
            }
            return value;
        }),
    body("slug")
        .optional()
        .matches(/^[a-zA-Z0-9]*$/)
        .bail()
        .withMessage("Must be a slug")
        .isLength({
            max: 10,
        })
        .bail()
        .withMessage("Must be less than 10 characters long")
        .not()
        .isIn([RESERVED_SLUGS])
        .withMessage(`${RESERVED_SLUGS.join(",")} are reserved keywords`),
    body("expiresAt")
        .optional()
        .isDate({ format: "YYYY-MM-DDTHH:mm:ss.sssZ" })
        .withMessage("Must be a valid Date"),
    validate,
    createShortURL
);
module.exports = urlsRouter;
