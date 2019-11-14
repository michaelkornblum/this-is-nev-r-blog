const getBaseClass = require('./Base');

const BaseClass = getBaseClass('items.json');

module.exports = class Item extends BaseClass {
	constructor(id, name, collectionId, obj) {
		super(id, name);
		this.collectionId = collectionId;
		for (let prop in obj) {
			this[prop] = obj[prop];
		}
	}
};
