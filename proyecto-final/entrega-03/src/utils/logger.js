import log4js from 'log4js';

log4js.configure({
  appenders: {
    cli: { type: 'console' },
    file: { type: 'file', filename: 'logs/server.log' },
  },
  categories: {
    default: { appenders: ['cli'], level: 'info' },
    CONSOLE: { appenders: ['cli'], level: 'info' },
    SERVER_LOG: { appenders: ['file'], level: 'warn' },
  },
});

const logger_cli = log4js.getLogger('CONSOLE');
const logger_file = log4js.getLogger('SERVER_LOG');

export { logger_cli, logger_file };
