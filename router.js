const express = require("express");
const router = express.Router();
const fs = require("fs");

router.use(function timelog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
// Create new data
router.post("/add", (req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) throw err;
    const name = req.body.name;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);
    const menus = JSON.parse(data);
    menus.push({
      name: name,
      price: price,
      quantity: quantity,
      id: menus[menus.length - 1].id + 1,
      status: true,
    });
    fs.writeFile("./data.json", JSON.stringify(menus), (err) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});
// Read all data
router.get("/", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) throw err;
    const menus = JSON.parse(data);
    const menusFiltered = menus.filter((menu) => {
      return menu.status !== false;
    });
    res.render("index", {
      menu: menusFiltered,
    });
  });
});
// Read detail data
router.get("/view/:id", (req, res) => {
  const idForView = Number(req.params.id);
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) throw err;
    const menus = JSON.parse(data);
    const menusFiltered = menus.filter((menu) => {
      return menu.id === idForView;
    });
    res.render("view-menu", {
      menu: menusFiltered,
    });
  });
});
// Update data
router.get("/edit/:id", (req, res) => {
  const idForEdit = Number(req.params.id);
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) throw err;
    const menus = JSON.parse(data);
    const menusFiltered = menus.filter((menu) => {
      return menu.id === idForEdit;
    });
    console.log(menusFiltered[0].name);
    res.render("edit-menu", {
      editMenu: menusFiltered,
    });
  });
});
router.post("/edit", (req, res) => {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) throw err;
    const name = req.body.name;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);
    const id = Number(req.body.id);
    const status = req.body.status === "true";
    let menus = JSON.parse(data);
    menus[id - 1] = {
      name: name,
      price: price,
      quantity: quantity,
      id: id,
      status: status,
    };
    fs.writeFile("./data.json", JSON.stringify(menus), (err) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});
// Delete data
router.get("/delete/:id", (req, res) => {
  const idForDeleted = Number(req.params.id);
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) throw err;
    const menus = JSON.parse(data);
    menus.forEach((menu) => {
      if (menu.id === idForDeleted) {
        menu.status = false;
      }
    });
    fs.writeFile("./data.json", JSON.stringify(menus), (err) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

module.exports = router;
