import { Router } from 'express';
import os from 'os';

const router = Router();

router.get('/', (req, res) => {
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
