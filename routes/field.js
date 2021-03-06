const express = require('express');

const {
	getFieldIndex,
	getConfigField,
	getWillEditField,
	getEditField,
	getDeleteField,
	getAddedField,
	getEditedField,
	getDeletedField,
	getMovedField,
	getConfiguredField,
	getDuplicateFieldName,
} = require('../controllers/field/get');

const {
	postAddField,
	postMoveUpField,
	postMoveDownField,
	postConfigField,
	postEditField,
	postDeleteField,
} = require('../controllers/field/post');

const router = express.Router();

router.get('/fields', getFieldIndex);
router.get('/field/config', getConfigField);
router.get('/field/will-edit', getWillEditField);
router.get('/field/edit', getEditField);
router.get('/field/delete', getDeleteField);
router.get('/field/added', getAddedField);
router.get('/field/edited', getEditedField);
router.get('/field/deleted', getDeletedField);
router.get('/field/moved', getMovedField);
router.get('/field/configured', getConfiguredField);
router.get('/field/duplicate', getDuplicateFieldName);

router.post('/field/add', postAddField);
router.post('/field/move-up', postMoveUpField);
router.post('/field/move-down', postMoveDownField);
router.post('/field/config/:fieldId/:mode', postConfigField);
router.post('/field/edit', postEditField);
router.post('/field/delete', postDeleteField);

module.exports = router;
