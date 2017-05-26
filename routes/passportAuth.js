const express = require("express");
const app = express();
const url = require("url");
const jwt = require("jsonwebtoken");

module.exports = passport => {
  app.post("/login", (req, res, next) => {
    let email, password;

    password = req.body.password;
    if (req.body.email) {
      email = req.body.email.toLowerCase();
    }

    if (!email || !password) {
      return res.status(401).json({ error: "Missing user credentials" });
    }

    User.find({ email })
      .then(user => {
        console.log(user);
        if (!user || !user.validPassword(password)) {
          return res.status(401).json({ error: "Invalid user credentials" });
        }
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.json({ token, user });
      })
      .catch(next);
  });

  return app;
};
