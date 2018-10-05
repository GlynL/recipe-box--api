const Recipe = require("../models/Recipe");
const cloudinary = require("cloudinary"); /* don't need to config again */

exports.getRecipes = (req, res, next) => {
  Recipe.find({})
    .then(results => res.json(results))
    .catch(err => next(err));
};

exports.getRecipe = (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(results => res.json(results))
    .catch(err => next(err));
};

exports.addRecipe = async (req, res, next) => {
  try {
    let recipe = req.body;
    recipe.ingredients = JSON.parse(req.body.ingredients);
    recipe.method = JSON.parse(req.body.method);
    recipe.image = {};
    if (req.file) {
      recipe.image.url = req.file.secure_url;
      recipe.image.id = req.file.public_id;
    }
    const newRecipe = await Recipe.create(recipe);
    res.json(newRecipe);
  } catch (err) {
    next(err);
  }
};

exports.editRecipe = (req, res, next) => {
  Recipe.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then(result => res.json(result))
    .catch(err => next(err));
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const response = await Recipe.findByIdAndRemove(req.body._id);
    const result = await cloudinary.v2.uploader.destroy(req.body.image.id);
    if (result.result !== "ok") throw new Error("Error deleting image");
    return res.json(response);
  } catch (err) {
    next(err);
  }
};
