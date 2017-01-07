const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PG = require('pg');
const CONNECTION = require('../modules/connection');

ROUTER.get('/', (req, res) => {
  PG.connect(CONNECTION, (err, client, done) => {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM users', (err, response) => {
      done();
      res.send(response.rows);
    });
  });
});

module.exports = ROUTER;
