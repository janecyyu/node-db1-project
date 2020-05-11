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

module.exports = router;
