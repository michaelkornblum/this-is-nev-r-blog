const getBaseClass = require("./Base");

const BaseClass = getBaseClass("collections.json");

module.exports = class Collection extends BaseClass {
    constructor(id, name) {
        super(id, name);
    }
};
