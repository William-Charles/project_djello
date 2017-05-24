"use strict";

const models = require("../models/");
const User = models.User;
module.exports = {
  up: function(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return User.create({
      fname: "Will",
      lname: "Whitworth",
      email: "admin@admin.com",
      passwordHash: "admin",
      username: "admin"
    });
    // return queryInterface.bulkInsert("Users", [{
    //   email: "admin@admin.com",
    //   passwordHash: "admin",
    //   token: ""
    // }], {});
  },

  down: function(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */

    return queryInterface.bulkDelete("Users", null, {}, models.User);
  }
};
