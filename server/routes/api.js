const express = require('express');
const Status = require('../models/status');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  Status.find({}, function(err, statuses) {
    res.status(200).json(statuses);
  });
});

module.exports = router;
