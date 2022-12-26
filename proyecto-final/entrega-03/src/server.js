import express from 'express';
import session from 'express-session';
import mongo_store from 'connect-mongo';
import passport from 'passport';

import './passport/passport_local.js';
import './structures/config/mongodb_config.js';

import { config } from './config/env.js';
import { logger_cli, logger_file } from './utils/logger.js';
import router_authn from './routes/authn.js';
import router_products from './routes/products.js';
import router_carts from './routes/carts.js';

const server = (PORT) => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      saveUninitialized: false,
      resave: false,
      secret: config.SESSION_SECRET,
      store: mongo_store.create({
        mongoUrl: config.MONGO_ATLAS_CNXSTR,
      }),
      cookie: { maxAge: 60000 },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.set('views', './src/views');
  app.set('view engine', 'ejs');

  app.use('/', router_authn);
  app.use('/api/products', router_products);
  app.use('/api/carts', router_carts);

  try {
    app.listen(PORT, () => {
      logger_cli.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger_cli.error(error);
    logger_file.error(error);
  }
};

export default server;
