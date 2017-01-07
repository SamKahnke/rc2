const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PG = require('pg');
const CONNECTION = require('../modules/connection');

ROUTER.get('/', (req, res) => {
  PG.connect(CONNECTION, (err, client, done) => {
    console.log('get called in matches.js');
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM matches', function (err, response) {
      console.log('client.query called in matches.js');
      done();
      console.log('after done called in matches.js');
      res.send(response.rows);
      console.log('response.rows: ', response.rows);
    });
  });
});

ROUTER.post('/', (req, res) => {
  PG.connect(CONNECTION, (err, client, done) => {
    if (err) {
      res.sendStatus(500);
    }

    let match = req.body;

    client.query('INSERT INTO matches ' +
      '(team1, team2, t1_p1_score, t1_p2_score, t1_p3_score, t2_p1_score, ' +
      't2_p2_score, t2_p3_score, t1_p1, t1_p2, t1_p3, t2_p1, t2_p2, t2_p3, match_date, ' +
      't1_p1_goals, t1_p1_assists, t1_p1_saves, t1_p1_shots, ' +
      't1_p2_goals, t1_p2_assists, t1_p2_saves, t1_p2_shots, ' +
      't1_p3_goals, t1_p3_assists, t1_p3_saves, t1_p3_shots, ' +
      't2_p1_goals, t2_p1_assists, t2_p1_saves, t2_p1_shots, ' +
      't2_p2_goals, t2_p2_assists, t2_p2_saves, t2_p2_shots, ' +
      't2_p3_goals, t2_p3_assists, t2_p3_saves, t2_p3_shots) ' +

      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, ' +
      '$14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, ' +
      '$27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39)',

      [match.team1, match.team2, match.t1_p1_score, match.t1_p2_score,
      match.t1_p3_score, match.t2_p1_score, match.t2_p2_score,
      match.t2_p3_score, match.t1_p1, match.t1_p2, match.t1_p3,
      match.t2_p1, match.t2_p2, match.t2_p3, match.match_date,
      match.t1_p1_goals, match.t1_p1_assists, match.t1_p1_saves, match.t1_p1_shots,
      match.t1_p2_goals, match.t1_p2_assists, match.t1_p2_saves, match.t1_p2_shots,
      match.t1_p3_goals, match.t1_p3_assists, match.t1_p3_saves, match.t1_p3_shots,
      match.t2_p1_goals, match.t2_p1_assists, match.t2_p1_saves, match.t2_p1_shots,
      match.t2_p2_goals, match.t2_p2_assists, match.t2_p2_saves, match.t2_p2_shots,
      match.t2_p3_goals, match.t2_p3_assists, match.t2_p3_saves, match.t2_p3_shots,
      ],

      (err, result) => {
        done();
        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      }
    );
  });
});

module.exports = ROUTER;
