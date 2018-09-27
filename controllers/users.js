const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
  User.create(req.body)
    .then(result => {
      let { id, username } = result;
      let token = jwt.sign(
        {
          id,
          username
        },
        process.env.SECRET_KEY
      );
      return res
        .status(200)
        .json({ message: "User created successfully", id, username, token });
    })
    .catch(err => {
      console.log("something went wrong");
      next(err);
    });
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id: user.id,
          username: user.username
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id: user.id,
        username: user.username,
        token
      });
    } else {
      throw new Error("invalid email/password");
    }
  } catch (err) {
    next(err);
  }
};
