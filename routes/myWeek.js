const express = require('express');
const router = express.Router();

// GET All myWeek

router.get("/myweek", function (req, res) {
    res.status(200);
    res.send("myweek route reached");

});

// GET byID myWeek

router.get("/myweek/:id", function (req, res) {
    res.status(200);
    res.send("myweek route reached");

});

// POST new myWeek


router.post("/myweek", function (req, res) {
    res.status(200);
    res.send("myweek route reached");

});

// PUT update myWeek

router.put("/myweek/:id", function (req, res) {
    res.status(200);
    res.send("myweek route reached");

});

// DELETE myWeek

router.delete("/myweek/:id", function (req, res) {
    res.status(200);
    res.send("myweek route reached");

});

module.exports = router;