const getBaseClass = require('./Base');

const BaseClass = getBaseClass('entries.json');

module.exports = class Entry extends BaseClass {
	constructor(id, name, collectionId, obj) {
		super(id, name);
		this.collectionId = collectionId;
		for (let prop in obj) {
			this[prop] = obj[prop];
		}
	}
};
