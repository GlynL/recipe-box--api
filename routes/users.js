const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/users");

router.post("/new", userControllers.createUser);
router.post("/login", userControllers.login);

module.exports = router;
