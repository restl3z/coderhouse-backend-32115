import dotenv from 'dotenv';

dotenv.config({ path: `${process.env.PWD}/src/.env` });

export const config = {
  MONGO_ATLAS_CNXSTR: process.env.MONGO_ATLAS_CNXSTR,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
