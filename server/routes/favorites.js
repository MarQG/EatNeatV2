const express = require('express');
const router = express.Router();

const db = require("./../models/user.js");

// GET All Favorites

router.get("/favorites", function (req, res) {
    db.find({favorites})

});

// GET byID Favorites

router.get("/favorites/:id", function (req, res) {
    res.status(200);
    res.send("Favorites route reached");

});

// POST new Favorites

router.post("/favorites", function (req, res) {
    res.status(200);
    res.send("Favorites route reached");


});

// DELETE Favorites

router.delete("/favorites/:id", function (req, res) {
    res.status(200);
    res.send("Favorites route reached");

});


module.exports = router;