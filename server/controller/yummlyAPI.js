const request = require("request");
const express = require("express");
const router = express.Router();
if(process.env.NODE_ENV === undefined){
    require('dotenv').config({ path: './.env.development' });
}



const mongoose = require("mongoose");

const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/EatNeat';

mongoose.Promise = Promise;
mongoose.connect(databaseUrl);

const db = require("./../models/recipeSearch.js");
const detail = require("./../models/detailRecipe.js")
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
                            res.json(data)
                            console.log("Create is triggering...")
                            saveDetailRecipe(data);
                        }
                    })
                })
            } else {
                console.log("It found the search in the database")
                res.json(data[0])
                saveDetailRecipe(data[0]);
            }
        }
    })
})

//Gets a single recipe
router.get("/search/:recipe_id", function (req, res) {
    recipeId = req.params.recipe_id

    detail.find({id: recipeId}, function(err, data){
        if (err) {
            console.log(err)
        } else {
            if (data.length === 0) {
                console.log("Getting Recipe...")
                getDetailRecipe(recipeId)
            } else {
                console.log("Found Data")
                console.log(data[0])
                res.json(data[0])
            }
        }
    })
})

router.post("/user", function (req, res) {
    user.find({ user_id: req.body.uid }, function (error, data) {
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



const getDetailRecipe = recipeId => {
    let yumRecURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + process.env.YUMMY_APP_ID + "&_app_key=" + process.env.YUMMY_API_KEY;
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

                let json = JSON.parse(body).nutritionEstimates
                let info = {
                    calories: null,
                    fat: null,
                    carbs: null,
                    protein: null,
                    nutritionFound: false 
                }
                if (json.length === 0) {
                   info.nutritionFound = false
                } else {
                    info.nutritionFound = true
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
                }

                const {
                    source,
                    ingredientLines,
                    images,
                    attribution,
                    numberOfServings,
                    totalTime,
                    name,
                    id
                } = JSON.parse(body);

                const { 
                    dishTypes,
                    instructions,
                    image
                } = JSON.parse(data);


                const detailedRecipe = {
                    source,
                    ingredientLines,
                    images,
                    attribution,
                    numberOfServings,
                    totalTime,
                    dishTypes,
                    instructions,
                    image,
                    name,
                    id,
                    spoon,
                    info
                };

               detail.create({id: recipeId, recipe: detailedRecipe}, function(err, data){
                   if (err) {
                       console.log(err)
                   } else {
                       res.json(data[0])
                   }
               });
                
            })
        }
    })
}


const saveDetailRecipe = theResponse => {
    for (var i = 0; i < theResponse.matches.length; i++) {
        let recipeId = theResponse.matches[i].recipe_id
        detail.find({id: recipeId}, function(err, data){
            if (err) {
                console.log(err)
            } else {
                if (data.length === 0) {
                    let yumRecURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + "?_app_id=" + process.env.YUMMY_APP_ID + "&_app_key=" + process.env.YUMMY_API_KEY;
                    request(yumRecURL, function(err, response, body){
                        console.log("Status Code:", response.statusCode);
                        if (response.statusCode === 404) {
                            console.log(err)
                            console.log("Status Code:", response && response.statusCode);
                            
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
                                    
                                }
                                let json = JSON.parse(body).nutritionEstimates
                                let info = {
                                    calories: null,
                                    fat: null,
                                    carbs: null,
                                    protein: null,
                                    nutritionFound: false 
                                }
                                if (json.length === 0) {
                                   info.nutritionFound = false
                                } else {
                                    info.nutritionFound = true
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
                                }
                
                                const {
                                    source,
                                    ingredientLines,
                                    images,
                                    attribution,
                                    numberOfServings,
                                    totalTime,
                                    name,
                                    id
                                } = JSON.parse(body);
                
                                const { 
                                    dishTypes,
                                    instructions,
                                    image
                                } = JSON.parse(data);
                
                
                                const detailedRecipe = {
                                    source,
                                    ingredientLines,
                                    images,
                                    attribution,
                                    numberOfServings,
                                    totalTime,
                                    dishTypes,
                                    instructions,
                                    image,
                                    name,
                                    id,
                                    spoon,
                                    info
                                };
                                detail.create({id: recipeId, recipe: detailedRecipe}, function(err, data){
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        console.log(data)
                                    }
                                })
                            })
                        }
                    })   
                } else {
                    console.log("Already in database...")
                }
            }
        })
    }
}

module.exports = router;