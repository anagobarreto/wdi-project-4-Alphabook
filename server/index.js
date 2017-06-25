const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const passport = require('passport');
const config = require('./config');
const os = require('os');
const multer = require('multer');

const upload = multer({dest: os.tmpdir()});

cloudinary.config({
  cloud_name: 'ddq2pvlfw',
  api_key: '421639664959279',
  api_secret: 'w5ugfOauFBwXKbhh4BcsjwvFncs'
});

require('./models').connect(process.env.MONGODB_URI || config.dbUri);

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
app.use('/auth', bodyParser.json());
app.use('/auth', authRoutes);


app.post('/upload-profile-pic', upload.single('photo'), authCheckMiddleware, (req, res) => {
  cloudinary.uploader.upload(req.file.path, function(result) {
    req.user.profilePic = result.url;
    req.user.save(() => {
      res.redirect('/profile/' + req.user._id);
    });
  })
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  app.get('/*', (req, res) => {
    res.sendFile('build/index.html', {root: __dirname + '/..'});
  });
} else {
  const proxy = require('http-proxy-middleware');
  app.use(proxy('/', {target: 'http://localhost:3000', ws: true}));
}

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running on http://localhost:3001');
});
