const express = require('express');
const router = express.Router();

// GET All Favorites

router.get("/favorites", function (req, res) {
    res.status(200);
    res.send("Favorites route reached");

});

// GET byID Favorites

router.get("/favorites/:id", function (req, res) {
    res.status(200);
    res.send("Favorites route reached");

});

// POST new Favorites
// need model info to update column 

router.post("/favorites", function (req, res) {
    res.status(200);
    res.send("Favorites route reached");

});

// PUT update Favorites
// need model info to update column 

router.put("/favorites/:id", function (req, res) {
    res.status(200);
    res.send("Favorites route reached");

});

// DELETE Favorites

router.delete("/favorites/:id", function (req, res) {
    res.status(200);
    res.send("Favorites route reached");

});

module.exports = router;