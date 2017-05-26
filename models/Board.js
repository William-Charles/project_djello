const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema({
  title: { type: String },
  owner: { type: String, require: true, ref: "User" },
  members: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    default: []
  },
  cards: {
    type: [{ type: Object }],
    default: []
  }
});

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
