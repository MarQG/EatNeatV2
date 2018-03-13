const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    search: {
        type: String,
        required: true
    },
    filters: {
        type: Array,
    },
    matches: {
        type: Array,
        required: true
    }
});

var recipeSearch = mongoose.model("recipeSearch", RecipeSchema);

module.exports = recipeSearch;