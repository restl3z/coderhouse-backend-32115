import log4js from 'log4js';

log4js.configure({
  appenders: {
    cli: { type: 'console' },
    warn_file: { type: 'file', filename: 'logs/warn.log' },
    error_file: { type: 'file', filename: 'logs/error.log' },
  },
  categories: {
    default: { appenders: ['cli'], level: 'info' },
    console: { appenders: ['cli'], level: 'info' },
    warn_file: { appenders: ['warn_file'], level: 'warn' },
    error_file: { appenders: ['error_file'], level: 'error' },
  },
});

const logger_console = log4js.getLogger('console');
const logger_warn_file = log4js.getLogger('warn_file');
const logger_error_file = log4js.getLogger('error_file');

export { logger_console, logger_warn_file, logger_error_file };
