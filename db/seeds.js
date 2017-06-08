const env        = require('../config/env');
const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(env.db[process.env.NODE_ENV]);

const User = require('../models/user');

User.collection.drop();

User
  .create([
    {
      username: 'ana',
      email: 'ana@ana.com',
      password: 'password',
      image: 'http://fillmurray.com/200/200',
      location: 'W4 231',
      mobile: '07842147542'
    }, {
      username: 'marisa',
      email: 'marisa@marisa.com',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://fillmurray.com/200/200',
      location: 'W6 221',
      mobile: '07842147542'
    },{
      username: 'hassan',
      email: 'hassan@hassan.com',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://fillmurray.com/200/200',
      location: 'S4 121',
      mobile: '07842147542'
    },{
      username: 'jackie',
      email: 'jackie@jackie.com',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://fillmurray.com/200/200',
      location: 'M3 12M',
      mobile: '07842147542'
    },{
      username: 'bobby',
      email: 'bobby@bobby.com',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://fillmurray.com/200/200',
      location: 'M2 M22',
      mobile: '07842147542'
    }, {
      username: 'raul',
      email: 'raul@raul.com',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'http://fillmurray.com/200/200',
      location: 'S2 S32',
      mobile: '07842147542'
    }
  ])
  .then(users => {
    console.log(`${users.length} users were saved.`);
  })
  .finally(() => {
    mongoose.connection.close();
  });
