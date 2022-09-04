const { DB } = require("../app/common/postgres.init");

beforeAll(async () => {
    await DB.migrate.rollback();
    await DB.migrate.latest();
});

afterAll(async () => {
    await DB.migrate.latest();
});
