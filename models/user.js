"use strict";
const shortId = require("shortid");
const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
      token: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      },
      instanceMethods: {
        validatePassword: function(password) {
          let passwordHash = this.getDataValue("passwordHash");
          return bcrypt.compareSync(password, passwordHash);
        }
      }
    }
  );

  User.beforeCreate(async function(user, options, done) {
    //passwordHash will temporarily be the actual password
    let password = user.getDataValue("passwordHash");
    let passwordHash = await bcrypt.hash(password, 8);
    user.setDataValue("passwordHash", passwordHash);
    done(null, options);
  });
  User.beforeCreate(async function(user, options, done) {
    //create token for user
    let email = user.getDataValue("email");
    let token = await bcrypt.hash(email + shortId.generate(), 8);
    user.setDataValue("token", token);
    done(null, options);
  });

  return User;
};
