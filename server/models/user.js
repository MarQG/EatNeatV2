const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    favorites: Array,

    recent_searches: Array,

    my_week: Object,

    grocery_list: Array


});

var user = mongoose.model("User", UserSchema);

module.exports = user;