const request = require("request");
const express = require("express");
const router = express.Router();
if(process.env.NODE_ENV === 'development'){
    require('dotenv').config({ path: './.env.development' });
}


const mongoose = require("mongoose");

const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/EatNeat';

mongoose.Promise = Promise;
mongoose.connect(databaseUrl);

const db = require("./../models/recipeSearch.js")

db.on("error", function (error) {
    console.log("Database Error:", error);
});

let recipeId;
let recSource;
const yumListURL = "https://api.yummly.com/v1/api/recipes?_app_id=" + process.env.YUMMY_APP_ID + "&_app_key=" + process.env.YUMMY_API_KEY + "&q=";
const spoon = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=true&url=";

// Replace "chicken" in yummly request with userSearch variable once route has been identified for a search"
//Searches for multiple recipes
router.get("/search", function(req, res){
    db.find({userSearch: "steak"}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            if (data.length === 0) {
                request(`${yumListURL}steak`, function (err, response, body) {
                    console.log("Error:", err);
                    console.log("Status Code:", response && response.statusCode);
                    
                    function EachMatch(recipe_id, imageUrlBySize, recipe_name, totalTimeInSeconds, attributes, rating) {
                        this.recipe_id = recipe_id,
                        this.imageUrlBySize = imageUrlBySize,
                        this.recipe_name = recipe_name,
                        this.totalTimeInSeconds = totalTimeInSeconds,
                        this.attributes = attributes,
                        this.rating = rating
                    }
                    
                    var currentMatches = [];
                    
                    
                    for (var i = 0; i < JSON.parse(body).matches.length; i++) {
                        var json = JSON.parse(body).matches[i];
                        currentMatches.push(new EachMatch (json.id, json.imageUrlsBySize, json.recipeName, json.totalTimeInSeconds, json.attributes, json.rating))
                    }

                    db.create({
                        userSearch: JSON.parse(body).criteria.q,
                        matches: currentMatches
                    }, function (err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.json(data)
                        }
                    })
                })
            } else {
                res.json(data)
            }
        }
    })
})

//Gets a single recipe
router.get("/search/:recipe_id", function(req, res){
    recipeId = req.params.recipe_id
    
    let yumRecURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + process.env.YUMMY_APP_ID + "&_app_key=" + process.env.YUMMY_API_KEY;
    
    request(yumRecURL, function(err, response, body){
        console.log("Error:", err);
        console.log("Status Code:", response && response.statusCode);
        // console.log("Body:", body);
        
        res.json(JSON.parse(body));
        
        recSource = JSON.parse(body).source.sourceRecipeUrl
    })
})

router.get("/search/:recipe_id/details", function(req, res){
    console.log(spoon + encodeURI(recSource))
    request({
        "url": spoon + encodeURI(recSource),
        "headers": {
            "X-Mashape-Key": process.env.RECIPE_API_KEY,
            "Content-Type": "application/json",
        }
    }, function (error, resp, data) {
        console.log("Error:", error);
        console.log("Status Code:", resp && resp.statusCode);
        res.json(JSON.parse(data))
    })
})

module.exports = router;



