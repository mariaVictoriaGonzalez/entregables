import winston, { transports } from "winston";
import config from "./config.js";

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "blue",
    http: "red",
    debug: "white",
  },
};

//logger en prod

const prodLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});

//Logger en dev

const devLogger = winston.createLogger({
  level: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({ filename: "./errors.log", level: "error" }),
  ],
});

//middleware

export const addLogger = (req, res, next) => {
  if (config.environment === "production") {
    req.logger = prodLogger;

    req.logger.warning(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    );
    req.logger.http(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    );
    req.logger.error(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    );
  } else {
    req.logger = devLogger;

    req.logger.warning(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    );
    req.logger.http(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    );
    req.logger.error(
      `${req.method} en ${
        req.url
      } - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    );
  }
  next();
};
