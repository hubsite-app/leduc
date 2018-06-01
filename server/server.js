require('./config/config');
require('newrelic');
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const {ObjectID} = require('mongodb');
const path = require('path');
const request = require('request');

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
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.baseUrl = req.headers.host;
  next();
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, '../public')));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// root
app.get('/', function(req, res, next) {
  if (req.session.user) {
    console.log(req.session.user);
    user = req.session.user;
    res.render('index', {serverMessage: `Hello ${user.name}, this is your session`});
  } else {
    res.render('login', {dangerMessage: 'You must be logged in to use this site'});
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
  try {
    await User.find({}, (err, users) => {
      var userMap = [];
      users.forEach((user) => {
        userMap[user._id] = user;
      });
      res.render('users/userIndex', {array: userMap});
    });
  } catch (e) {
    return console.log(e);
  }
});

// GET /user/:id
app.get('/user/:id', (req, res) => {
  if (req.session.user) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return console.log(err);
      }
      if (req.session.user === user || req.session.user.admin === true) {
        employeeArray = [];
        Employee.find({}, (err, employees) => {
          employees.forEach((employee) => {
            employeeArray[employee._id] = employee;
          });
          res.render('users/user', {user, employeeArray});
        });
      } else {
        res.render('userIndex');
      }
    });
  } else {
    res.render('login', {dangerMessage: 'Must be logged in'});
  }
  
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

// POST /user/:userId/employee/
app.post('/user/:id/employee', (req, res) => {
  var userId = req.params.id;
  var employeeId = req.body.employee;
  console.log(req.body);
  User.findById(userId, (err, user) => {
    if(err) {return console.log(err);}
    user.employee = employeeId;
    req.session.user.employee = employeeId;
    user.save((err) => {
      if(err) {console.log(err);}
    });
    console.log('User:', user)
    console.log('Session:', req.session.user);
    Employee.findById(employeeId, (err, employee) => {
      if(err) {return console.log(err);}
      employee.user = userId;
      employee.save((err) => {
        if(err) {return console.log(err);}
      });
      res.redirect('back');
    });
  });
});

// PATCH /user/:id/employee
app.patch('/user/:id/employee', async (req, res) => {
  var userId = req.params.id;
  User.findById(userId, (err, user) => {
    if (err) {return console.log(err);}
    Employee.findById(user.employee, async (err, employee) => {
      if (err) {return console.log(err);}
      user.employee = undefined;
      req.session.user.employee = undefined;
      employee.user = undefined;
      await user.save((err) => {
        if (err) {return console.log(err);}
      });
      console.log('User: ', user)
      console.log('Session:', req.session.user);
      await employee.save((err) => {
        if (err) {return console.log(err);}
      });
      res.redirect('back');
    });
  });
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
  var userArray = [];
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
      User.find({}, (err, users) => {
        if (err) {return console.log(err);}
        users.forEach((user) => {
          userArray[user._id] = user;
        });
        res.render('employees/employeeIndex', {employeeArray, crewArray, userArray});
      });
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
      res.render('employees/employee', {employee, crewArray});
    });
  })
});

// POST /employee
app.post('/employee', async (req, res) => {
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

// POST /employee/user/:id
app.post('/employee/user/:id', async (req, res) => {
  var employee = new Employee(req.body);
  try {
    await employee.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    await User.findById(employee.user, (err, user) => {
      if (err) {return console.log(err);}
      user.employee = employee._id;
      user.save((err) => {
        if (err) {return console.log(err);}
      })
    });
    res.redirect('back');
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }  
  
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