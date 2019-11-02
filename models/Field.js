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

    static findNext(array, itemOrder, callBack) {
        const nextItem = array.find(item => item.order === itemOrder + 1);
        callBack(nextItem);
    }

    static findPrev(array, itemOrder, callBack) {
        const nextItem = array.find(item => item.order === itemOrder - 1);
        callBack(nextItem);
    }

    static findRemaining(array, itemOrder, callBack) {
        const remainingItems = array.filter(item => item.order > itemOrder);
        callBack(remainingItems);
    }
};
