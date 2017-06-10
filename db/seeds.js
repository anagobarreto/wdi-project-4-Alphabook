const config        = require('../server/config/index.json');
const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect(config.dbUri);

const User = require('../server/models/user');
const Status = require('../server/models/status');

let counter = 2;
function finished() {
  counter--;

  if (counter === 0) {
    mongoose.connection.close();
    process.exit();
  }
}

Status.collection.drop(function() {
  Status
    .create([
      {
        name: "Ana Barreto",
        profilePic: "/avatar.jpg",
        text: "This is a status",
        likeCount: 5,
        liked: false,
      },
      {
        name: "Ana McKenzie",
        profilePic: "/avatar.jpg",
        text: "This is a status tasdfasdf",
        likeCount: 8,
        liked: true,
      },
      {
        name: "Sebastian McKenzie",
        profilePic: "/avatar.jpg",
        text: "This is a status tasdfasdf",
        likeCount: 8,
        liked: true,
      },
      {
        name: "Sebastian Barreto",
        profilePic: "/avatar.jpg",
        text: "This is a status tasdfasdf",
        likeCount: 8,
        liked: true,
      }
    ])
    .then(statuses => {
      console.log(`${statuses.length} statuses were saved.`);
      finished();
    });
});

User.collection.drop(function() {
  User
    .create([
      {
        email: 'ana@ana.com',
        name: 'Ana Barreto',
        password: 'password'
      }
    ])
    .then(users => {
      console.log(`${users.length} users were saved.`);
      finished();
    });
});
