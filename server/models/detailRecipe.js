const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    recipe: {
        type: Object
    }
});

var detailRecipe = mongoose.model("detailRecipe", RecipeSchema);

module.exports = detailRecipe;