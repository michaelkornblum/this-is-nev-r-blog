const Collection = require('../models/Collection');
const Field = require('../models/Field');
const { capitalize } = require('../utils/string-operations');

const fieldTypes = [
	'boolean',
	'datetime',
	// 'file',
	'hidden',
	//'image',
	// 'list',
	'number',
	'options',
	// 'relation',
	'string',
	'text',
];

const defaultRenderObj = {
	pageTitle: 'Fields',
	fieldId: null,
	fieldName: null,
	willEdit: false,
	isEditing: false,
	isDeleting: false,
	capitalize,
	fieldTypes,
	wasAdded: false,
	wasEdited: false,
	wasDeleted: false,
	wasConfigured: false
};

exports.getFieldIndex = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			Field.sortByOrder(fields, fields => {
				res.render('field/index', {
					...defaultRenderObj,
					collection,
					fields,
				});
			}),
		),
	);

exports.getConfigField = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByName(req.query.fieldName, field => {
			res.render('field/edit', {
				pageTitle: 'Configure Field',
				collection,
				field,
				mode: req.query.mode
			});
		}),
	);

exports.getEditField = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			Field.sortByOrder(fields, fields => {
				Field.findById(req.query.fieldId, field =>
					res.render('field/index', {
						...defaultRenderObj,
						collection,
						fields,
						fieldId: field.id,
						fieldName: field.name,
						isEditing: true,
					}),
				);
			}),
		),
	);

exports.getWillEditField = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			Field.sortByOrder(fields, fields => 
				Field.findById(req.query.fieldId, field =>
					res.render('field/index', {
						...defaultRenderObj,
						collection,
						fields,
						fieldId: field.id,
						fieldName: field.name,
						willEdit: true
					})
				)
			)
		)
	)
		
exports.getDeleteField = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			Field.sortByOrder(fields, fields =>
				Field.findById(req.query.fieldId, field =>
					res.render('field/index', {
						...defaultRenderObj,
						collection,
						fields,
						fieldId: field.id,
						fieldName: field.name,
						isDeleting: true,
					}),
				),
			),
		),
	);

exports.getAddedField = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			Field.sortByOrder(fields, fields =>
				res.render('field/index', {
					...defaultRenderObj,
					collection,
					fields,
					fieldName: req.query.fieldName,
					wasAdded: true,
				}),
			),
		),
	),

exports.getEditedField = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			Field.sortByOrder(fields, fields =>
				res.render('field/index', {
					...defaultRenderObj,
					collection,
					fields,
					fieldName: req.query.fieldName,
					wasEdited: true,
				}),
			),
		),
	),

exports.getDeletedField = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			Field.sortByOrder(fields, fields =>
				res.render('field/index', {
					...defaultRenderObj,
					collection,
					fields,
					fieldName: req.query.fieldName,
					wasDeleted: true,
				}),
			),
		),
	);

exports.getConfiguredField = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			Field.sortByOrder(fields, fields =>
				res.render('field/index', {
					...defaultRenderObj,
					collection,
					fields,
					fieldName: req.query.fieldName,
					wasConfigured: true,
				}),
			),
		),
	);

exports.postAddField = (req, res) =>
	Field.findByCollectionId(req.body.collectionId, fields =>
		new Field(
			null,
			req.body.fieldName,
			req.body.collectionId,
			req.body.fieldType,
			fields.length + 1,
			{},
		).save(err =>
			err
				? console.error(err)
				: res.redirect(
						`/field/config?fieldName=${req.body.fieldName}&collectionId=${req.body.collectionId}&mode=adding`,
				),
		),
	);

exports.postMoveUpField = (req, res) =>
	Field.findById(req.body.fieldId, field =>
		Field.findByCollectionId(field.collectionId, fields =>
			Field.findPrev(fields, field.order, prevField =>
				new Field(
					prevField.id,
					prevField.name,
					prevField.collectionId,
					prevField.type,
					prevField.order + 1,
					prevField.config,
				).save(err =>
					err
						? console.error(err)
						: new Field(
								field.id,
								field.name,
								field.collectionId,
								field.type,
								field.order - 1,
								field.config,
						).save(err =>
								err
									? console.error(err)
									: res.redirect(
											`/fields?collectionId=${field.collectionId}`,
									),
						),
				),
			),
		),
	);

exports.postMoveDownField = (req, res) =>
	Field.findById(req.body.fieldId, field =>
		Field.findByCollectionId(field.collectionId, fields =>
			Field.findNext(fields, field.order, nextField =>
				new Field(
					nextField.id,
					nextField.name,
					nextField.collectionId,
					nextField.type,
					nextField.order - 1,
					nextField.config,
				).save(err =>
					err
						? console.error(err)
						: new Field(
								field.id,
								field.name,
								field.collectionId,
								field.type,
								field.order + 1,
								field.config,
						).save(err =>
								err
									? console.error(err)
									: res.redirect(
											`/fields?collectionId=${field.collectionId}`,
									),
						),
				),
			),
		),
	);

exports.postEditField = (req, res) =>
	Field.findById(req.body.fieldId, field =>
		new Field(
			field.id,
			req.body.fieldName,
			field.collectionId,
			req.body.fieldType,
			field.order,
			{},
		).save(err =>
			err
				? console.error(err)
				: res.redirect(
					`/field/config?fieldName=${req.body.fieldName}&collectionId=${field.collectionId}&mode=editing`,
			),
		),
	);

exports.postConfigField = (req, res) =>
	Field.findById(req.params.fieldId, field =>
		new Field(
			field.id,
			field.name,
			field.collectionId,
			field.type,
			field.order,
			req.body
		).save(err => {
			if (err) {
				console.error(err)
			} else {
				switch(req.params.mode) {
					case "adding" :
						res.redirect(`/field/added?fieldName=${field.name}&collectionId=${field.collectionId}`);
						break;
					case "editing" :
						res.redirect(`/field/edited?fieldName=${field.name}&collectionId=${field.collectionId}`);
						break;
					default :
						res.redirect(`/field/configured?fieldName=${field.name}&collectionId=${field.collectionId}`);
				}
			}
		})
	)

exports.postDeleteField = (req, res) =>
	Field.findByCollectionId(req.body.collectionId, fields =>
		Field.findById(req.body.fieldId, field => {
			Field.findRemaining(fields, field.order, fieldsAfter => {
				if (fieldsAfter.length) {
					fieldsAfter.forEach((fieldAfter, index, array) => {
						new Field(
							fieldAfter.id,
							fieldAfter.name,
							fieldAfter.collectionId,
							fieldAfter.type,
							fieldAfter.order - 1,
							fieldAfter.config,
						).save(err => {
							if (err) {
								console.error(err);
							} else {
								if (index === array.length - 1) {
									Field.delete(req.body.fieldId, err =>
										err
											? console.error(err)
											: res.redirect(
													`/field/deleted?fieldName=${req.body.fieldName}&collectionId=${req.body.collectionId}`,
											),
									);
								}
							}
						});
					});
				} else {
					Field.delete(req.body.fieldId, err =>
						err
							? console.error(err)
							: res.redirect(
									`/field/deleted?fieldName=${req.body.fieldName}&collectionId=${req.body.collectionId}`,
							),
					);
				}
			});
		}),
	);
