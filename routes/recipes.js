const express = require("express");
const router = express.Router();
const recipeControllers = require("../controllers/recipes");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "recipes",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 400, height: 400, crop: "limit" }]
});

const parser = multer({ storage: storage });

// get all recipes
router.get("/", recipeControllers.getRecipes);

// get single recipe
router.get("/:id", recipeControllers.getRecipe);

// add new recipe
router.post("/new", parser.single("recipe-image"), recipeControllers.addRecipe);

// edit recipe
router.put("/edit/:id", recipeControllers.editRecipe);

// delete recipe
router.delete("/:id", recipeControllers.deleteRecipe);

module.exports = router;
