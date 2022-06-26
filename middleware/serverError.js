const createError = require("http-errors");

// Server Error Handler
const server = (err, req, res, next) => {
  res.status(createError(500).status).json({
    status: createError(500).status,
    errors: err.message,
  });
};

module.exports = {
  server,
};
