const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const expressHandlebars = require("express-handlebars");

// ----------------------------------------
// Mongoose
// ----------------------------------------
const mongoose = require("mongoose");
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    next();
  } else {
    require("./mongo")(req).then(() => next());
  }
});

// ----------------------------------------
// Body Parser
// ----------------------------------------
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// ----------------------------------------
// Sessions
// ----------------------------------------
app.use(
  expressSession({
    secret: process.env.secret || "puppies",
    saveUninitialized: false,
    resave: false
  })
);

// ----------------------------------------
// Handlebars
// ----------------------------------------
var hbs = expressHandlebars.create({
  partialsDir: "views/",
  defaultLayout: "main",
  helpers: {
    pyramidContainerWidth: pyramid => {
      return `${pyramid.length * 60}px`;
    },
    pyramidHeight: pyramid => {
      let height = pyramid.length * 52;
      return `${height}px`;
    },
    pyramidWidth: pyramid => {
      let width = pyramid.length * 60 / 2;
      return `${width}px`;
    },
    indent: depth => {
      let indent = depth > 0 ? 50 : 0;
      return `${indent}px`;
    },
    valueCalc: depth => {
      let values = [40, 20, 10, 5, 2];
      let value = depth < 5 ? values[depth] : 1;
      return `$${value}`;
    }
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// ----------------------------------------
// Passport
// ----------------------------------------
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");
passport.use(
  new LocalStrategy({ usernameField: "email" }, function(
    email,
    password,
    done
  ) {
    User.findOne({ email }, function(err, user) {
      if (err) return done(err);
      if (!user || !user.validPassword(password))
        return done(null, false, { message: "Invalid email/password" });
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(user => done(null, user)).catch(done);
});

// ----------------------------------------
// Serve /public
// ----------------------------------------
app.use(express.static(`${__dirname}/public`));

// ----------------------------------------
// currentUser
// ----------------------------------------
app.use((req, res, next) => {
  if (req.user) res.locals.currentUser = req.user;
  next();
});

// ----------------------------------------
// Routers
// ----------------------------------------
const indexRouter = require("./routes/index")(passport);
app.use("/", indexRouter);
const ponzvertRouter = require("./routes/ponzvert");
app.use("/ponzvert", ponzvertRouter);

// ----------------------------------------
// Error Handler
// ----------------------------------------
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err.stack);
});

app.listen(process.env.PORT || 3001, () => {
  console.log("taking calls");
});
