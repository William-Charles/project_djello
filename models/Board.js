const mongoose = require("mongoose");

const BoardSchema = mongoose.Schema(
  {
    title: { type: String },
    boardId: { type: String },
    owner: { type: mongoose.Schema.ObjectId, require: true, ref: "User" },
    members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    cards: [{ type: mongoose.Schema.ObjectId, ref: "List" }]
  },
  {
    timestamps: true
  }
);

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
