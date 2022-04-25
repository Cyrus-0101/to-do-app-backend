/**
 * AppError is a class that extends the Error class.
 * It takes a message and a statusCode. Checks whether
 * the status code begins with '4' then returns appropriate error message.
 * This is our default `route not found` error handler,
 * that helps users navigate if they enter an unknown error.
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
