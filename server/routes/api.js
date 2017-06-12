const express = require('express');
const Status = require('../models/status');
const User = require('../models/user');

const router = new express.Router();

function doesFollow(req, user) {
  return Boolean(req.user.follows.find(id => id.equals(user._id)));
}

router.get('/dashboard', (req, res) => {
  Status
    .find({
      user: {
        '$in': req.user.follows.concat(req.user._id),
      }
    })
    .sort('-createdAt')
    .populate('user', 'name profilePic')
    .populate('likes', 'name')
    .populate('comments.user', 'name profilePic')
    .then(function(statuses) {
      res.status(200).json(statuses);
    });
});

router.post('/delete-post', (req, res) => {
  Status
    .findOne({_id: req.body.status, user: req.user._id})
    .remove()
    .then(status => {
      res.json({});
    });
});

router.post('/save-post', (req, res) => {
  Status
    .findOne({_id: req.body.status, user: req.user._id})
    .then(status => {
      status.text = req.body.text;

      status.save(() => {
        res.json({});
      })
    });
});

router.post('/follow', (req, res) => {
  req.user.follows.push(req.body.user);
  req.user.save(() => {
    res.json({});
  });
});

router.post('/unfollow', (req, res) => {
  req.user.follows = req.user.follows.filter(id => {
    return id.toString() !== req.body.user;
  });
  req.user.save(() => {
    res.json({});
  });
});

router.get('/users', (req, res) => {
  User
    .find({})
    .then(users => {
      res.json(users.map(user => {
        return {
          id: user._id,
          name: user.name,
          profilePic: user.profilePic,
          follows: doesFollow(req, user)
        };
      }));
    })
});

router.post('/like', (req, res) => {
  Status
    .findOne({_id: req.body.status})
    .populate('likes')
    .then(status => {
      if (!status) {
        res.json({success: false});
        return;
      }

      for (const like of status.likes) {
        if (like.id === req.user.id) {
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

router.post('/add-comment', (req, res) => {
  Status
    .findOne({_id: req.body.status})
    .then(status => {
      if (!status) {
        res.json({success: false});
        return;
      }

      status.comments.push({
        text: req.body.comment,
        user: req.user,
      });

      status.save(() => {
        res.json({success: true});
      });
    });
});

router.post('/unlike', (req, res) => {
  Status
    .findOne({_id: req.body.status})
    .populate('likes')
    .then(status => {
      if (!status) {
        res.json({success: false});
        return;
      }

      status.likes = status.likes.filter(user => {
        return user.id !== req.user.id;
      });

      status.save(() => {
        res.json({success: true});
      });
    });
});

router.get('/current-user', (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    profilePic: req.user.profilePic
  });
});

router.post('/profile', (req, res) => {
  User
    .findOne({_id: req.body.user})
    .then(user => {
      Status
        .find({user: user._id})
        .populate('likes', 'name')
        .populate('comments.user', 'name profilePic')
        .then(statuses => {
          res.json({
            follows: doesFollow(req, user),
            statuses,
            user: {id: user._id, name: user.name, profilePic: user.profilePic},
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
      .populate('user', 'name profilePic')
      .then(function(status) {
        res.status(200).json(status);
      });
  });
});

module.exports = router;
