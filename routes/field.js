const express = require('express');

const {
	getFieldIndex,
	getEditField,
	getDeleteField,
	postAddField,
	postMoveUpField,
	postMoveDownField,
	postEditField,
	postDeleteField,
} = require('../controllers/field');

const router = express.Router();

router.get('/fields', getFieldIndex);
router.get('/field/edit', getEditField);
router.get('/field/delete', getDeleteField);

router.post('/field/add', postAddField);
router.post('/field/move-up', postMoveUpField);
router.post('/field/move-down', postMoveDownField);
router.post('/field/edit/:fieldId', postEditField);
router.post('/field/delete', postDeleteField);

module.exports = router;
