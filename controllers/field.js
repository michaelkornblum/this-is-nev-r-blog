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

exports.getFieldIndex = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			res.render('field/index', {
				pageTitle: 'Fields',
				fields: fields.sort((a, b) => a.order - b.order),
				collection,
				capitalize,
				fieldTypes,
				fieldId: null,
				fieldName: null,
				isDeleting: false,
				wasAdded: false,
				wasEdited: false,
				wasDeleted: false
			}),
		),
	);

exports.getEditField = (req, res) =>
	Collection.fetchAll( collections =>
		Collection.findById(req.query.collectionId, collection =>
			Field.findById(req.query.fieldId, field =>
				res.render('field/edit', {
					pageTitle: 'Edit Field',
					field,
					collections,
					collection,
					capitalize
				}),
			),
		)
	)
	

exports.getDeleteField = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			Field.findById(req.query.fieldId, field =>
				res.render('field/index', {
					pageTitle: 'Fields',
					fields: fields.sort((a, b) => a.order - b.order),
					collection,
					capitalize,
					fieldTypes,
					fieldId: field.id,
					fieldName: field.name,
					isDeleting: true,
					wasAdded: false,
					wasEdited: false,
					wasDeleted: false
				}),
			),
		),
	);

exports.getAddedField = (req, res) =>
	Field.findByName(req.query.fieldName, field =>
		Collection.findById(field.collectionId, collection =>
			Field.findByCollectionId(collection.id, fields =>
				res.render('field/index', {
					pageTitle: 'Fields',
					fields: fields.sort((a, b) => a.order - b.order),
					collection,
					capitalize,
					fieldTypes,
					fieldId: null,
					fieldName: field.name,
					isDeleting: false,
					wasAdded: true,
					wasEdited: false,
					wasDeleted: false
				})
			)
		)
	)

exports.getDeletedField = (req, res) =>
	Collection.findById(req.query.collectionId, collection =>
		Field.findByCollectionId(collection.id, fields =>
			res.render('field/index', {
				pageTitle: 'Fields',
				fields: fields.sort((a, b) => a.order - b.order),
				collection,
				capitalize,
				fieldTypes,
				fieldId: null,
				fieldName: req.query.fieldName,
				isDeleting: false,
				wasAdded: false,
				wasEdited: false,
				wasDeleted: true
			})
	)
)
	

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
				: res.redirect(`/field/added?fieldName=${req.body.fieldName}`),
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
	Field.findById(req.params.fieldId, field =>
		new Field(
			field.id,
			field.name,
			field.collectionId,
			field.type,
			field.order,
			req.body,
		).save(err =>
			err
				? console.error(err)
				: res.redirect(
					`/fields?collectionId=${field.collectionId}`,
				),
		),
	);

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
