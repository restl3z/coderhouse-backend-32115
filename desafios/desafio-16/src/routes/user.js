import { Router } from 'express';
import passport from 'passport';

import { logger_console } from '../logger.js';

const router = Router();

const authn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render('login');
  }
};

router.get('/logout', (req, res) => {
  logger_console.info('GET /logout');
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.get('/', authn, (req, res) => {
  logger_console.info('GET /');
  res.redirect('/welcome');
});

router.get('/sign-up', (req, res) => {
  logger_console.info('GET /sign-up');
  res.render('signup');
});

router.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    failureRedirect: '/sign-up-error',
    successRedirect: '/welcome',
  }),
  (req, res) => {
    logger_console.info('POST /sign-up');
  }
);

router.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/login-error',
    successRedirect: '/welcome',
  }),
  (req, res) => {
    logger_console.info('POST /login');
  }
);

router.get('/sign-up-error', (req, res) => {
  logger_console.info('GET /sign-up-error');
  res.render('signup_error');
});

router.get('/login-error', (req, res) => {
  logger_console.info('GET /login-error');
  res.render('login_error');
});

router.get('/welcome', authn, (req, res) => {
  logger_console.info('GET /welcome');
  res.render('welcome', { username: req.user.username });
});

export default router;
