"use strict";

const conf = require("../../config");
const knex_configuration = require("../../db/knexfile");

const DB = require("knex")(knex_configuration);

if (conf.env === "dev") {
    DB.on("query", (data) => {
        let query = data.sql;
        if (data.bindings) {
            data.bindings.forEach((binding, i) => {
                query = query.replace("$" + (i + 1), binding);
            });
            console.log(`[QUERY] ${query}`);
        }
    });
}

function disconnect() {
    DB.destroy((err) => {
        err && console.log(err);
    });
}

module.exports = {
    DB,
    disconnect,
};
