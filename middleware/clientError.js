const createError = require("http-errors");

// 404 Handler
const client = (req, res, next) => {
  res.status(createError(404).statusCode).json({
    status: createError(404).statusCode,
    message: createError(404).message,
  });
};

module.exports = {
  client,
};
