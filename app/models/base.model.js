const addFormats = require("ajv-formats");
const { Model, AjvValidator } = require("objection");
class BaseModel extends Model {
    static createValidator() {
        return new AjvValidator({
            onCreateAjv: (ajv) => {
                addFormats(ajv);
            },
            options: {
                allErrors: true,
                validateSchema: false,
                ownProperties: true,
            },
        });
    }
}

module.exports = BaseModel;
