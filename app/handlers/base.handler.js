const expressAsyncHandler = require("express-async-handler");

const UrlsModel = require("../models/urls.model");
const { getCurrentEpochInSecs } = require("../utils/datetime.utils");

exports.redirectShortUrl = expressAsyncHandler(async (req, res) => {
    const { slug } = req.params;

    const result = await UrlsModel.getShortUrlBySlug(slug);
    if (!result) {
        return res.status(404).json({ message: "Not found" });
    }

    if (result.expiresAt < getCurrentEpochInSecs()) {
        return res.status(410).json({ message: "This URL has expired" });
    }

    const { url } = result;

    return res.redirect(301, url);
});
