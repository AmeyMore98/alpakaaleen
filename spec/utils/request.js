const supertest = require("supertest");
let app = require("../../app");

const request = supertest(app);

module.exports = request;
