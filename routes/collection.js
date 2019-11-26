const express = require('express');

const {
	getCollectionIndex,
	getEditCollection,
	getDeleteCollection,
	getAddedCollection,
	getEditedCollection,
	getDeletedCollection,

	postAddCollection,
	postEditCollection,
	postDeleteCollection,
} = require('../controllers/collection');

const router = express.Router();

router.get('/', getCollectionIndex);
router.get('/collection/edit', getEditCollection);
router.get('/collection/delete', getDeleteCollection);
router.get('/collection/added', getAddedCollection);
router.get('/collection/edited', getEditedCollection);
router.get('/collection/deleted', getDeletedCollection);

router.post('/collection/add', postAddCollection);
router.post('/collection/edit', postEditCollection);
router.post('/collection/delete', postDeleteCollection);

module.exports = router;
