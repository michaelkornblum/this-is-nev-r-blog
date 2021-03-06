const Collection = require('../../models/Collection');

const defaultRenderObj = {
	pageTitle: 'Collections',
	collectionId: null,
	collectionName: null,
	isEditing: false,
	isDeleting: false,
	wasAdded: false,
	wasEdited: false,
	wasDeleted: false,
	duplicateName: false,
	noFields: false
};

const actionTaken = key => (req, res) =>
	Collection.fetchAll(collections =>
		res.render('collection/index', {
			...defaultRenderObj,
			collections,
			collectionName: req.query.collectionName,
			[key]: true,
		}),
	);

exports.getCollectionIndex = (req, res) =>
	Collection.fetchAll(collections =>
		res.render('collection/index', {
			...defaultRenderObj,
			collections,
		}),
	);

exports.getEditCollection = (req, res) =>
	Collection.fetchAll(collections =>
		res.render('collection/index', {
			...defaultRenderObj,
			collections,
			collectionId: req.query.collectionId,
			isEditing: true,
		}),
	);

exports.getDeleteCollection = (req, res) =>
	Collection.fetchAll(collections =>
		Collection.findById(req.query.collectionId, collection =>
			res.render('collection/index', {
				...defaultRenderObj,
				collections,
				collectionId: req.query.collectionId,
				collectionName: collection.name,
				isDeleting: true,
			}),
		),
	);

exports.getDuplicateCollectionName = (req, res) =>
	Collection.fetchAll(collections =>
		res.render('collection/index', {
			...defaultRenderObj,
			collections,
			collectionName: req.query.collectionName,
			duplicateName: true
		}),
	);

exports.getNoFieldsInCollection = (req, res) =>
	Collection.fetchAll(collections =>
		Collection.findById(req.query.collectionId, collection =>
			res.render('collection/index', {
				...defaultRenderObj,
				collections,
				collectionName: collection.name,
				collectionId: collection.id,
				noFields: true
			})
		)
	)
	

exports.getAddedCollection = actionTaken('wasAdded');
exports.getEditedCollection = actionTaken('wasEdited');
exports.getDeletedCollection = actionTaken('wasDeleted');
