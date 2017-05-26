const express = require("express");
let router = express.Router();

const User = require("../models").User;
const Board = require("../models").Board;

router.get("/api/boards/:token", (req, res, next) => {
  // req.params.token = "5bfdc57579b35d4ef18e59727fc874df";
  Board.find({ owner: req.params.token }).then(results => {
    res.json(results);
  });
});
router.get("/boards", (req, res, next) => {
  Board.find({}).then(results => {
    res.json(results);
  });
});
router.get("/users", (req, res, next) => {
  User.find({}).then(results => {
    res.json(results);
  });
});

router.post("/api/boards/new", (req, res, next) => {
  let returnBoard;
  let newBoard = new Board({
    title: req.body.title,
    owner: req.body.token
  });
  newBoard
    .save()
    .then(board => {
      let returnBoard = board;
      res.json(returnBoard);
      let boardId = board.id.toString();
      return User.update(
        { id: req.body.token },
        { $push: { boards: boardId } }
      );
    })
    .catch(next);

  console.log(req.body);
});

module.exports = router;
