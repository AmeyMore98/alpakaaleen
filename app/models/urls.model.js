const { customAlphabet } = require("nanoid");
const { addMinutes } = require("date-and-time");
const urlJoin = require("urljoin");

const BaseModel = require("./base.model");
const { getCurrentTimestamp } = require("../utils/datetime.utils");
const { DB } = require("../common/postgres.init");
const config = require("../../config");

BaseModel.knex(DB);

const slug = customAlphabet(
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789"
);

class UrlsModel extends BaseModel {
    static get tableName() {
        return "urls";
    }

    static get idColumn() {
        return "_id";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["slug", "url", "expiresAt"],
            properties: {
                slug: { type: "string" },
                url: { type: "string" },
                expiresAt: { type: "string", format: "date-time" },
                createdAt: { type: "string", format: "date-time" },
                updatedAt: { type: "string", format: "date-time" },
            },
        };
    }

    $beforeInsert() {
        this.createdAt = getCurrentTimestamp();
        this.updatedAt = getCurrentTimestamp();
    }

    $beforeUpdate() {
        this.updatedAt = getCurrentTimestamp();
    }

    static get virtualAttributes() {
        return ["shortUrl"];
    }

    get shortUrl() {
        return urlJoin(config.domain, this.slug);
    }

    static async addUrl(
        slug = UrlsModel.getSlug(),
        url,
        expiresAt = UrlsModel.getExpiresAt()
    ) {
        return this.query()
            .insert({
                slug,
                url,
                expiresAt,
            })
            .returning("*");
    }

    static getSlug() {
        return slug(6);
    }

    static getExpiresAt(expiryDelayInMins = this.DEFAULT_EXPIRY_MINUTES) {
        return addMinutes(new Date(), expiryDelayInMins).toISOString();
    }
}

// Mintue level granularity while working with URL expiry timestamps
UrlsModel.DEFAULT_EXPIRY_MINUTES = 60 * 24; // 1day

module.exports = UrlsModel;
