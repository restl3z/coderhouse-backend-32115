import yargs from 'yargs';
import cluster from 'cluster';
import os from 'os';

import server from './server.js';
import {
  logger_console,
  logger_warn_file,
  logger_error_file,
} from './logger.js';

process.on('warning', (warning) => {
  logger_console.warn(`${warning.name}: ${warning.message}`);
  logger_warn_file.warn(`${warning.name}: ${warning.message}`);
});

process.on('uncaughtException', (error) => {
  logger_console.error(error);
  logger_error_file.error(error);
  process.exit(1);
});

const args = yargs(process.argv.slice(2))
  .alias({
    p: 'port',
    m: 'mode',
  })
  .default({
    p: 8080,
    m: 'FORK',
  }).argv;

if (args.mode === 'CLUSTER') {
  if (cluster.isPrimary) {
    logger_console.info(
      `Starting server in CLUSTER mode... Primary process: ${process.pid}`
    );
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }

    cluster.on('exit', () => {
      cluster.fork();
    });
  } else {
    server(args.port);
  }
} else {
  logger_console.info(
    `Starting server in FORK mode... Process: ${process.pid}`
  );
  server(args.port);
}
