import cluster from 'cluster';
import os from 'os';

import server from './server.js';
import { config } from './config/env.js';
import { logger_cli, logger_file } from './utils/logger.js';

process.on('warning', (warning) => {
  logger_cli.warn(`${warning.name}: ${warning.message}`);
  logger_file.warn(`${warning.name}: ${warning.message}`);
});

process.on('uncaughtException', (error) => {
  logger_cli.error(error);
  logger_file.error(error);
  process.exit(1);
});

if (config.SERVER_MODE === 'CLUSTER') {
  if (cluster.isPrimary) {
    logger_cli.info(
      `Starting server in CLUSTER mode... | Primary process: ${process.pid}`
    );
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }

    cluster.on('exit', () => {
      cluster.fork();
    });
  } else {
    server(config.PORT);
  }
} else {
  logger_cli.info(`Starting server in FORK mode... | Process: ${process.pid}`);
  server(config.PORT);
}
