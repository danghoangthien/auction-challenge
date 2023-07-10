import { Response, Request, NextFunction } from "express";
import logger from "../util/logger";

/// catch 404 and forward to error handler
export const notFoundHandler = function (req: Request, res: Response, next: NextFunction) {
  logger.warn(`HTTP Request. Page not found, Path:${req.originalUrl}, Method: ${req.method}`);
  const err = { name: "NotFoundError", status: 404 };
  next(err);
};

const errorParser = function (req: Request, err: any) {
  let showWarning = true;
  switch (err.name) {
    case "InvalidParameterError":
      err.status = 400;
      break;
    case "InvalidAuthToken":
      err.status = 307;
      showWarning = false;
      break;
    case "AuthenticationError":
      err.status = 401;
      showWarning = false;
      break;
    case "InvalidWAXAccount":
      err.status = 401;
      break;
    case "TokenExpiredError":
      err.status = 401;
      break;
    case "ForbiddenTransactionException":
      err.status = 403;
      break;
    case "BannedAccount":
      err.status = 403;
      break;
    case "RateLimitError":
      err.status = 429;
      break;
    default:
      logger.error({
        error: err,
        request: {
          url: req.url,
          body: req.body,
          query: req.query,
        },
      });
  }
  if (showWarning) {
    logger.warn(
      `HTTP Request ${req.method} ${req.originalUrl} Code:${err.status} From: ${req.ip}. ${err.name}: ${err.message}, ${err.stack}} `,
    );
  }
};

/// error handlers
export const errorHandler = function (err: any, req: Request, res: Response, next: NextFunction) {
  if (err.status !== 404) {
    errorParser(req, err);
  }

  res.status(err.status || 500);
  res.json(
    Object.assign(err.data || {}, {
      error: err.name,
      message: err.message,
    }),
  );
};
