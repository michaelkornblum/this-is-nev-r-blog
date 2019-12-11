const Collection = require('../../models/Collection');
const Field = require('../../models/Field');

exports.postAddCollection = (req, res) =>
	Collection.findByName(req.body.collectionName, collectionName =>
		collectionName
			? res.redirect(
				`/collection/duplicate?collectionName=${req.body.collectionName}`,
			)
			: new Collection(null, req.body.collectionName).save(err =>
				err
					? console.error(err)
					: res.redirect(
						`/collection/added?collectionName=${req.body.collectionName}`,
					),
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
