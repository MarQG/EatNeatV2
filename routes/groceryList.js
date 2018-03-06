const express = require('express');
const router = express.Router();

// GET All Favorites

router.get("/grocerylist", function (req, res) {
    res.status(200);
    res.send("grocery list reached");

});

// GET byID Favorites

router.get("/grocerylist/:id", function (req, res) {
    res.status(200);
    res.send("BLAH");

});

// POST new grocerylist


router.post("/grocerylist", function (req, res) {
    res.status(200);
    res.send("grocerylist route reached");

});

// PUT update grocerylist

router.put("/grocerylist/:id", function (req, res) {
    res.status(200);
    res.send("BLAH");

});

// DELETE grocerylist

router.delete("/grocerylist/:id", function (req, res) {
    res.status(200);
    res.send("BLAH");

});

module.exports = router;