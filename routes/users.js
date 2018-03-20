const express = require('express');
const { isLogedIn } = require('../utils/isLogedIn');

const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
// const Product = require('../models/product');

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', (req, res) => {
  const messages = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages,
    hasErrors: messages.length > 0,
  });
});
router.post(
  '/signup',
  passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true,
  }),
);

router.get('/signin', (req, res) => {
  const messages = req.flash('error');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages,
    hasErrors: messages.length > 0,
  });
});

router.post(
  '/signin',
  passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true,
  }),
);

router.get('/profile', isLogedIn, (req, res) => {
  res.render('user/profile');
});

module.exports = router;
