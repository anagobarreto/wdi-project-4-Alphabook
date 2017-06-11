const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

require('./models').connect(config.dbUri);

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(passport.initialize());

const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./middleware/auth-check');
const apiRoutes = require('./routes/api');
app.use('/api', bodyParser.json());
app.use('/api', authCheckMiddleware);
app.use('/api', apiRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', bodyParser.urlencoded({ extended: false }));
app.use('/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(app.static('build'));
} else {
  const proxy = require('http-proxy-middleware');
  app.use(proxy('/', {target: 'http://localhost:3000', ws: true}));
}

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
