const PG = require('pg');
const CONNECTION = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/db_rc';
PG.defaults.ssl = process.env.DATABASE_URL ? true : false;

module.exports = CONNECTION;
