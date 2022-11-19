import mongoose from 'mongoose';

import mongodb_secrets from '../../secrets/mongodb_atlas.json' assert { type: 'json' };

mongoose
  .connect(mongodb_secrets.connection_string)
  .then(console.log('MongoDB connected!'))
  .catch((error) => {
    console.log(error);
  });
