/*
    5. Set up a Model for the database
*/
const mongoose = require('mongoose');

const snackSchema = new mongoose.Schema({
    brand: {
        type: String,
        unique: true,
        default: '',
    },

    category: {
        type: String,
        default: '',
    },

    calories: {
        type: Number,
        default: 0,
    },

    delicious: {
        type: Boolean,
        default: true,
    },

    comments: {
        type: Array,
        default: [],
    }
},
    { timestamps: true });

// "Snack" (with the capital) is our blueprint function for creating snacks
// when mongoDB gets "Snack", it makes a collection for it that is pluralized and lowercased, in this case: "snacks"
const Snack = mongoose.model("Snack", snackSchema);

module.exports = Snack;