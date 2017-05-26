const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models").User;

module.exports = passport => {
  app.get(
    "/loginmm",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      next();
    }
  );

  return app;
};
