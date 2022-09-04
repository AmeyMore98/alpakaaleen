/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("urls", function (table) {
        table.increments("_id").primary();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
        table.string("slug", 10).notNullable();
        table.string("url", 2046).notNullable();
        table.timestamp("expiresAt").notNullable();

        table.unique("slug");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("urls");
};
