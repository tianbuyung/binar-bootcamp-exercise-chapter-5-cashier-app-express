const createError = require("http-errors");

// Server Error Handler
const server = (err, req, res, next) => {
  res.status(500).json({
    status: 500,
    errors: err.message,
  });
};

module.exports = {
  server,
};
