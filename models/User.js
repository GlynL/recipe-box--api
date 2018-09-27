const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// encrypt password before saving to db
UserSchema.pre("save", function(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, saltRounds, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

// check if password matches
UserSchema.methods.comparePassword = async function(candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);
  return match;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
