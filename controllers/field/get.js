const Collection = require('../../models/Collection');
const Field = require('../../models/Field');
const { capitalize } = require('../../utils/string-operations');

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
	wasConfigured: false,
	wasMoved: false
};

const actionTaken = key => 
	((req, res) =>
		Collection.findById(req.query.collectionId, collection =>
			Field.findByCollectionId(collection.id, fields =>
				Field.sortByOrder(fields, fields =>
					res.render('field/index', {
						...defaultRenderObj,
						collection,
						fields,
						fieldName: req.query.fieldName,
						[key]: true,
					}),
				),
			),
		))

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

exports.getMovedField = actionTaken('wasMoved');
exports.getAddedField = actionTaken('wasAdded');
exports.getEditedField = actionTaken('wasEdited');
exports.getDeletedField = actionTaken('wasDeleted');
exports.getConfiguredField = actionTaken('wasConfigured');
