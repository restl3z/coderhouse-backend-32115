import mongoose from 'mongoose';

import { config } from '../../config/env.js';
import { logger_cli, logger_file } from '../../utils/logger.js';

mongoose
  .connect(config.MONGO_ATLAS_CNXSTR)
  .then(logger_cli.info('MongoDB connected!'))
  .catch((error) => {
    logger_cli.error(error);
    logger_file.error(error);
  });
