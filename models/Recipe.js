const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String
    // required: "name cannot be blank"
  },
  image: {
    url: {
      type: String
    },
    id: {
      type: String
    }
  },
  ingredients: {
    type: Array
  },
  method: {
    type: Array
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
