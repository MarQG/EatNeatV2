const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    userSearch:{
        type: String,
        required: true
    },
    matches: {
        type: Array,
        required: true
    }
});

var recipeSearch = mongoose.model("recipeSearch", RecipeSchema);

module.exports = recipeSearch;