import winston from "winston";

// Destructuring commonly used formats from winston
const { combine, timestamp, printf, colorize, align } = winston.format;

// Creating a logger instance
const logger = winston.createLogger({
  // Log level set to "info"
  level: "info",

  // Log format configuration using winston's combine function
  format: combine(
    // Add colors to log entries (console-only)
    colorize({ all: true }),

    // Add timestamp to log entries
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A", // Timestamp format
    }),

    // Align log entries
    align(),

    // Custom log entry format using printf
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),

  // Log transports configuration
  transports: [
    // Console transport for logging to the console
    new winston.transports.Console(),

    // File transport for logging to a combined log file
    new winston.transports.File({
      filename: "./logs/combined.log", // Path to the log file
    }),

    // File transport for logging errors to a separate error log file
    new winston.transports.File({
      filename: "./logs/app-error.log", // Path to the error log file
      level: "error", // Log only messages with error level or higher
    }),
  ],
});

// Exporting the logger instance for use in other modules
export default logger;
