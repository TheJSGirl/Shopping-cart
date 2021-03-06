const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, { message: 'Email is already in use' });
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save((newErr, result) => {
          if (newErr) {
            return done(newErr);
          }
          return done(null, newUser);
        });
      });
    },
  ),
);

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'user not found' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'wrong password' });
        }
        return done(null, user);
      });
    },
  ),
);
