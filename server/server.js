require('./config/config');
require('newrelic');
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
var {Employee} = require('./models/employee');
var {Crew} = require('./models/crew');

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
  res.render('users/signup');
});

// POST /signup
app.post('/signup', async (req, res) => {
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
    console.log(e);
    res.redirect('users/signup');
  }
});

// GET /users
app.get('/users', async (req, res) => {
  await User.find({}, (err, users) => {
    var userMap = [];
    users.forEach((user) => {
      userMap[user._id] = user;
    });
    res.render('users/userIndex', {array: userMap});
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

// POST /user/update/:id
app.post('/user/update/:id', async (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['name']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  try {
    await User.findOneAndUpdate({_id: id}, {$set: body}, {new: true});
    res.redirect('back');
  } catch (e) {
    console.log(e);
    res.render('/');
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

// GET /jobsite/:id
app.get('/jobsite/:id', (req, res) => {
  Jobsite.findById(req.params.id, (err, jobsite) => {
    res.render('jobsite', {jobsite});
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

// GET /employees
app.get('/employees', (req, res) => {
  var employeeArray = [];
  var crewArray = [];
  Employee.find({}, (err, employees) => {
    if (err) {
      console.log(err);
      return;
    }
    employees.forEach((employee) => {
      employeeArray[employee._id] = employee;
    });
    Crew.find({}, (err, crews) => {
      if (err) {
        console.log(err);
        return;
      }
      crews.forEach((crew) => {
        crewArray[crew._id] = crew;
      });
      res.render('employeeIndex', {employeeArray, crewArray});
    });
  });
});

// GET /employee/:id
app.get('/employee/:id', (req, res) => {
  Employee.findById(req.params.id, (err, employee) => {
    crewArray = [];
    Crew.find({
      '_id': {$in: employee.crews}
    }, (err, crews) => {
      if (err) {
        return console.log(err);
      }
      crews.forEach((crew) => {
        crewArray[crew._id] = crew;
      })
      console.log(crewArray);
      res.render('employee', {employee, crewArray});
    });
  })
});

// POST /employees
app.post('/employees', async (req, res) => {
  var employee = new Employee(req.body);
  try {
    await employee.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }  
  res.redirect('back');
});

// DELETE /employee/:id
app.delete('/employee/:id', async (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send;
  }
  try {
    const employee = await Employee.findOneAndRemove({
      _id: id
    });
    if(!employee) {
      return res.status(404).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// POST /crew
app.post('/crew', async (req, res) => {
  var crew = new Crew(req.body);
  try {
    await crew.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    res.redirect('back');
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
});

// GET /crews
app.get('/crews', (req, res) => {
  Crew.find({}, async (err, crews) => {
    var crewMap = [];
    crews.forEach((crew) => {
      crewMap[crew._id] = crew;
    });
    await Employee.find({}, (err, employees) => {
      var employeeMap = [];
      employees.forEach((employee) => {
        employeeMap[employee._id] = employee;
      });
      res.render('crews', {crewArray: crewMap, employeeArray: employeeMap});
    });
  });
});

// DELETE /crew/:id
app.delete('/crew/:id', async (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send;
  }
  try {
    const crew = await Crew.findOneAndRemove({
      _id: id
    });
    if(!crew) {
      return res.status(404).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// POST /crew/:crewId/employee/:employeeId
app.post('/crew/:crewId/employee/:employeeId', async (req, res) => {
  var crewId = req.params.crewId;
  var employeeId = req.params.employeeId;
  if (!ObjectID.isValid(crewId) && !ObjectID.isValid(employeeId)) {
    return res.status(404).send();
  }
  try {
    await Crew.findById(crewId, async (err, crew) => {
      await Employee.findById(employeeId, async (err, employee) => {
        crew.employees.push(employee);
        await crew.save((err) => {
          if (err) {
            console.log(err);
          }
        });
        employee.crews.push(crew);
        await employee.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    });
  } catch (e) {
    console.log(e);
    res.render('/');
  }
});

// DELETE /crew/:crewId/employee/:employeeId
app.delete('/crew/:crewId/employee/:employeeId', async (req, res) => {
  var crewId = req.params.crewId;
  var employeeId = req.params.employeeId;
  if (!ObjectID.isValid(crewId) && !ObjectID.isValid(employeeId)) {
    return res.status(404).send();
  }
  try {
    await Crew.findByIdAndUpdate({_id: crewId}, {$pull: {employees: employeeId}}, (err, crew) => {
      if (err) {
        console.log(err);
      }
    });
    await Employee.findByIdAndUpdate({_id: employeeId}, {$pull: {crews: crewId}}, (err, crew) => {
      if (err) {
        console.log(err);
      }
    })
  } catch (e) {
    return console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app}