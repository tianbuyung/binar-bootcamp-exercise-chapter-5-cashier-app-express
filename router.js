const express = require("express");
const router = express.Router();
const fs = require("fs");

router.use(function timelog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.render("index", {
      menu: JSON.parse(data),
    });
  });
});

module.exports = router;
