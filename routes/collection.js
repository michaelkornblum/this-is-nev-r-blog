const express = require('express');

const {
	getCollectionIndex,
	getEditCollection,
	getDeleteCollection,
	getAddedCollection,
	getEditedCollection,
	getDeletedCollection,
	getDuplicateCollectionName,
} = require('../controllers/collection/get');

const {
	postAddCollection,
	postEditCollection,
	postDeleteCollection,
} = require('../controllers/collection/post');

const router = express.Router();

router.get('/', getCollectionIndex);
router.get('/collection/edit', getEditCollection);
router.get('/collection/delete', getDeleteCollection);
router.get('/collection/added', getAddedCollection);
router.get('/collection/edited', getEditedCollection);
router.get('/collection/deleted', getDeletedCollection);
router.get('/collection/duplicate', getDuplicateCollectionName);

router.post('/collection/add', postAddCollection);
router.post('/collection/edit', postEditCollection);
router.post('/collection/delete', postDeleteCollection);

module.exports = router;
