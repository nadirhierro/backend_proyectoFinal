import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: "console" },
    warningFile: { type: "file", filename: "./logs/warning.log" },
    errorFile: { type: "file", filename: "./logs/error.log" },
    // niveles
    loggerInfo: {
      type: "logLevelFilter",
      appender: "console",
      level: "info",
    },
    loggerWarning: {
      type: "logLevelFilter",
      appender: "warningFile",
      level: "warn",
    },
    loggerError: {
      type: "logLevelFilter",
      appender: "errorFile",
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: ["console"],
      level: "all",
    },
    custom: {
      appenders: ["console", "loggerError", "loggerWarning", "loggerInfo"],
      level: "all",
    },
  },
});

const logger = log4js.getLogger("custom");

export default logger;
