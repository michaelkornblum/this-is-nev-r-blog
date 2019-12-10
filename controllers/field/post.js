const Field = require('../../models/Field');

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
									`/field/moved?fieldName=${field.name}&collectionId=${field.collectionId}`,
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
									`/field/moved?fieldName=${field.name}&collectionId=${field.collectionId}`,
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
			req.body,
		).save(err => {
			if (err) {
				console.error(err);
			} else {
				switch (req.params.mode) {
					case 'adding':
						res.redirect(
							`/field/added?fieldName=${field.name}&collectionId=${field.collectionId}`,
						);
						break;
					case 'editing':
						res.redirect(
							`/field/edited?fieldName=${field.name}&collectionId=${field.collectionId}`,
						);
						break;
					default:
						res.redirect(
							`/field/configured?fieldName=${field.name}&collectionId=${field.collectionId}`,
						);
				}
			}
		}),
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
