const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const uuid = require("uuid/v4");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  token: { type: String, unique: true },
  boards: [{ type: mongoose.Schema.ObjectId, ref: "Board" }],
  passwordHash: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator);

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 8);
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.pre("save", function(next) {
  this.token = md5(`${this.email}${uuid()}`);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
