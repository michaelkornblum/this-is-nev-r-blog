const express = require('express');

const {
	getEntryIndex,
	getAddEntry,
	//     getEditEntry,
	//     getDeleteEntry,
	//     postAddEntry,
	//     postEditEntry,
	//     postDeleteEntry
} = require('../controllers/entry');

const router = express.Router();

router.get('/entries', getEntryIndex);
router.get('/entry/add', getAddEntry);
// router.get("/collection/edit", getEditEntry);
// router.get("/collection/delete", getDeleteEntry);

// router.post("/collection/add", postAddEntry);
// router.post("/collection/edit", postEditEntry);
// router.post("/collection/delete", postDeleteEntry);

module.exports = router;
