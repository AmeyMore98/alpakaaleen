const request = require("./utils/request");

describe("Service", () => {
    it("should be running", async () => {
        const res = await request.get("/ping");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("pong");
    });
});
