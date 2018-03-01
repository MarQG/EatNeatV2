const request = require("request");
const express = require("express");
const router = express.Router();

let recipeId;
const yumKey = "&_app_key=1f9b2a7d3efef07d7e62c12ae3fea734";
const yumAppId = "?_app_id=5b89dde2";
const yumListURL = "https://api.yummly.com/v1/api/recipes" + yumAppId + yumKey + "&q=";



// const spoon = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/extract?forceExtraction=true&url=";
// const recipeKey = "BEAGFpnJzNmshCwrMP5I5LTVCo3qp1L9ydsjsnkqXNYsWX08Dx";


// Replace "chicken" in yummly request with userSearch variable once route has been identified for a search"
//Searches for multiple recipes
router.get("/search", function(req, res){
    request(`${yumListURL}chicken`, function(err, response, body){
        console.log("Error:", err);
        console.log("Status Code:", response && response.statusCode);
        // console.log("Body:", body);
        res.json(JSON.parse(body));
    })
    // request({"url": "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/classify",
    //          "headers": {
    //             "X-Mashape-Key": "BEAGFpnJzNmshCwrMP5I5LTVCo3qp1L9ydsjsnkqXNYsWX08Dx",
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         "params": {
    //             "ingredientList": "3 oz pork shoulder",
    //             "title": "Pork roast with green beans"
    //         }
    // }, function(error, resp, data){
    //     console.log("Error:", error);
    //     console.log("Status Code:", resp && resp.statusCode);
    //     console.log("Body:", data);
    // })
})
//Gets a single recipe
router.get("/search/:recipe_id", function(req, res){
    recipeId = req.params.recipe_id
    const yumRecURL = "http://api.yummly.com/v1/api/recipe/" + recipeId + yumAppId + yumKey
    request(yumRecURL, function(err, response, body){
        console.log("Error:", err);
        console.log("Status Code:", response && response.statusCode);
        console.log("Body:", body);
        res.json(JSON.parse(body));
    })
})

module.exports = router;



