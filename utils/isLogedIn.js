function isLogedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
}

module.exports = {
  isLogedIn,
};
