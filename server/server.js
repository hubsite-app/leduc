require('./config/config');

const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const {ObjectID} = require('mongodb');
const path = require('path');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Jobsite} = require('./models/jobsite');

const port = process.env.PORT || 3000;
var app = express();
var sess = {
  secret: 'bow-marks-big-secret',
  cookie: {},
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, '../public')));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// root
app.get('/', function(req, res, next) {
  if (req.session.user) {
    user = req.session.user;
    res.render('index', {serverMessage: `Hello ${user.name}, this is your session`});
  } else {
    res.render('index', {serverMessage: 'You are not logged in'});
  }
})

// GET /login
app.get('/login', (req, res) => {
  res.render('login');
});

// POST /login
app.post('/login', async (req, res) => {
  try {
    const user = await User.authenticateUser(req.body.email, req.body.password);
    req.session.regenerate(() => {
      req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
      res.redirect('/');
    });
  } catch (e) {
    console.log(e);
    req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ` (use "${req.body.email}" and "foobar")`;
    res.redirect('/login');
    res.status(400).send();
  }
});

// GET /logout
app.get('/logout', (req, res) => {
  res.clearCookie('connect.sid');

  req.session.destroy((err) => {
    res.redirect('/');
  });
});

// GET /signup
app.get('/signup', (req, res) => {
  res.render('signup');
});

// POST /signup
app.post('/signup', async (req, res) => {
  console.log('POST /signup');
  try {
    const user = new User(req.body);
    console.log('Before POST /signup save', req.body);
    await user.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    console.log('User is saved'); 
    req.session.regenerate(() => {
      req.session.user = user;
    });
    res.redirect('/');
  } catch (e) {
    console.log(e);
    res.redirect('/signup');
  }
});

// GET /users
app.get('/users', function (req, res) {
  User.find({}, (err, users) => {
    var userMap = [];
    users.forEach((user) => {
      userMap[user._id] = user;
    });
    res.render('userIndex', {array: userMap});
  });
});

// DELETE /users/:id
app.delete('/user/:id', async (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send;
  }
  try {
    const user = await User.findOneAndRemove({
      _id: id
    });
    if(!user) {
      return res.status(404).send();
    }
    req.session.destroy();
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /jobsite/new
app.get('/jobsite/new', async (req, res) => {
  res.render('newJobsite');
});

// POST /jobsite/new
app.post('/jobsite/new', async (req, res) => {
  console.log('POST /jobsite/new');
  var jobsite = new Jobsite(req.body);
  try {
    await jobsite.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  } catch (e) {
    console.log(e);
  }  
  res.redirect('/');
});

// GET /jobsites
app.get('/jobsites', (req, res) => {
  Jobsite.find({}, (err, jobsites) => {
    var jobsiteMap = [];
    jobsites.forEach((jobsite) => {
      jobsiteMap[jobsite._id] = jobsite;
    });
    res.render('jobsiteIndex', {array: jobsiteMap});
  });
});

// DELETE /jobsite/:id
app.delete('/jobsite/:id', async (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send;
  }
  try {
    const jobsite = await Jobsite.findOneAndRemove({
      _id: id
    });
    if(!jobsite) {
      return res.status(404).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app}