import winston, { transport } from "winston";
import config from "./config.js";

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    http: 3,
    info: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    http: "red",
    info: "blue",
    debug: "white",
  },
};

//logger en prod

const prodLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transport.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transport.File({
      filename: "./errors.log",
      level: "warning",
      format: winston.format.simple(),
    }),
  ],
});

//Logger en dev

const devLogger = winston.createLogger({
  level: customLevelsOptions.levels,
  transports: [
    new winston.transport.Console({ level: "http" }),
    new winston.transport.File({ filename: "./errors.log", level: "warn" }),
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
