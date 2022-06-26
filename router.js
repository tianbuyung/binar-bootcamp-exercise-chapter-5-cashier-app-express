const express = require("express");
const router = express.Router();

router.use(function timelog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  // res.send("Cashier App Homepage");
  const name = req.query.name || "Void";
  res.render("index", {
    name,
  });
});

module.exports = router;
