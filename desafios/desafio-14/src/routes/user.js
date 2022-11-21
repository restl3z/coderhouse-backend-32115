import { Router } from 'express';
import passport from 'passport';

const router = Router();

const authn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render('login');
  }
};

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.get('/', authn, (req, res) => {
  res.redirect('/welcome');
});

router.get('/sign-up', (req, res) => {
  res.render('signup');
});

router.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    failureRedirect: '/sign-up-error',
    successRedirect: '/welcome',
  })
);

router.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/login-error',
    successRedirect: '/welcome',
  })
);

router.get('/sign-up-error', (req, res) => {
  res.render('signup_error');
});

router.get('/login-error', (req, res) => {
  res.render('login_error');
});

router.get('/welcome', authn, (req, res) => {
  res.render('welcome', { username: req.user.username });
});

export default router;
