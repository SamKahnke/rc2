const EXPRESS = require('express');
const APP = EXPRESS();
const BODY_PARSER = require('body-parser');
const PATH = require('path');

// Include Authentication
const PASSPORT = require('./strategies/loginStrategy.js');
const SESSION = require('express-session');

// Include Routes
const MATCHES = require('./routes/matches');
const USERS = require('./routes/users');
const LOGIN = require('./routes/login');
const REGISTER = require('./routes/register');
const USER = require('./routes/user');

// Body Parser Middleware
APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({ extended: true }));

// Configure Passport Session
APP.use(SESSION({
  secret: ['dX25mLLxxjzzze13299g'],
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
}));

// Start Passport Session
APP.use(PASSPORT.initialize());
APP.use(PASSPORT.session());

// Routes
APP.use('/matches', MATCHES);
APP.use('/users', USERS);
APP.use('/login', LOGIN);
APP.use('/register', REGISTER);
APP.use('/user', USER);

// Serve Files
APP.get('/*', function (req, res) {
  let file = req.params[0] || '/views/index.html';
  res.sendFile(PATH.join(__dirname, './public', file));
});

// App Set
APP.set('port', process.env.PORT || 3000);

// Listen
APP.listen(APP.get('port'), function () {
  console.log('Listening on port ', APP.get('port'));
});
