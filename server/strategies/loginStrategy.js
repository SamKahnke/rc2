const PASSPORT = require('passport');
const LOCAL_STRATEGY = require('passport-local').Strategy;
const PG = require('pg');
const ENCRYPTION = require('../modules/encryption');
const CONNECTION = require('../modules/connection');

PASSPORT.serializeUser(function (user, done) {
  console.log('serialized: ', user);
  done(null, user.id);
});

PASSPORT.deserializeUser(function (id, done) {
  console.log('called deserializeUser');
  PG.connect(CONNECTION, function (err, client) {

    if (err) {
      console.log(err);
      done(err);
    }

    var user = {};

    client.query('SELECT * FROM users WHERE id = $1', [id], function (err, result) {
      client.end();

      if (err) {
        done(err);
      }

      user = result.rows[0];

      if (!user) {
        // User not found in database
        return done(null, false);
      } else {
        // User found in database
        console.log('User row:', user);
        done(null, user);
      }
    });
  });
});

PASSPORT.use('local',
  new LOCAL_STRATEGY(
    { passReqToCallback: true },
    function (req, username, password, done) {
      PG.connect(CONNECTION, function (err, client) {
        console.log('called local strategy');
        var user = {};
        const QUERY = client.query('SELECT * FROM users WHERE username = $1', [username]);

        QUERY.on('row', function (row) {
          console.log('User obj:', row);
          user = row;

          // Hash password and compare
          if (ENCRYPTION.comparePassword(password, user.password)) {
            console.log('passwords match');
            done(null, user);
          } else {
            console.log('password does not match');
            done(null, false, { message: 'Incorrect credentials.' });
          }
        });

        // End client connection and return results
        QUERY.on('end', function () {
          client.end();
        });

        if (err) {
          console.log(err);
        }
      });
    }
  )
);

module.exports = PASSPORT;
