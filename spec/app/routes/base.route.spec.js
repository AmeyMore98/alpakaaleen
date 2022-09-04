const request = require("../../utils/request");
const UrlsModel = require("../../../app/models/urls.model");

describe("GET /:slug", () => {
    let shortUrlItem;
    beforeEach(async () => {
        shortUrlItem = await UrlsModel.addShortUrl("www.google.com");
    });

    afterEach(async () => {
        await UrlsModel.query().delete().where({});
    });

    it("should redirect to original URL", async () => {
        const res = await request.get(`/${shortUrlItem.slug}`);

        expect(res.status).toBe(301);
        expect(res.headers.location).toBe("www.google.com");
    });

    it("should return 404 if slug doesn't exist", async () => {
        const res = await request.get(`/abcdef`);

        expect(res.status).toBe(404);
    });

    it("should return 410 if short URL has expired", async () => {
        // Set expiresAt to 25h back
        await shortUrlItem.$query().patch({
            expiresAt: shortUrlItem.expiresAt - 25 * 60 * 60,
        });

        const res = await request.get(`/${shortUrlItem.slug}`);

        expect(res.status).toBe(410);
    });
});
