import mongoose from 'mongoose';

import { config } from '../../config/env.js';

mongoose
  .connect(config.MONGO_ATLAS_CNXSTR)
  .then(console.log('MongoDB connected!'))
  .catch((error) => {
    console.log(error);
  });
