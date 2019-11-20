const Collection = require('../models/Collection');
// const Field = require('../models/Field');
const Entry = require('../models/Entry');

exports.getEntryIndex = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Entry.findByCollectionId(collection.id, entries =>
			res.render('entry/index', {
				pageTitle: 'entries',
				collection,
				entries,
				entryId: null,
				isDeleting: false,
			}),
		),
	);

// exports.getEditCollection = (req, res) =>
// 	Collection.fetchAll(collections =>
// 		res.render('collection/index', {
// 			pageTitle: 'collections',
// 			collections,
// 			collectionId: req.query.collectionId,
// 			isEditing: true,
// 			isDeleting: false,
// 		}),
// 	);

// exports.getDeleteCollection = (req, res) =>
// 	Collection.fetchAll(collections =>
// 		res.render('collection/index', {
// 			pageTitle: 'collections',
// 			collections,
// 			collectionId: req.query.collectionId,
// 			isEditing: false,
// 			isDeleting: true,
// 		}),
// 	);

// exports.postAddCollection = (req, res) =>
// 	new Collection(null, req.body.collectionName).save(err =>
// 		err ? console.error(err) : res.redirect('/'),
// 	);

// exports.postEditCollection = (req, res) =>
// 	new Collection(req.body.collectionId, req.body.collectionName).save(err =>
// 		err ? console.error(err) : res.redirect('/'),
// 	);

// exports.postDeleteCollection = (req, res) =>
// 	Field.deleteByCollectionId(req.body.collectionId, err =>
// 		err
// 			? console.error(err)
// 			: Collection.delete(req.body.collectionId, err =>
// 					err ? console.error(err) : res.redirect('/'),
// 			),
// 	);
