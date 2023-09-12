const { createLogger, transports, format } = require("winston");
require("winston-mongodb");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

console.log(process.env.DATABASE);

const logger = createLogger({
  transports: [
    new transports.MongoDB({
      level: "error",
      db: process.env.DATABASE,
      collection: "Logs",
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.metadata({
          fillExcept: ["timestamp", "level", "message", "stack"],
        }),
        format.printf(({ level, message, timestamp, stack, metadata }) => {
          let logMessage = `${timestamp} ${level}: ${message}`;
          if (stack) {
            logMessage += `\n${stack}`;
          }
          if (metadata) {
            logMessage += `\n${JSON.stringify(metadata, null, 2)}`;
          }
          return logMessage;
        })
      ),
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

module.exports = logger;
