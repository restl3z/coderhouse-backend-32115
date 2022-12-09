import autocannon from 'autocannon';
import { PassThrough } from 'stream';

import { logger_console } from '../src/logger.js';

const run = (url) => {
  const buffer = [];
  const output_stream = new PassThrough();

  const init = autocannon({
    url,
    connections: 100,
    duration: 20,
  });

  autocannon.track(init, { output_stream });

  output_stream.on('data', (data) => {
    buffer.push(data);
  });

  init.on('done', () => {
    process.stdout.write(Buffer.concat(buffer));
  });
};

logger_console.info('Running benchmarks');

run('http://localhost:8080/info');
