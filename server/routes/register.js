const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PASSPORT = require('passport');
const PATH = require('path');
const ENCRYPTION = require('../modules/encryption');
const CONNECTION = require('../modules/connection');
const PG = require('pg');

// Handle GET request for HTML file
ROUTER.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Handle POST request with new user data
ROUTER.post('/', (req, res, next) => {

  let user = {
    username: req.body.username,
    password: ENCRYPTION.encryptPassword(req.body.password),
  };

  console.log('User object:\n', user);

  POOL.connect(CONNECTION, (err, client, done) => {
    if (err) {
      console.log('Error connecting to server:\n', err);
      next(err);
    }

    client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',

      [user.username, user.password],

      (err, result) => {
        client.end();

        if (err) {
          console.log('Error inserting data: ', err);
          next(err);
        } else {
          res.redirect('/');
        }
      }
      );
  });
});

module.exports = ROUTER;
