const session = require('express-session');
const MongoStore = require('connect-mongo');
const { mongoDB } = require('./db');

module.exports = session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoDB })
});
