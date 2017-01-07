const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PASSPORT = require('passport');

ROUTER.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send(false);
  }
});

ROUTER.get('/logout', (req, res) => {
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

module.exports = ROUTER;
