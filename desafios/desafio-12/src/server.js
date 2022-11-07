import express from 'express';
import session from 'express-session';
import mongo_store from 'connect-mongo';

import mongodb_atlas_secrets from './secrets/mongodb_atlas.json' assert { type: 'json' };

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'SQD1lfhevS9hBXwEnv089g7m9qwQfATB',
    resave: true,
    saveUninitialized: true,
    store: mongo_store.create({
      mongoUrl: mongodb_atlas_secrets.connection_string,
    }),
    cookie: { maxAge: 600000 },
  })
);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  if (req.session.authenticated) {
    req.session.touch();
    res.render('pages/index', {
      authenticated: true,
      user_name: req.session.name,
    });
  } else {
    res.render('pages/index', { authenticated: false });
  }
});

app.post('/login', (req, res) => {
  req.session.regenerate(() => {
    for (const key in req.body) {
      req.session[key] = req.body[key];
    }
    req.session.authenticated = true;
    req.session.save(() => {
      res.redirect('/');
    });
  });
});

app.get('/logout', (req, res) => {
  const user_name = req.session.name;
  req.session.name = null;
  req.session.destroy(() => {
    res.render('pages/logout', { user_name: user_name });
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
