import express from 'express';
import session from 'express-session';
import mongo_store from 'connect-mongo';
import passport from 'passport';

import { config } from './config/env.js';
import router_user from './routes/user.js';
import router_info from './routes/info.js';
import router_randoms from './routes/randoms.js';
import './passport/passport_local.js';
import './db/config/mongodb.js';

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
  app.use('/', router_user);
  app.use('/info', router_info);
  app.use('/api/randoms', router_randoms);

  app.set('views', './src/views');
  app.set('view engine', 'ejs');

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

export default server;
