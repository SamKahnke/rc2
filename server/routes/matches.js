const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PG = require('pg');
const CONNECTION = 'postgres://postgres:password@localhost:5432/db_rc';
PG.defaults.ssl = true;

ROUTER.get('/', (req, res) => {
  PG.connect(CONNECTION, (err, client, done) => {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM matches', (err, response) => {
      done();
      res.send(response.rows);
    });
  });
});

ROUTER.post('/', (req, res) => {
  PG.connect(CONNECTION, (err, client, done) => {
    let match = req.body;
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO matches ' +
                '(team1, team2, t1_p1_score, t1_p2_score, t1_p3_score, t2_p1_score, ' +
                't2_p2_score, t2_p3_score, t1_p1, t1_p2, t1_p3, t2_p1, t2_p2, t2_p3, match_date) ' +
                'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
                [match.team1, match.team2, match.t1_p1_score, match.t1_p2_score,
                match.t1_p3_score, match.t2_p1_score, match.t2_p2_score,
                match.t2_p3_score, match.t1_p1, match.t1_p2, match.t1_p3,
                match.t2_p1, match.t2_p2, match.t2_p3, match.match_date,
                ],

                (err, result) => {
                  done();

                  if (err) {
                    res.sendStatus(500);
                    return;
                  }

                  res.sendStatus(201);
                });
  });
});

module.exports = ROUTER;
