import { Router } from 'express';
import os from 'os';
import compression from 'compression';

import { logger_console } from '../logger.js';

const router = Router();

router.get('/', compression({ level: 9 }), (req, res) => {
  logger_console.info('GET /info');
  const info = {
    arguments: process.argv.slice(2),
    operating_system: process.platform,
    node_version: process.version,
    rss: process.memoryUsage().rss,
    execution_path: process.execPath,
    process_id: process.pid,
    project_folder: process.env.PWD,
    cpus: os.cpus().length,
  };
  res.render('info', { info });
});

export default router;
