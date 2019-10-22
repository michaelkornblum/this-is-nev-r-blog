const express = require("express");

const {
    getIndex,
    getEditCollection,
    getDeleteCollection,
    postAddCollection,
    postEditCollection,
    postDeleteCollection
} = require("../controllers/collection");

const router = express.Router();

router.get("/", getIndex);
router.get("/collection/edit", getEditCollection);
router.get("/collection/delete", getDeleteCollection);

router.post("/collection/add", postAddCollection);
router.post("/collection/edit", postEditCollection);
router.post("/collection/delete", postDeleteCollection);

module.exports = router;
