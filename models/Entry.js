const getBaseClass = require('./Base');

const BaseClass = getBaseClass('entries.json');

module.exports = class Entry extends BaseClass {
	constructor(
		id,
		collectionId,
		author,
		creationDate,
		lastModified,
		obj,
	) {
		super(id);
		this.collectionId = collectionId;
		this.author = author;
		this.creationDate = creationDate;
		this.lastModified = lastModified;
		for (let prop in obj) {
			this[prop] = obj[prop];
		}
	}
};
