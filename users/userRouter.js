const express = require("express");
const db = require("../data/dbConfig"); // database access using knex
const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((user) => {
      res.status(200).json({ data: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

router.post("/", (req, res) => {
  const user = req.body;
  if (isValidPost(user)) {
    db("accounts")
      .insert(user, "id")
      .then((ids) => {
        res.status(201).json({ data: ids });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: error });
      });
  } else {
    res
      .status(400)
      .json({ message: "please provide name and budget for the account" });
  }
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then((c) => {
      if (c) {
        res.status(201).json({ data: c });
      } else {
        res.status(404).json({ message: "no id" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

function isValidPost(post) {
  return Boolean(post.name && post.budget);
}

module.exports = router;
