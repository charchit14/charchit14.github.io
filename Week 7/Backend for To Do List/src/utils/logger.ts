import winston, { format } from 'winston';

const logFormat = format.printf((info) => {
  const formattedNamespace = info.metadata.namespace || '';

  return `${info.timestamp} [${info.level}] [${formattedNamespace}]: ${info.message}`;
});

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata({
      fillExcept: ['message', 'level', 'timestamp'],
    }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize()),
      level: 'info',
    }),
  ],
});
const loggerWithNameSpace = function (namespace: string) {
  return logger.child({ namespace });
};

export default loggerWithNameSpace;
