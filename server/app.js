const EXPRESS = require('express');
const APP = EXPRESS();
const BODY_PARSER = require('body-parser');
const PATH = require('path');
const MATCHES = require('./routes/matches');

APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: true }));

APP.use('/matches', MATCHES);

APP.get('/*', function (req, res) {
  let file = req.params[0] || '/views/index.html';
  res.sendFile(PATH.join(__dirname, './public', file));
});

APP.set('port', process.env.PORT || 3000);
APP.listen(APP.get('port'), function () {
  console.log('Listening on port ', APP.get('port'));
});
