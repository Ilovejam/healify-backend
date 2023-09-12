const AppError = require("./../utils/appError");
const logger = require("../logs/logger");
const os = require("os");
const { currentUserByRequest } = require("./../utils/currentUser");
const catchAsync = require("../utils/catchAsync");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDb = (err) => {
  const value = err.errmsg.match(/(['"'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = (err) =>
  new AppError("Your token has expired! Please log in again!", 401);

const sendErrorDev = async (err, req, res) => {
  const user = await currentUserByRequest(req);
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const loggerInfo = {
    message: err.message,
    meta: {
      url: req.originalUrl,
      statusCode: err.statusCode,
      stack: err.stack,
      request: {
        ip: ipAddress ? ipAddress : null,
        headers: req.headers,
        body: req.body,
        query: req.query,
        params: req.params,
      },
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      serverInfo: {
        hostname: os.hostname(),
        platform: os.platform(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        uptime: os.uptime(),
      },
    },
  };

  if (user) {
    loggerInfo.meta.user = {
      name: user.name || null,
      email: user.email || null,
      role: user.role || null,
    };
  } else {
    loggerInfo.meta.user = null;
  }

  logger.error(loggerInfo);

  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }
};

const sendErrorProd = async (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    const user = await currentUserByRequest(req);
    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const loggerInfo = {
      message: err.message,
      meta: {
        url: req.originalUrl,
        statusCode: err.statusCode,
        stack: err.stack,
        request: {
          ip: ipAddress ? ipAddress : null,
          headers: req.headers,
          body: req.body,
          query: req.query,
          params: req.params,
        },
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        serverInfo: {
          hostname: os.hostname(),
          platform: os.platform(),
          totalMemory: os.totalmem(),
          freeMemory: os.freemem(),
          uptime: os.uptime(),
        },
      },
    };

    if (user) {
      loggerInfo.meta.user = {
        name: user.name || null,
        email: user.email || null,
        role: user.role || null,
      };
    } else {
      loggerInfo.meta.user = null;
    }

    logger.error(loggerInfo);

    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    res.status(500).json({
      status: "Something went wrong!",
      message: "Please try again later.",
    });
  }
};

const sendErrorTest = async (err, req, res) => {
  const user = await currentUserByRequest(req);
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const loggerInfo = {
    message: err.message,
    meta: {
      url: req.originalUrl,
      statusCode: err.statusCode,
      stack: err.stack,
      request: {
        ip: ipAddress ? ipAddress : null,
        headers: req.headers,
        body: req.body,
        query: req.query,
        params: req.params,
      },
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      serverInfo: {
        hostname: os.hostname(),
        platform: os.platform(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        uptime: os.uptime(),
      },
    },
  };

  if (user) {
    loggerInfo.meta.user = {
      name: user.name || null,
      email: user.email || null,
      role: user.role || null,
    };
  } else {
    loggerInfo.meta.user = null;
  }

  logger.error(loggerInfo);

  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
    });
  }
};

module.exports = (err, req, res, next) => {
  //   console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV.trim() === "development") {
    let error = Object.create(err);
    error.message = err.message;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDb(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV.trim() === "production") {
    let error = Object.create(err);
    error.message = err.message;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDb(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  } else if (process.env.NODE_ENV.trim() === "test") {
    let error = Object.create(err);
    error.message = err.message;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDb(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorTest(error, req, res);
  }
};
