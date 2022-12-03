import yargs from 'yargs';
import cluster from 'cluster';
import os from 'os';

import server from './server.js';

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
    console.log(
      `Starting server in CLUSTER mode...\nPrimary process: ${process.pid}`
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
  console.log(`Starting server in FORK mode...\nProcess: ${process.pid}`);
  server(args.port);
}
