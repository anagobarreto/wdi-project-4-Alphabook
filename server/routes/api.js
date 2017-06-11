const express = require('express');
const Status = require('../models/status');
const User = require('../models/user');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  Status
    .find({})
    .sort('-createdAt')
    .populate('user', 'name')
    .populate('likes', 'name')
    .then(function(statuses) {
      res.status(200).json(statuses);
    });
});

router.post('/like', (req, res) => {
  Status
    .findOne({id: req.body.status})
    .populate('likes')
    .then(status => {
      for (const like of status.likes) {
        if (like._id === req.user._id) {
          // already liked the comment
          res.json({success: false});
          return;
        }
      }

      status.likes.push(req.user);
      status.save(() => {
        res.json({success: true});
      });
    });
});

router.post('/current-user', (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
  });
});

router.post('/profile', (req, res) => {
  User
    .findOne({id: req.body.user})
    .then(user => {
      Status
        .find({user: user._id})
        .populate('likes', 'name')
        .then(statuses => {
          res.json({
            statuses,
            user: {name: user.name},
          });
        })
    });
});

router.post('/post-status', (req, res) => {
  Status.create({
    text: req.body.statusText,
    user: req.user._id,
    likes: [],
    comments: [],
  }, function(err, status) {
    Status
      .findOne({_id: status._id})
      .populate('user', 'name')
      .then(function(status) {
        res.status(200).json(status);
      });
  });
});

module.exports = router;
