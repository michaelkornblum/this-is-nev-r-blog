const getBaseClass = require("./Base");
const { setFileLocation, readDataFile } = require("../utils/file-operations");

const dataFile = setFileLocation("fields.json");
const Base = getBaseClass("fields.json");

module.exports = class Field extends Base {
    constructor(id, name, collectionId, type, config) {
        super(id, name);
        this.collectionId = collectionId;
        this.type = type;
        this.config = config;
    }

    static findByCollectionId(collectionId, callBack) {
        readDataFile(dataFile, arr => {
            const filteredArray = arr.filter(
                item => item.collectionId === collectionId
            );
            callBack(filteredArray);
        });
    }
};
