/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("urls", function (table) {
        table.increments("_id").primary();
        table.integer("createdAt").notNullable();
        table.integer("updatedAt").notNullable();
        table.string("slug", 10).notNullable();
        table.string("url", 2046).notNullable();
        table.integer("expiresAt").notNullable();

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
