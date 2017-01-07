const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PASSPORT = require('passport');
const PATH = require('path');

ROUTER.post('/',
  PASSPORT.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
  })
);

ROUTER.get('/', function (req, res) {
  res.sendFile(PATH.join(__dirname, '../public/templates/login.html'));
});

module.exports = ROUTER;
