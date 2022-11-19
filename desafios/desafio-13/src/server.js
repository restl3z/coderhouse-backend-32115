import express from 'express';
import session from 'express-session';
import mongo_store from 'connect-mongo';
import passport from 'passport';

import router_user from './routes/user.js';
import mongodb_secrets from './secrets/mongodb_atlas.json' assert { type: 'json' };
import './passport/passport_local.js';
import './db/config/mongodb.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: 'superSecretKey',
    store: mongo_store.create({
      mongoUrl: mongodb_secrets.connection_string,
    }),
    cookie: { maxAge: 60000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router_user);

app.set('views', './src/views');
app.set('view engine', 'ejs');

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
