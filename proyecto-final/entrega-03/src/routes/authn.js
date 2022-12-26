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
  res.redirect('/home');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post(
  '/register',
  passport.authenticate('register', {
    failureRedirect: '/register-error',
    successRedirect: '/home',
  })
);

router.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/login-error',
    successRedirect: '/home',
  })
);

router.get('/register-error', (req, res) => {
  res.render('register_error');
});

router.get('/login-error', (req, res) => {
  res.render('login_error');
});

router.get('/home', authn, (req, res) => {
  res.render('home', { username: req.user.username });
});

export default router;
