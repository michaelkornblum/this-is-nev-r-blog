const Collection = require("../models/Collection");
const Field = require("../models/Field");
const { capitalize } = require("../utils/string-operations");

const fieldTypes = [
    "boolean",
    "date",
    "dateTime",
    "file",
    "hidden",
    "image",
    "list",
    "map",
    "markdown",
    "number",
    "object",
    "relation",
    "search",
    "string",
    "text"
];

exports.getFieldIndex = (req, res) =>
    Collection.findById(req.query.collectionId, collection =>
        Field.findByCollectionId(collection.id, fields =>
            res.render("field/index", {
                pageTitle: "Fields",
                fields: fields.sort((a, b) => a.order - b.order),
                collection,
                capitalize,
                fieldTypes,
                fieldId: null,
                isDeleting: false
            })
        )
    );

exports.getDeleteField = (req, res) =>
    Collection.findById(req.query.collectionId, collection =>
        Field.findByCollectionId(collection.id, fields =>
            Field.findById(req.query.fieldId, field =>
                res.render("field/index", {
                    pageTitle: "Fields",
                    fields: fields.sort((a, b) => a.order - b.order),
                    collection,
                    capitalize,
                    fieldTypes,
                    fieldId: field.id,
                    isDeleting: true
                })
            )
        )
    );

exports.postAddField = (req, res) =>
    Field.findByCollectionId(req.body.collectionId, fields =>
        new Field(
            null,
            req.body.fieldName,
            req.body.collectionId,
            req.body.fieldType,
            fields.length + 1,
            {}
        ).save(err =>
            err
                ? console.error(err)
                : res.redirect(`/fields?collectionId=${req.body.collectionId}`)
        )
    );

exports.postMoveUpField = (req, res) =>
    Field.findByCollectionId(req.body.collectionId, fields => {
        const currField = fields.find(field => field.id === req.body.fieldId);
        const prevField = fields.find(
            field => field.order === currField.order - 1
        );
        new Field(
            currField.id,
            currField.name,
            currField.collectionId,
            currField.type,
            currField.order - 1,
            currField.config
        ).save(err => {
            if (err) {
                console.error(err);
            } else {
                new Field(
                    prevField.id,
                    prevField.name,
                    prevField.collectionId,
                    prevField.type,
                    prevField.order + 1,
                    prevField.config
                ).save(err =>
                    err
                        ? console.error(err)
                        : res.redirect(
                            `/fields?collectionId=${req.body.collectionId}`
                        )
                );
            }
        });
    });

exports.postMoveDownField = (req, res) =>
    Field.findByCollectionId(req.body.collectionId, fields => {
        const currField = fields.find(field => field.id === req.body.fieldId);
        const nextField = fields.find(
            field => field.order === currField.order + 1
        );
        new Field(
            currField.id,
            currField.name,
            currField.collectionId,
            currField.type,
            currField.order + 1,
            currField.config
        ).save(err => {
            if (err) {
                console.error(err);
            } else {
                new Field(
                    nextField.id,
                    nextField.name,
                    nextField.collectionId,
                    nextField.type,
                    nextField.order - 1,
                    nextField.config
                ).save(err =>
                    err
                        ? console.error(err)
                        : res.redirect(
                            `/fields?collectionId=${req.body.collectionId}`
                        )
                );
            }
        });
    });

exports.postDeleteField = (req, res) =>
    Field.findByCollectionId(req.body.collectionId, fields =>
        Field.findById(req.body.fieldId, field => {
            const fieldsAfter = fields.filter(
                fieldAfter => fieldAfter.order > field.order
            );
            if (fieldsAfter.length) {
                fieldsAfter.forEach((fieldAfter, index, array) => {
                    new Field(
                        fieldAfter.id,
                        fieldAfter.name,
                        fieldAfter.collectionId,
                        fieldAfter.type,
                        fieldAfter.order - 1,
                        fieldAfter.config
                    ).save(err => {
                        if (err) {
                            console.error(err);
                        } else {
                            if (index === array.length - 1) {
                                Field.delete(req.body.fieldId, err => 
                                    err
                                        ? console.error(err)
                                        : res.redirect(`/fields?collectionId=${req.body.collectionId}`) 
                                )
                            }
                        }
                    });
                });
            } else {
                Field.delete(req.body.fieldId, err =>
                    err
                    ? console.error(err)
                    : res.redirect(`/fields?collectionId=${req.body.collectionId}`))
            }
        })
    );