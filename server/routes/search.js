const express = require('express');
const router = express.Router();

// GET All Searches

router.get("/search", function (req, res) {
    res.status(200);
    res.send("recent search route reached");

});

// GET byID Searches

router.get("/search/:id", function (req, res) {
    res.status(200);
    res.send("recent search id route reached");

});

// POST new myWeek


router.post("/search", function (req, res) {
    res.status(200);
    res.send("recent search route reached");

});

// PUT update myWeek

router.put("/search/:id", function (req, res) {
    res.status(200);
    res.send("recent search id route reached");

});

// DELETE myWeek

router.delete("/search/:id", function (req, res) {
    res.status(200);
    res.send("recent search id route reached");

});

module.exports = router;