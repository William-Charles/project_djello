const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

let models = {};

models.User = require("./User");
models.Board = require("./Board");

module.exports = models;
