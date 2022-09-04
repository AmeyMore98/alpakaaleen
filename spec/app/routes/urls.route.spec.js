const urlJoin = require("urljoin");

const UrlsModel = require("../../../app/models/urls.model");
const { getCurrentEpochInSecs } = require("../../../app/utils/datetime.utils");
const config = require("../../../config");

const request = require("../../utils/request");

describe("POST /urls", () => {
    const endpoint = "/urls";

    it("should create a short URL", async () => {
        const body = {
            url: "https://www.google.com",
        };

        const res = await request.post(endpoint).send(body);

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            _id: jasmine.any(Number),
            createdAt: jasmine.any(Number),
            updatedAt: jasmine.any(Number),
            slug: jasmine.any(String),
            url: body.url,
            shortUrl: urlJoin(config.domain, res.body.slug),
            expiresAt: jasmine.any(Number),
        });
        expect(Math.round(res.body.expiresAt - getCurrentEpochInSecs())).toBe(
            UrlsModel.DEFAULT_EXPIRY_SECONDS
        );
    });

    it("should return 422 for invalid URL", async () => {
        const body = {
            url: "http://abcd",
        };

        const res = await request.post(endpoint).send(body);

        expect(res.status).toBe(422);
    });

    it("should return 422 for invalid slug - non-slug", async () => {
        const body = {
            url: "www.google.com",
            slug: "&as*",
        };

        const res = await request.post(endpoint).send(body);

        expect(res.status).toBe(422);
    });

    it("should return 422 for invalid slug - greater than 10 chars", async () => {
        const body = {
            url: "www.google.com",
            slug: "1234567890a",
        };

        const res = await request.post(endpoint).send(body);

        expect(res.status).toBe(422);
    });

    it("should return 422 for invalid expiresAt", async () => {
        const body = {
            url: "www.google.com",
            expiresAt: "2022-09-10",
        };

        const res = await request.post(endpoint).send(body);

        expect(res.status).toBe(422);
    });

    it("should add protocol to URL if missing", async () => {
        const body = {
            url: "www.google.com",
        };

        const res = await request.post(endpoint).send(body);

        expect(res.status).toBe(200);
        expect(res.body.url).toBe("http://www.google.com");
    });
});
