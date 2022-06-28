// inisiasi penggunaan konfigurasi dari file .env
require("dotenv").config();
// import express
const express = require("express");
// import logger
const morgan = require("morgan");
// import route
const router = require("./router");
// import middleware
const clientError = require("./middleware/clientError");
const serverError = require("./middleware/serverError");
// inisiasi express
const app = express();
// konfigurasi port
const port = process.env.PORT;
// set folder public secara statis
app.use(express.static("public"));
// set ejs sebagai view engine
app.set("view engine", "ejs");
// implementasi logger
app.use(morgan("dev"));
// implementasi pembacaan body html
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// implementasi router
app.use(router);
// implementasi error handler
app.use(clientError.client);
app.use(serverError.server);
// running server
app.listen(port, () => {
  console.log(`Cashier app listening at http://localhost:${port}`);
});
