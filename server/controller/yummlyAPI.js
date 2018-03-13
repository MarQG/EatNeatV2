const request = require("request");
const express = require("express");
const router = express.Router();
console.log("This is process.env.NODE_ENV: " + process.env.NODE_ENV)
if(process.env.NODE_ENV === undefined){
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
let yumListURL = "https://api.yummly.com/v1/api/recipes?_app_id=" + process.env.YUMMY_APP_ID + "&_app_key=" + process.env.YUMMY_API_KEY;
const spoon = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=true&url=";


const filtersBuilder = (filters) => {
    let filtersString = "";
    if(filters.allergies.length > 0){
        filters.allergies.forEach(allergy => {
            switch(allergy){
                case "gluten-free":
                    filtersString += "&allowedAllergy[]=393^Gluten-Free";
                    break;
                case "soy-free":
                    filtersString += "&allowedAllergy[]=400^Soy-Free";
                    break;
                case "peanut-free":
                    filtersString += "&allowedAllergy[]=394^Peanut-Free";
                    break;
                case "dairy-free":
                    filtersString += "&allowedAllergy[]=396^Dairy-Free";
                    break;
                case "seafood-free":
                    filtersString += "&allowedAllergy[]=398^Seafood-Free";
                    break;
                case "sesame-free":
                    filtersString += "&allowedAllergy[]=399^Sesame-Free";
                    break;
                case "egg-free":
                    filtersString += "&allowedAllergy[]=397^Egg-Free";
                    break;
                case "sulfite-free":
                    filtersString += "&allowedAllergy[]=401^Sulfite-Free";
                    break;
                case "tree-nut-free":
                    filtersString += "&allowedAllergy[]=395^Tree Nut-Free";
                    break;
                case "wheat-free":
                    filtersString += "&allowedAllergy[]=392^Wheat-Free";
                    break;
                default:
                    break;

            }
        });
    }
    if(filters.diet.length > 0){
        filters.diet.forEach(diet => {
            switch(diet){
                case "lacto-veg":
                    filtersString += "&allowedDiet[]=388^Lacto vegetarian";
                    break;
                case "ovo-veg":
                    filtersString += "&allowedDiet[]=389^Ovo vegetarian";
                    break;
                case "pescetarian":
                    filtersString += "&allowedDiet[]=390^Pescetarian";
                    break;
                case "vegan":
                    filtersString += "&allowedDiet[]=386^Vegan";
                    break;
                case "lacto-ovo-veg":
                    filtersString += "&allowedDiet[]=387^Lacto-ovo vegetarian";
                    break;
                case "paleo":
                    filtersString += "&allowedDiet[]=403^Paleo";
                    break;
                default:
                    break;
            }
        });
    }
    return filtersString;
}

//Searches for multiple recipes
router.post("/search", function(req, res){
    
    db.find({ search: req.body.query, filters: req.body.filters }, function (err, data) {
        if (err) {
            console.log(err)
            res.json({ Error: "Something went wrong. Please go back and try again" })
        } else {
            if (data.length === 0) {
                let filtersURLString = filtersBuilder(req.body.filters);
                request(yumListURL + "&q=" + req.body.query + filtersURLString, function (err, response, body) {
                    if (response.statusCode === 404) {
                        console.log(err)
                        console.log("Status Code:", response && response.statusCode);
                        res.json({ Error: "Something went wrong. Please go back and try again" })
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
                        currentMatches.push(new EachMatch(json.id, json.imageUrlsBySize, json.recipeName, json.totalTimeInSeconds, json.attributes, json.rating))
                    }

                    db.create({
                        search: JSON.parse(body).criteria.q,
                        filters: req.body.filters,
                        matches: currentMatches,
                    }, function (err, data) {
                        if (err) {
                            console.log(err)
                            res.json({ Error: "Something went wrong. Please go back and try again" })
                        } else {
                            console.log(data);
                            res.json(data)
                        }
                    })
                })
            } else {
                console.log("Testing");
                console.log(data);
                res.json(data[0])
            }
        }
    })
})

//Gets a single recipe
router.get("/search/:recipe_id", function (req, res) {
    recipeId = req.params.recipe_id

    let yumRecURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + process.env.YUMMY_APP_ID + "&_app_key=" + process.env.YUMMY_API_KEY;
    console.log(yumRecURL)
    request(yumRecURL, function(err, response, body){
        console.log("Status Code:", response.statusCode);
        if (response.statusCode === 404) {
            console.log(err)
            console.log("Status Code:", response && response.statusCode);
            res.json({ Error: "Something went wrong. Please go back and try again" })
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
                    res.json({ Error: "Something went wrong. Please go back and try again" })
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

router.get("/search/:recipe_id/nutrition", function (req, res) {
    recipeId = req.params.recipe_id

    let yumRecURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + process.env.YUMMY_APP_ID + "&_app_key=" + process.env.YUMMY_API_KEY;

    request(yumRecURL, function (err, response, body) {
        if (response.statusCode === 404) {
            console.log(err)
            console.log("Status Code:", response && response.statusCode);
            res.json({ Error: "Something went wrong. Please go back and try again" })
        }
        let json = JSON.parse(body).nutritionEstimates
        if (json.length === 0) {
            res.json({ nutrition: "No nutrition estimates found, please visit " + JSON.parse(body).source.sourceRecipeUrl + " for more details" })
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

router.post("/user", function (req, res) {
    user.find({ user_id: req.body.uid }, function (error, data) {
        console.log("Searching for user");
        if (error) {
            console.log(error),
                res.json({ "Error": "Something went wrong finding " + req.body.uid });
        } else {
            if (data.length === 0) {
                console.log("reached user creation because it didnt exist")
                user.create({
                    user_id: req.body.uid,
                    favorites: [],
                    recent_searches: [],
                    my_week: {
                        monday: ''
                    },
                    grocery_list: []
                }, function (err, body) {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(body)
                    }

                })
            } else {
                res.json(data)
            }
        }
    })
})

router.put("/user", function (req, res) {
    console.log("Updated this user", req.body.user);
    user.findOneAndUpdate({ _id: req.body.user._id }, req.body.user, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log("User Data Updated", data);
            res.json(data);
        }
    })
})


// POST Favorite
// router.post("/favorites", function (req, res) {
//     recipeId = "Steak-1851748"

//     let yumRecURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + process.env.YUMMY_APP_ID + "&_app_key=" + process.env.YUMMY_API_KEY;

//     request(yumRecURL, function (err, response, body) {
//         if (response.statusCode === 404) {
//             console.log(err)
//             console.log("Status Code:", response && response.statusCode);
//             res.json({Error: "Something went wrong. Please go back and try again"})
//         }

//         recSource = JSON.parse(body).source.sourceRecipeUrl

//         request({
//             "url": spoon + encodeURI(recSource),
//             "headers": {
//                 "X-Mashape-Key": process.env.RECIPE_API_KEY,
//                 "Content-Type": "application/json",
//             }
//         }, function (error, resp, data) {
//             if (resp.statusCode === 404) {
//                 console.log(error)
//                 console.log("Status Code:", resp && resp.statusCode);
//                 res.json({Error: "Something went wrong. Please go back and try again"})
//             }

//             function EachFav(recipe_id, imageUrlBySize, recipe_name, totalTime, servings, recipe_url, ingredients, instructions, analyzedInstructions) {
//                     this.recipe_id = recipe_id,
//                     this.imageUrlBySize = imageUrlBySize,
//                     this.recipe_name = recipe_name,
//                     this.totalTime = totalTime,
//                     this.servings = servings,
//                     this.recipe_url = recipe_url,
//                     this.ingredients = ingredients,
//                     this.instructions = instructions,
//                     this.analyzedInstructions = analyzedInstructions
//             }
//             let json = JSON.parse(body)
//             let newFav= new EachFav(json.id, json.images[0].imageUrlsBySize["360"], json.name, json.totalTime, json.numberOfServings, json.source.sourceRecipeUrl, json.ingredientLines, JSON.parse(data).instructions, JSON.parse(data).analyzedInstructions)

//             user.find({user_id: "testing"}, function (error, response) {
//                 if(error){
//                     console.log(error);

//                 } else {
//                     let searches = false;

//                     for(let i = 0; i < response[0].favorites.length; i++) {
//                         if(recipeId === response[0].favorites[i].recipe_id) {
//                             searches = true;
//                             break;
//                         }
//                     }
//                     if (searches === true) {
//                         res.json({search: "Your selection is already in your favorites."});
//                     } else {
//                         user.findOneAndUpdate({user_id: response[0].user_id}, user, function (e, r){
//                             if(e){
//                                 console.log(e);
//                             } else {
//                                 res.json(r);

//                             }

//                         });
//                     }
//                 }              
//             }) 
//         })
//     })
// })

//This will update the array by removing a favorite from the database
// router.put("/favorites", function(req, res){
//     recipeId = "Steak-1851748";
//     user.find({user_id: "testing"}, function (error, response) {
//         if(error){
//             console.log(error);
//             res.json({Error: "Something went wrong. Please go back and try again"})

//         } else {
//             let setFavs = response[0].favorites

//             for (var i = 0; i < setFavs.length; i++) {   
//                 if (recipeId === setFavs[i].recipe_id) {
//                     setFavs.splice(i, 1)
//                     break;
//                 }
//             }


//             user.findOneAndUpdate({user_id: "testing"}, { $set: {favorites: setFavs} }, function(err, data){
//                 if (error) {
//                     console.log(err)
//                 } else {
//                     res.json(data)
//                 }
//             })

//         }
//     })
// })

// router.get("/myweek", function(req, res){
//     user.find({user_id: "testing"}, function(error, data){
//         if (error) {
//             console.log(error)
//         } else {
//             res.json(data)
//         }
//     })
// })

// router.put("/myweek", function(req, res){

//     let newMealDay = "myWeek.monday.breakfast";
//     console.log(newMealDay)
//     let newMeal = "Oatmeal"


//     user.findOneAndUpdate({user_id: "testing"}, { $set: { 'myWeek.monday.breakfast': "Oatmeal" } }, function(error, data){
//         if (error) {
//             console.log(error)
//         } else {
//             res.json(data)
//         }
//     })
// })

module.exports = router;
