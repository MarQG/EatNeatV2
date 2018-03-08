const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    favorites: {
        type: Array

    },
    // recent_searches: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "recipeSearch"
    // }],
    my_week: {
        type: String
        }

    // },
    // grocery_list: {
    //     type: Array
    // }
});

var user = mongoose.model("User", UserSchema);

module.exports = user;