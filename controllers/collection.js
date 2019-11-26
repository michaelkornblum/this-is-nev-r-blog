const Collection = require('../models/Collection');
const Field = require('../models/Field');

exports.getCollectionIndex = (req, res) =>
	Collection.fetchAll(collections =>
		res.render('collection/index', {
			pageTitle: 'Collections',
			collections,
			collectionId: null,
			collectionName: null,
			isEditing: false,
			isDeleting: false,
			wasAdded: false,
			wasEdited: false,
			wasDeleted: false,
		}),
	);

exports.getEditCollection = (req, res) =>
	Collection.fetchAll(collections =>
		res.render('collection/index', {
			pageTitle: 'Collections',
			collections,
			collectionId: req.query.collectionId,
			collectionName: null,
			isEditing: true,
			isDeleting: false,
			wasAdded: false,
			wasEdited: false,
			wasDeleted: false,
		}),
	);

exports.getDeleteCollection = (req, res) =>
	Collection.fetchAll(collections =>
		Collection.findById(req.query.collectionId, collection =>
			res.render('collection/index', {
				pageTitle: 'Collections',
				collections,
				collectionId: req.query.collectionId,
				collectionName: collection.name,
				isEditing: false,
				isDeleting: true,
				wasAdded: false,
				wasEdited: false,
				wasDeleted: false,
			}),	
		)
	);

exports.getAddedCollection = (req, res) =>
	Collection.fetchAll(collections =>
		res.render('collection/index', {
			pageTitle: 'Collections',
			collections,
			collectionId: null,
			collectionName: req.query.collectionName,
			isEditing: false,
			isDeleting: false,
			wasAdded: true,
			wasEdited: false,
			wasDeleted: false,
		}),
	);

exports.getEditedCollection = (req, res) =>
	Collection.fetchAll(collections =>
		res.render('collection/index', {
			pageTitle: 'Collections',
			collections,
			collectionId: null,
			collectionName: req.query.collectionName,
			isEditing: false,
			isDeleting: false,
			wasAdded: false,
			wasEdited: true,
			wasDeleted: false,
		}),
	);

exports.getDeletedCollection = (req, res) =>
	Collection.fetchAll(collections =>
		res.render('collection/index', {
			pageTitle: 'Collections',
			collections,
			collectionId: null,
			collectionName: req.query.collectionName,
			isEditing: false,
			isDeleting: false,
			wasAdded: false,
			wasEdited: false,
			wasDeleted: true,
		}),
	);

exports.postAddCollection = (req, res) =>
	new Collection(null, req.body.collectionName).save(err =>
		err
			? console.error(err)
			: res.redirect(
					`/collection/added?collectionName=${req.body.collectionName}`,
			),
	);

exports.postEditCollection = (req, res) =>
	new Collection(req.body.collectionId, req.body.collectionName).save(err =>
		err
			? console.error(err)
			: res.redirect(
					`/collection/edited?collectionName=${req.body.collectionName}`,
			),
	);

exports.postDeleteCollection = (req, res) =>
	Field.deleteByCollectionId(req.body.collectionId, err =>
		err
			? console.error(err)
			: Collection.delete(req.body.collectionId, err =>
					err
						? console.error(err)
						: res.redirect(
								`/collection/deleted?collectionName=${req.body.collectionName}`,
						),
			),
	);
