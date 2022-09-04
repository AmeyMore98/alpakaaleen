const asyncHandler = require("express-async-handler");
const UrlsModel = require("../models/urls.model");

exports.createShortURL = asyncHandler(async (req, res) => {
    const { slug, url, expiresAt } = req.body;

    const item = await UrlsModel.addUrl(slug, url, expiresAt);

    return res.json(item);
});
