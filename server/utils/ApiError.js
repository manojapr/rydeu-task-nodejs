const errorMiddleware = require("../middleware/error.middlewares")

/**
 * @description Common Error class to throw an error from anywhere.
 * The {@link errorHandler} middleware will catch this error at the central place and it will return an appropriate response to the client
 */
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = {ApiError}
