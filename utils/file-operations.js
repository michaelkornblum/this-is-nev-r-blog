const path = require("path");
const fs = require("fs");

exports.setFileLocation = fileName =>
    path.join(path.dirname(process.mainModule.filename), "data", fileName);

exports.readDataFile = (file, callBack) =>
    fs.readFile(file, (err, content) =>
        err ? callBack([]) : callBack(JSON.parse(content))
    );

exports.writeDataFile = (file, data, callBack) =>
    fs.writeFile(file, JSON.stringify(data), () => callBack());
