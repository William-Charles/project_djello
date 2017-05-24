const express = require("express");
let router = express.Router();

const { clone, buildPyramid } = require("../services/ponz");

const { loggedInOnly, loggedOutOnly } = require("../services/session");

const User = require("../models/User");

module.exports = passport => {
  router.get("/", loggedInOnly, async (req, res, next) => {
    let user = await req.user.populateChildren();
    let userClone = clone(user);
    let pyramid = buildPyramid(userClone);
    res.render("index", { user, pyramid });
  });

  router.get("/login", loggedOutOnly, (req, res) => {
    res.render("login");
  });

  router.get("/register", loggedOutOnly, (req, res) => {
    res.render("register");
  });

  router.get("/logout", loggedInOnly, (req, res) => {
    req.logout();
    res.redirect("/login");
  });

  router.post(
    "/login",
    loggedOutOnly,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
  );

  router.post("/register", loggedOutOnly, (req, res, next) => {
    const { fname, lname, email, password } = req.body;
    const user = new User({
      fname: fname,
      lname: lname,
      email: email,
      points: 0,
      password: password
    });
    user
      .save()
      .then(user => {
        req.login(user, err => {
          if (err) throw err;
          res.redirect("/");
        });
      })
      .catch(next);
  });

  return router;
};
