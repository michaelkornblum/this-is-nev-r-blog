const getBaseClass = require("./Base");

const Base = getBaseClass("fields.json");

module.exports = class Field extends Base {
    constructor(id, name, collectionId, type, order, config) {
        super(id, name);
        this.collectionId = collectionId;
        this.type = type;
        this.order = order;
        this.config = config;
    }
};
