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
// Seeding
// ----------------------------------------
// const User = require("./models").User;
// let user = new User({
//   email: "willw10@hotmail.com",
//   password: "123456",
//   picture: "http://theredlist.com/media/database/films/cinema/2000/avatar-/027-avatar-theredlist.jpg"
// });
// user.save();

// const Board = require("./models").Board;
// let board = new Board({
//   title: "First Test Board",
//   owner: "c3409def3b5d2ae78b88d88ecfe94cb3"
// });
// board.save();

// ----------------------------------------
// Body Parser
// ----------------------------------------
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

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
const passport = require("./services/passport")(app);
const auth = require("./routes/auth")(passport);
app.use(auth);

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

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
