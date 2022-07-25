import logger from "./log4js/index.js";

let instance = null;

export default class Logger {
  static getInstance() {
    if (!instance) {
      instance = new Logger();
    }
    return instance;
  }

  logRequests(req, res, next) {
    logger.info(`Path: ${req.path}, Method: ${req.method}`);
    next();
  }
}
