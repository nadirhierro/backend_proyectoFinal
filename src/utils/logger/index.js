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

  logWrongData(err) {
    logger.info(`Error: ${err}`);
    logger.error(`Error: ${err}`);
  }

  logDatabaseError(err) {
    logger.info(`DATABASE ERROR: ${err}`);
    logger.error(`DATABASE ERROR: ${err}`);
  }

  logServiceError(which, err) {
    logger.info(`SERVICE ERROR -- ${which} -- ${err}`);
    logger.error(`SERVICE ERROR -- ${which} -- ${err}`);
  }
}
