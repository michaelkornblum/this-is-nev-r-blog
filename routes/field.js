const express = require("express");

const {
    getIndex,
    getEditField,
    getDeleteField,
    postAddField,
    postEditField,
    postDeleteField
} = require("../controllers/field");

const router = express.Router();

router.get("/field", getIndex);
router.get("/field/edit", getEditField);
router.get("/field/delete", getDeleteField);

router.post("/collection/add", postAddField);
router.post("/collection/edit", postEditField);
router.post("/collection/delete", postDeleteField);

module.exports = router;
