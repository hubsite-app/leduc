require('./config/config');

const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');

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
const port = process.env.PORT || 3000;

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
  if (req.session.user) {
    res.write('<p>Hello you have a session</p>');
    res.write("<a href='/signout' method='post'>Log Out</a>");
    res.end();
  } else {
    res.write('<p>You are not logged in</p>');
    res.end();
  }
})

app.get('/login', (req, res) => {
  res.render('login');
});

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

app.get('/signout', (req, res) => {
  res.clearCookie('connect.sid');

  req.session.destroy((err) => {
    res.redirect('/');
  })
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

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
      res.redirect('/');
    });
  } catch (e) {
    console.log('Body:', body);
    console.log(e);
    res.redirect('/signup');
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
