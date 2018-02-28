const request = require("request");
const express = require("express");
const router = express.Router();

const yumKey = "&_app_key=1f9b2a7d3efef07d7e62c12ae3fea734";
const yumAppId = "?_app_id=5b89dde2";
const yumListURL = "https://api.yummly.com/v1/api/recipes" + yumAppId + yumKey + "&q=";


// Replace "chicken" in yummly request with userSearch variable once route has been identified for a search"
// router.get("/search", function(req, res){
//     request(`${yumListURL}chicken`, function(err, response, body){
//         console.log("Error:", err);
//         console.log("Status Code:", response && response.statusCode);
//         console.log("Body:", body);
//         res.json(body)
//     })
// })

//For Testing Purpose
module.exports = request(`${yumListURL}chicken`, function(err, response, body){
    console.log("Error:", err);
    console.log("Status Code:", response && response.statusCode);
    console.log("Body:", body);
})


