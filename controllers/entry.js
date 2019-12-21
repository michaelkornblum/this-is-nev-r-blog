const Collection = require('../models/Collection');
const Field = require('../models/Field');
const Entry = require('../models/Entry');

exports.getEntryIndex = (req, res) =>
	Field.findByCollectionId(req.query.collectionId, fields =>
		fields.length
			? Collection.findById(req.query.collectionId, collection =>
					Entry.findByCollectionId(collection.id, entries =>
						res.render('entry/index', {
							pageTitle: 'Entries',
							collection,
							entries,
							entryId: null,
							isDeleting: false,
							wasAdded: false,
							wasEdited: false,
							wasDeleted: false
						}),
					),
			)
			: res.redirect(
					`/collection/no-fields?collectionId=${req.query.collectionId}`,
			),
	);

exports.getAddEntry = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			res.render('entry/edit', {
				pageTitle: 'New Entry',
				collection,
				fields: fields.sort((a, b) => a.order - b.order),
				isEditing: false,
				mode: req.query.mode
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

exports.postAddEntry = (req, res) =>
	new Entry(
		null,
		req.params.collectionId,
		'John Doe',
		new Date(),
		new Date(),
		req.body,
	).save(err => (err ? console.error(err) : console.log(req.body)));

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
