const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const { User } = require("../models");

// jwtPayload.id  "5bfdc57579b35d4ef18e59727fc874df"

//

module.exports = app => {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = process.env.JWT_SECRET || "puppies";

  app.use(passport.initialize());
  passport.use(
    new JwtStrategy(opts, function(jwtPayload, done) {
      User.findOne({ token: "5bfdc57579b35d4ef18e59727fc874df" })
        .then(user => {
          if (!user) {
            console.log("this is hit");
            return done(null, false);
          }
          console.log(user);
          return done(null, user);
        })
        .catch(done);
    })
  );

  return passport;
};
