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
	getConfiguredField,

	postAddField,
	postMoveUpField,
	postMoveDownField,
	postConfigField,
	postEditField,
	postDeleteField,
} = require('../controllers/field');

const router = express.Router();

router.get('/fields', getFieldIndex);
router.get('/field/config', getConfigField);
router.get('/field/will-edit', getWillEditField);
router.get('/field/edit', getEditField);
router.get('/field/delete', getDeleteField);
router.get('/field/added', getAddedField);
router.get('/field/edited', getEditedField);
router.get('/field/deleted', getDeletedField);
router.get('/field/configured', getConfiguredField);

router.post('/field/add', postAddField);
router.post('/field/move-up', postMoveUpField);
router.post('/field/move-down', postMoveDownField);
router.post('/field/config/:fieldId/:mode', postConfigField);
router.post('/field/edit', postEditField);
router.post('/field/delete', postDeleteField);

module.exports = router;
