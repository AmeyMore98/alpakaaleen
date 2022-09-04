const convict = require("convict");
const _ = require("lodash");

const config = convict({
    env: {
        doc: "env",
        format: String,
        default: "dev",
        env: "ENV",
    },
    port: {
        doc: "port",
        format: Number,
        default: 9090,
        env: "PORT",
    },
    domain: {
        doc: "domain",
        format: String,
        default: "http://alpa.kaaleen",
    },
    postgres: {
        doc: "postgres connection string",
        format: String,
        default: "postgresql://root@localhost:5432/alpakaaleen",
        env: "POSTGRES",
    },
});

config.validate({
    allowed: "strict",
});

_.extend(config, config.get());

module.exports = config;
