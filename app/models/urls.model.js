const { customAlphabet } = require("nanoid");
const { addSeconds } = require("date-and-time");
const urlJoin = require("urljoin");

const BaseModel = require("./base.model");
const { getCurrentEpochInSecs } = require("../utils/datetime.utils");
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
                expiresAt: { type: "number" },
                createdAt: { type: "number" },
                updatedAt: { type: "number" },
            },
        };
    }

    $beforeInsert() {
        this.createdAt = getCurrentEpochInSecs();
        this.updatedAt = getCurrentEpochInSecs();
    }

    $beforeUpdate() {
        this.updatedAt = getCurrentEpochInSecs();
    }

    static get virtualAttributes() {
        return ["shortUrl"];
    }

    get shortUrl() {
        return urlJoin(config.domain, this.slug);
    }

    static async addShortUrl(
        url,
        slug = UrlsModel.getSlug(),
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

    static async getShortUrlBySlug(slug) {
        return this.query().findOne({ slug });
    }

    static getSlug() {
        return slug(6);
    }

    static getExpiresAt(expiryDelay = this.DEFAULT_EXPIRY_SECONDS) {
        return getCurrentEpochInSecs() + expiryDelay;
    }
}

// Seconds level granularity while working with URL expiry timestamps
UrlsModel.DEFAULT_EXPIRY_SECONDS = 24 * 60 * 60; // 1day

module.exports = UrlsModel;
