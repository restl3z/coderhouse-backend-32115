import passport from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import model_user from '../structures/models/model_user.js';

const salt = bcrypt.genSaltSync(10);

passport.use(
  'register',
  new LocalStategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const db_user = await model_user.findOne({ username });
      if (db_user) {
        return done(null, false);
      } else {
        const new_user = new model_user();
        new_user.username = username;
        new_user.password = bcrypt.hashSync(password, salt);
        new_user.name = req.body.name;
        new_user.email = req.body.email;
        new_user.address = req.body.address;
        new_user.age = req.body.age;
        new_user.phone = req.body.phone;
        new_user.save();
        done(null, new_user);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const db_user = await model_user.findOne({ username });
      if (db_user && bcrypt.compareSync(password, db_user.password)) {
        return done(null, db_user);
      }
      return done(null, false);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const db_user = await model_user.findById(id);
  done(null, db_user);
});
