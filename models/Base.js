const uuid = require("uuid/v4");

const {
    setFileLocation,
    readDataFile,
    writeDataFile
} = require("../utils/file-operations");

module.exports = fileName => {
    const dataFile = setFileLocation(fileName);
    return class Base {
        constructor(id, name) {
            this.id = id;
            this.name = name;
        }

        save(callBack) {
            readDataFile(dataFile, arr => {
                if (this.id) {
                    const itemIndex = arr.findIndex(
                        item => item.id === this.id
                    );
                    arr[itemIndex] = this;
                } else {
                    this.id = uuid();
                    arr.push(this);
                }
                writeDataFile(dataFile, arr, callBack);
            });
        }

        static fetchAll(callBack) {
            readDataFile(dataFile, callBack);
        }

        static findById(id, callBack) {
            readDataFile(dataFile, arr => {
                const item = arr.find(item => item.id === id);
                callBack(item);
            });
        }

        static findByName(name, callBack) {
            readDataFile(dataFile, arr => {
                const item = arr.find(item => item.name === name);
                callBack(item);
            });
        }

        static delete(id, callBack) {
            readDataFile(dataFile, arr => {
                const newArr = arr.filter(item => item.id !== id);
                writeDataFile(dataFile, newArr, callBack);
            });
        }

        static findByCollectionId(collectionId, callBack) {
            readDataFile(dataFile, arr => {
                const newArr = arr.filter(
                    item => item.collectionId === collectionId
                );
                callBack(newArr);
            });
        }

        static deleteByCollectionId(collectionId, callBack) {
            readDataFile(dataFile, arr => {
                const newArr = arr.filter(
                    item => item.collectionId !== collectionId
                );
                writeDataFile(dataFile, newArr, callBack);
            });
        }
    };
};
