import dotenv from 'dotenv';

dotenv.config();

export const config = {
  MONGO_ATLAS_CNXSTR: process.env.MONGO_ATLAS_CNXSTR,
  SESSION_SECRET: process.env.SESSION_SECRET,
  PORT: process.env.PORT || 8080,
  SERVER_MODE: process.env.SERVER_MODE || 'FORK',
};
