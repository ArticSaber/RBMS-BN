import { StatusCodes } from "http-status-codes";
import { logEvents } from "./logger.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong",
  };

  res.status(customError.statusCode).json({ message: customError.message });
};

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,"errLog.log");
  console.error(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status);
  res.json({ message: err.message });
};

export { errorHandlerMiddleware, errorHandler };
