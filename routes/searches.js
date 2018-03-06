const express = require('express');
const router = express.Router();

// GET All Searches

router.get("/searches", function (req, res) {
    res.status(200);
    res.send("recent search route reached");

});

// GET byID Searches

router.get("/searches/:id", function (req, res) {
    res.status(200);
    res.send("recent search id route reached");

});

// POST new myWeek


router.post("/searches", function (req, res) {
    res.status(200);
    res.send("recent search route reached");

});

// PUT update myWeek

router.put("/searches/:id", function (req, res) {
    res.status(200);
    res.send("recent search id route reached");

});

// DELETE myWeek

router.delete("/searches/:id", function (req, res) {
    res.status(200);
    res.send("recent search id route reached");

});

module.exports = router;