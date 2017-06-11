const express = require('express');
const Status = require('../models/status');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  Status.find({}, function(err, statuses) {
    res.status(200).json(statuses);
  });
});

router.post('/post-status', (req, res) => {
  console.log(req.body);
  Status.create({
    text: req.body.statusText,
    userId: req.user._id,
    likes: [],
    comments: [],
  }, function(err, status) {
    res.status(200).json(status);
  });
});

module.exports = router;
