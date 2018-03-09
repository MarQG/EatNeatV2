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

const db = require("./../models/recipeSearch.js");
const user = require("./../models/user.js");

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
            res.json({Error: "Something went wrong. Please go back and try again"})
        } else {
            if (data.length === 0) {
                request(`${yumListURL}steak`, function (err, response, body) {
                    if (response.statusCode === 404) {
                        console.log(err)
                        console.log("Status Code:", response && response.statusCode);
                        res.json({Error: "Something went wrong. Please go back and try again"})
                    }
                    
                    
                    function EachMatch(recipe_id, imageUrlBySize, recipe_name, totalTimeInSeconds, attributes, rating) {
                        this.recipe_id = recipe_id,
                        this.imageUrlBySize = imageUrlBySize,
                        this.recipe_name = recipe_name,
                        this.totalTimeInSeconds = totalTimeInSeconds,
                        this.attributes = attributes,
                        this.rating = rating
                    }
                    
                    let currentMatches = [];
                    
                    
                    for (let i = 0; i < JSON.parse(body).matches.length; i++) {
                        let json = JSON.parse(body).matches[i];
                        currentMatches.push(new EachMatch (json.id, json.imageUrlsBySize, json.recipeName, json.totalTimeInSeconds, json.attributes, json.rating))
                    }

                    db.create({
                        userSearch: JSON.parse(body).criteria.q,
                        matches: currentMatches
                    }, function (err, data) {
                        if (err) {
                            console.log(err)
                            res.json({Error: "Something went wrong. Please go back and try again"})
                        } else {
                            res.json(data)
                        }
                    })
                })
            } else {
                console.log("Testing")
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
        console.log("Status Code:", response.statusCode);
        if (response.statusCode === 404) {
            console.log(err)
            console.log("Status Code:", response && response.statusCode);
            res.json({Error: "Something went wrong. Please go back and try again"})
        } else {
               
            recSource = JSON.parse(body).source.sourceRecipeUrl

            request({
                "url": spoon + encodeURI(recSource),
                "headers": {
                    "X-Mashape-Key": process.env.RECIPE_API_KEY,
                    "Content-Type": "application/json",
                }
            }, function (error, resp, data) {
                if (resp.statusCode === 404) {
                    console.log(error)
                    console.log("Status Code:", resp && resp.statusCode);
                    res.json({Error: "Something went wrong. Please go back and try again"})
                }

                let info = {
                    YummlyRecipe: JSON.parse(body),
                    Spoonacular: JSON.parse(data)
                }
                res.json(info)
            })
        }
    })
})

router.get("/search/:recipe_id/nutrition", function(req, res){
    recipeId = req.params.recipe_id
    
    let yumRecURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + process.env.YUMMY_APP_ID + "&_app_key=" + process.env.YUMMY_API_KEY;
    
    request(yumRecURL, function(err, response, body){
        if (response.statusCode === 404) {
            console.log(err)
            console.log("Status Code:", response && response.statusCode);
            res.json({Error: "Something went wrong. Please go back and try again"})
        }
        let json = JSON.parse(body).nutritionEstimates
        if (json.length === 0) {
            res.json({nutrition: "No nutrition estimates found, please visit " + JSON.parse(body).source.sourceRecipeUrl + " for more details"})
        } else {
            let info = {
                servings: JSON.parse(body).numberOfServings,
                calories: null,
                fat: null,
                carbs: null,
                protein: null,
                additionalInfo: JSON.parse(body).source.sourceRecipeUrl
            }
            
            for (var i = 0; i < json.length; i++) {
                if (json[i].attribute === "FAMS") {
                    info.fat = json[i].value
                }
                if (json[i].attribute === "PROCNT") {
                    info.protein = json[i].value
                }
                if (json[i].attribute === "CHOCDF") {
                    info.carbs = json[i].value
                }
                if (info.fat != null && info.carbs != null && info.protein != null) {
                    info.calories = (Math.ceil(info.fat) * 9) + (Math.ceil(info.carbs) * 4) + (Math.ceil(info.protein) * 4)

                    break;
                }
            }

            res.json(info)
        }
    })
})

// // POST Favorite
// router.post("/favorites", function (req, res) {
//     recipeId = "Steak-1851748"

//     let yumRecURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + process.env.YUMMY_APP_ID + "&_app_key=" + process.env.YUMMY_API_KEY;

//     request(yumRecURL, function (err, response, body) {
//         console.log("Error:", err);
//         console.log("Status Code:", response && response.statusCode);
//         // console.log("Body:", body);

//         recSource = JSON.parse(body).source.sourceRecipeUrl

//         request({
//             "url": spoon + encodeURI(recSource),
//             "headers": {
//                 "X-Mashape-Key": process.env.RECIPE_API_KEY,
//                 "Content-Type": "application/json",
//             }
//         }, function (error, resp, data) {
//             console.log("Error:", error);
//             console.log("Status Code:", resp && resp.statusCode);
          
//         function EachFav(recipe_id, imageUrlBySize, recipe_name, totalTime, servings, recipe_url, ingredients, instructions, analyzedInstructions) {
//                 this.recipe_id = recipe_id,
//                 this.imageUrlBySize = imageUrlBySize,
//                 this.recipe_name = recipe_name,
//                 this.totalTime = totalTime,
//                 this.servings = servings,
//                 this.recipe_url = recipe_url,
//                 this.ingredients = ingredients,
//                 this.instructions = instructions,
//                 this.analyzedInstructions = analyzedInstructions
//         }
//         var json = JSON.parse(body)
//         let newFav= new EachFav(json.id, json.images[0].imageUrlsBySize["360"], json.name, json.totalTime, json.numberOfServings, json.source.sourceRecipeUrl, json.ingredientLines, JSON.parse(data).instructions, JSON.parse(data).analyzedInstructions)
        
//         user.find({user_id: "testing"}, function (error, response) {
//             if(error){
//                 console.log(error);

//             } else {
//                 let searches = false;

//                 for(var i = 0; i < response[0].favorites.length; i++) {
//                     if(recipeId === response[0].favorites[i].recipe_id) {
//                         searches = true;
//                     }
//                 }
//                 if (searches === true) {
//                     res.json({search: "Your selection is already in your favorites."});
//                 } else {
//                     user.findOneAndUpdate({user_id: response[0].user_id}, {$push: {favorites: newFav}}, function (e, r){
//                         if(e){
//                             console.log(e);
//                         } else {
//                             res.json(r);
                            
//                         }
                    
//                     });
//                 }
//             }
            
//         }) 

//             user.findOneAndUpdate({user_id: "testing"}, { $set: {favorites: setFavs} }, function(err, data){
//                 if (error) {
//                     console.log(err)
//                 } else {
//                     res.json(data)
//                 }
//             })

//         })
//     })
// });



module.exports = router;



