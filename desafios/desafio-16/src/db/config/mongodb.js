import mongoose from 'mongoose';

import { config } from '../../config/env.js';
import { logger_console, logger_error_file } from '../../logger.js';

mongoose
  .connect(config.MONGO_ATLAS_CNXSTR)
  .then(logger_console.info('MongoDB connected!'))
  .catch((error) => {
    logger_console.error(error);
    logger_error_file.error(error);
  });
