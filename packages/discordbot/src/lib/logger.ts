import winston, { format, createLogger } from 'winston';
import color from '@heroku-cli/color';

const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.printf(({ level, message, timestamp }) => {
    let outputMsg = message as string;
    if (typeof message === 'object') outputMsg = JSON.stringify(message);

    return color.app(`[${timestamp as string}] (${level}) ${outputMsg} `);
  }),
);

const customLevel = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => (process.env.NODE_ENV === 'development' ? 'debug' : 'info');

const logger = createLogger({
  transports: [new winston.transports.Console()],
  level: level(),
  levels: customLevel,
  format: customFormat,
});

export default logger;
