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
const {mongoose} = require('./db/mongoose');

const {User} = require('./models/user');
const {Jobsite} = require('./models/jobsite');
const {Employee} = require('./models/employee');
const {Vehicle} = require('./models/vehicle');
const {Crew} = require('./models/crew');
const {DailyReport} = require('./models/dailyReport');
const {EmployeeWork} = require('./models/employeeWork');
const {VehicleWork} = require('./models/vehicleWork');
const {Production} = require('./models/production');
const {MaterialShipment} = require('./models/materialShipment');
const {ReportNote} = require('./models/reportNote');

const port = process.env.PORT || 300;
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
  res.locals.stuff = {
    query: req.query
  }
  next();
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, '../public')));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

// root
app.get('/', async (req, res, next) => {
  const user = req.session.user;
  if (user) {
    if(!req.session.user.employee) {
      var dangerMessage = encodeURIComponent('Please link your account with a Bow Mark employee');
      res.redirect(`/user/${req.session.user._id}/?dangerMessage=${dangerMessage}`);
    }
    var crewArray = [];
    var jobArray = [];
    var crewArray = await Crew.find({employees: user.employee}, (err, crews) => {
      if(err) {return console.log(err);}
    });
    Jobsite.find({}, async (err, jobsites) => {
      if(err) {return console.log(err);}
      await jobsites.forEach((jobsite) => {
        jobArray[jobsite._id] = jobsite;
      });
      res.render('index', {jobArray, crewArray});
    });
    
  } else {
    res.render('login', {dangerMessage: 'You must be logged in to use this site'});
  }
})

// GET /login
app.get('/login', (req, res) => {
  if (!req.session.user) {
    res.render('login');
  } else {
    res.redirect('/');
  }
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
    res.render('login', {dangerMessage: e});
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
    await user.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
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
  var dangerMessage = req.query.dangerMessage;
  if (req.session.user) {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return console.log(err);
      }
      if (req.session.user._id == user._id || req.session.user.admin == true) {
        employeeArray = [];
        Employee.find({}, (err, employees) => {
          employees.forEach((employee) => {
            employeeArray[employee._id] = employee;
          });
          res.render('users/user', {user, employeeArray, dangerMessage});
        });
      } else {
        var dangerMessage = encodeURIComponent("You are not authorized to view this account");
        res.redirect(`/users/?dangerMessage=${dangerMessage}`);
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
    })
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
      await employee.save((err) => {
        if (err) {return console.log(err);}
      });
      res.redirect('back');
    });
  });
});

// POST /jobsite/new
app.post('/jobsite/new', async (req, res) => {
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
  res.redirect('/jobsites');
});

// GET /jobsites
app.get('/jobsites', (req, res) => {
  var jobArray = [];
  var crewArray = [];
  Jobsite.find({}, (err, jobsites) => {
    jobsites.forEach((jobsite) => {
      jobArray[jobsite._id] = jobsite;
    });
    Crew.find({}, (err, crews) => {
      crews.forEach((crew) => {
        crewArray[crew._id] = crew;
      });
      res.render('jobsiteIndex', {jobArray, crewArray});
    });
  });
});

// GET /jobsite/:id
app.get('/jobsite/:id', (req, res) => {
  var reportArray = [];
  Jobsite.findById(req.params.id, async (err, jobsite) => {
    await DailyReport.find({jobsite}, (err, reports) => {
      reports.reverse().forEach((report) => {
        reportArray[report._id] = report;
      });
    });
    reportArray.slice().reverse().forEach((report) => {
      console.log(report);
    })
    
    var crewArray = await Crew.getAll();
    res.render('jobsite', {jobsite, reportArray, crewArray});
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

// POST /jobsite/:jobId/crew/:crewId
app.post('/jobsite/:jobId/crew/:crewId', async (req, res) => {
  var crewId = req.params.crewId;
  var jobId = req.params.jobId;
  if (!ObjectID.isValid(crewId) && !ObjectID.isValid(jobId)) {
    return res.status(404).send();
  }
  try {
    await Crew.findById(crewId, async (err, crew) => {
      await Jobsite.findById(jobId, async (err, jobsite) => {
        crew.jobsites.push(jobsite);
        await crew.save((err) => {
          if (err) {
            console.log(err);
          }
        });
        jobsite.crews.push(crew);
        await jobsite.save((err) => {
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

// DELETE /jobsite/:jobId/crew/:crewId
app.delete('/jobsite/:jobId/crew/:crewId', async (req, res) => {
  var crewId = req.params.crewId;
  var jobId = req.params.jobId;
  if (!ObjectID.isValid(crewId) && !ObjectID.isValid(jobId)) {
    return res.status(404).send();
  }
  try {
    await Crew.findByIdAndUpdate({_id: crewId}, {$pull: {jobsites: jobId}}, (err, crew) => {
      if (err) {
        console.log(err);
      }
    });
    await Jobsite.findByIdAndUpdate({_id: jobId}, {$pull: {crews: crewId}}, (err, jobsite) => {
      if (err) {
        console.log(err);
      }
    })
  } catch (e) {
    return console.log(e);
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
    return res.status(404).send();
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

// GET /vehicles
app.get('/vehicles', async (req, res) => {
  try {
    var vehicleArray = await Vehicle.getAll();
    res.render('vehicles/vehicleIndex', {vehicleArray});
  } catch (e) {
    console.log(e);
    res.render('vehicles/vehicleIndex', {vehicleArray});
  }
});

// POST /vehicle
app.post('/vehicle', async (req, res) => {
  try {
    var vehicle = await new Vehicle(req.body);
    await vehicle.save((err) => {
      if (err) {return console.log(err);}
    });
    res.redirect('back');
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
}); 

// DELETE /vehicle/:id
app.delete('/vehicle/:id', async (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {return res.status(404).send();}
  try {
    const vehicle = await Vehicle.findOneAndRemove({_id: id});
    if (!vehicle) {return res.status(404).send();}
    res.redirect('back');
  } catch (e) {
    return console.log(e);
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
  Crew.find({}, (err, crews) => {
    var crewMap = [];
    crews.forEach((crew) => {
      crewMap[crew._id] = crew;
    });
    Employee.find({}, (err, employees) => {
      var employeeMap = [];
      employees.forEach((employee) => {
        employeeMap[employee._id] = employee;
      });
      Jobsite.find({}, async (err, jobsites) => {
        var jobArray = [];
        if(err){return console.log(err);}
        jobsites.forEach((jobsite) => {
          jobArray[jobsite._id] = jobsite;
        });
        try {
          var vehicleArray = await Vehicle.getAll();
          res.render('crews', {crewArray: crewMap, employeeArray: employeeMap, jobArray, vehicleArray});
        } catch (e) {
          console.log(e);
          res.render('crews', {crewArray: crewMap, employeeArray: employeeMap, jobArray, vehicleArray});
        }
      });
    });
  });
});

// GET crew/:id
app.get('/crew/:id', (req, res) => {
  Crew.findById(req.params.id, async (err, crew) => {
    err && console.log(err);
    try {
      var jobArray = [];
      var employeeArray = await Employee.getAll();
      var vehicleArray = await Vehicle.getAll();
      await Jobsite.find({crews: crew._id}, (err, jobs) => {
        err && console.log(err);
        jobs.forEach((job) => {
          jobArray[job._id] = job;
        });
      });
      res.render('crew', {crew, employeeArray, vehicleArray, jobArray});
    } catch (e) {
      return console.log(e);
    }
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
    res.end();
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
    Crew.findById(crewId, (err, crew) => {
      Employee.findById(employeeId, async (err, employee) => {
        employee.crews.push(crew);
        await employee.save((err) => {
          if (err) {
            console.log(err);
          }
        });
        crew.employees.push(employee);
        await crew.save((err) => {
          if (err) {
            console.log(err);
          }
        });
        res.end();
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
    });
    res.end();
  } catch (e) {
    return console.log(e);
  }
});

// POST /crew/:crewId/vehicle/:vehicleId
app.post('/crew/:crewId/vehicle/:vehicleId', async (req, res) => {
  var crewId = req.params.crewId;
  var vehicleId = req.params.vehicleId;
  if (!ObjectID.isValid(crewId) && !ObjectID.isValid(vehicleId)) {
    return console.log('ID is invalid');
  }
  try {
    var crew = await Crew.findById(crewId, (err) => err && console.log(err));
    var vehicle = await Vehicle.findById(vehicleId, (err) => err && console.log(err));
    vehicle.crews.push(crew);
    await vehicle.save((err) => err && console.log(err));
    crew.vehicles.push(vehicle);
    await crew.save((err) => err && console.log(err));
    res.end();
  } catch (e) { 
    console.log(e);
    var dangerMessage = encodeURIComponent("Unable to add vehicle to crew");
    res.redirect(`/?dangermessage=${dangerMessage}`);
  }
});

// DELETE /crew/:crewId/vehicle/:vehicleId
app.delete('/crew/:crewId/vehicle/:vehicleId', async (req, res) => {
  var crewId = req.params.crewId;
  var vehicleId = req.params.vehicleId;
  if (!ObjectID.isValid(crewId) && !ObjectID.isValid(vehicleId)) {
    return console.log('ID is invalid');
  }
  try {
    await Crew.findByIdAndUpdate({_id: crewId}, {$pull: {vehicles: vehicleId}}, (err, crew) => {
      if (err) {
        console.log(err);
      }
    });
    await Vehicle.findByIdAndUpdate({_id: vehicleId}, {$pull: {crews: crewId}}, (err, vehicle) => {
      if (err) {
        console.log(err);
      }
    });
    res.end();
  } catch (e) {
    console.log(e);
    var dangerMessage = encodeURIComponent("Unable to remove vehicle from crew");
    res.redirect(`/?dangermessage=${dangerMessage}`);
  }
});

// GET /jobreport/:jobId/crew/:crewId/report?date=date
app.get('/jobreport/:jobId/crew/:crewId/report?', async (req, res) => {
  const jobId = req.params.jobId;
  const crewId = req.params.crewId;
  if (!ObjectID.isValid(crewId) && !ObjectID.isValid(jobId)) {
    return res.status(404).send();
  }
  const date = new Date(decodeURI(req.query.date));
  var report = await DailyReport.find({jobsite: jobId, crew: crewId, date: {$gte: date.setHours(0,0,0,0), $lte: date.setHours(23,59,59,999)}});
  if (!_.isEmpty(report[0])) {
    console.log('going to existing report');
    res.redirect(`/report/${report[0]._id}`);
  } else {
    console.log('creating report');
    var report = new DailyReport({
      date: new Date(),
      jobsite: jobId,
      crew: crewId
    });
    await report.save((err) => {
      if(err) {return console.log(err);}
    })
    res.redirect(`/report/${report._id}`);
  }
});

// GET /report/:reportId
app.get('/report/:reportId', (req, res) => {
  const reportId = req.params.reportId;
  DailyReport.findById(reportId, async (err, report) => {
    if(err){console.log(err);}
    try {
      var crew = await Crew.findById(report.crew);
      var job = await Jobsite.findById(report.jobsite);
      var employeeArray = await Employee.getAll();
      var employeeHourArray = await EmployeeWork.find({dailyReport: report});
      var vehicleArray = await Vehicle.getAll();
      var vehicleHourArray = await VehicleWork.find({dailyReport: report});
      var productionArray = await Production.find({dailyReport: report});
      var materialArray = await MaterialShipment.find({dailyReport: report});
      var reportNote = await ReportNote.find({dailyReport: report});
      res.render('dailyReport', {report, crew, job, employeeArray, employeeHourArray, vehicleArray, vehicleHourArray, productionArray, materialArray, reportNote: reportNote[0]});
    } catch (e) {
      console.log(e);
      res.redirect('/');
    }
  });  
});

// POST /employeehour
app.post('/employeehour', async (req, res) => {
  var report = await DailyReport.findById(req.body.dailyReport);
  var today = new Date(report.date);
  if (req.body.startTime.split(':')[1].split(' ')[1] == 'AM') {
    var startHour = parseInt(req.body.startTime.split(':')[0]);
  } else {
    var startHour = parseInt(req.body.startTime.split(':')[0]) + 12;
  }
  var startMinute = parseInt(req.body.startTime.split(':')[1].split(' ')[0]);
  var startTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinute));
  if (req.body.endTime.split(':')[1].split(' ')[1] == 'AM') {
    var endHour = parseInt(req.body.endTime.split(':')[0]);
  } else {
    var endHour = parseInt(req.body.endTime.split(':')[0]) + 12;
  }
  var endMinute = parseInt(req.body.endTime.split(':')[1].split(' ')[0]);
  var endTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), endHour, endMinute));
  startTime.setHours(startTime.getHours() + 6);
  endTime.setHours(endTime.getHours() + 6);
  try {
    if (typeof req.body.employee == 'object') {
      req.body.employee.forEach(async (employee) => {
        var employeeWork = new EmployeeWork({
          startTime, endTime,
          jobTitle: req.body.jobTitle,
          employee,
          dailyReport: req.body.dailyReport
        });
        employeeWork.save((err) => {
          if(err){return console.log(err);}
        });
        var report = await DailyReport.findById(req.body.dailyReport);
        await report.employeeWork.push(employeeWork);
        await report.save((err) => err && console.log(err));
      });
      res.redirect('back');
    } else {
      var employeeWork = new EmployeeWork({
        startTime, endTime,
        jobTitle: req.body.jobTitle,
        employee: req.body.employee,
        dailyReport: req.body.dailyReport
      });
      employeeWork.save((err) => {
        if(err){return console.log(err);}
      });
      var report = await DailyReport.findById(req.body.dailyReport);
      await report.employeeWork.push(employeeWork);
      await report.save((err) => err && console.log(err));
      res.redirect('back');
    }
  } catch (e) {
    console.log(e);
    var dangerMessage = encodeURIComponent('You must choose an employee');
    res.redirect(`/report/${reportId}/?dangerMessage=${dangerMessage}`);
  }
});

// POST /employeework/:id/update
app.post('/employeework/:id/update', async (req, res) => {
  var report = await DailyReport.findById(req.body.dailyReport);
  var today = new Date(report.date);
  if (req.body.startTime.split(':')[1].split(' ')[1] == 'AM' || req.body.startTime.split(':')[1].split(' ')[1] == undefined) {
    var startHour = parseInt(req.body.startTime.split(':')[0]);
  } else {
    var startHour = parseInt(req.body.startTime.split(':')[0]) + 12;
  }
  var startMinute = parseInt(req.body.startTime.split(':')[1].split(' ')[0]);
  var startTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinute));
  if (req.body.endTime.split(':')[1].split(' ')[1] == 'AM' || req.body.endTime.split(':')[1].split(' ')[1] == undefined) {
    var endHour = parseInt(req.body.endTime.split(':')[0]);
  } else {
    var endHour = parseInt(req.body.endTime.split(':')[0]) + 12;
  }
  var endMinute = parseInt(req.body.endTime.split(':')[1].split(' ')[0]);
  var endTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), endHour, endMinute));
  startTime.setHours(startTime.getHours() + 6);
  endTime.setHours(endTime.getHours() + 6);
  EmployeeWork.findByIdAndUpdate(req.params.id, {$set: {
    startTime, endTime,
    jobTitle: req.body.jobTitle,
    employee: req.body.employee,
    dailyReport: report
  }}, {new: true}, (err, employeework) => {
    err && console.log(err);
    res.redirect('back');
  });
});

// DELETE /employeework/:id
app.delete('/employeework/:id', async (req, res) => {
  var id = req.params.id;
  try {
    await EmployeeWork.findByIdAndRemove({_id: id}, async (err, employeeWork) => {
      err && console.log(err);
      var report = DailyReport.findByIdAndUpdate(employeeWork.dailyReport, {$pull: {employeeWork: employeeWork._id}}, (err) => err && console.log(err));
    });
    res.end();
  } catch (e) {
    console.log(e);
    var dangerMessage = encodeURIComponent('Unable to delete Employee Work');
    res.redirect(`/report/${reportId}/?dangerMessage=${dangerMessage}`);
  }
});

// POST /vehiclehour
app.post('/vehiclehour', async (req, res) => {
  var report = await DailyReport.findById(req.body.dailyReport);
  var today = new Date(report.date);
  if (req.body.startTime.split(':')[1].split(' ')[1] == 'AM') {
    var startHour = parseInt(req.body.startTime.split(':')[0]);
  } else {
    var startHour = parseInt(req.body.startTime.split(':')[0]) + 12;
  }
  var startMinute = parseInt(req.body.startTime.split(':')[1].split(' ')[0]);
  var startTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinute));
  if (req.body.endTime.split(':')[1].split(' ')[1] == 'AM') {
    var endHour = parseInt(req.body.endTime.split(':')[0]);
  } else {
    var endHour = parseInt(req.body.endTime.split(':')[0]) + 12;
  }
  var endMinute = parseInt(req.body.endTime.split(':')[1].split(' ')[0]);
  var endTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), endHour, endMinute));
  startTime.setHours(startTime.getHours() + 6);
  endTime.setHours(endTime.getHours() + 6);
  try {
    if (typeof req.body.vehicle == 'object') {
      req.body.vehicle.forEach(async (vehicle) => {
        var vehicleWork = new vehicleWork({
          startTime, endTime,
          jobTitle: req.body.jobTitle,
          vehicle,
          dailyReport: req.body.dailyReport
        });
        vehicleWork.save((err) => {
          if(err){return console.log(err);}
        });
        var report = await DailyReport.findById(req.body.dailyReport);
        await report.vehicleWork.push(vehicleWork);
        await report.save((err) => err && console.log(err));
      });
      res.redirect('back');
    } else {
      var vehicleWork = new VehicleWork({
        startTime, endTime,
        jobTitle: req.body.jobTitle,
        vehicle: req.body.vehicle,
        dailyReport: req.body.dailyReport
      });
      vehicleWork.save((err) => {
        if(err){return console.log(err);}
      });
      var report = await DailyReport.findById(req.body.dailyReport);
      await report.vehicleWork.push(vehicleWork);
      await report.save((err) => err && console.log(err));
      res.redirect('back');
    }
  } catch (e) {
    console.log(e);
    res.redirect('back');
  }
});

// POST /vehiclework/:id/update
app.post('/vehiclework/:id/update', async (req, res) => {
  var report = await DailyReport.findById(req.body.dailyReport);
  var today = new Date(report.date);
  if (req.body.startTime.split(':')[1].split(' ')[1] == 'AM' || req.body.startTime.split(':')[1].split(' ')[1] == undefined) {
    var startHour = parseInt(req.body.startTime.split(':')[0]);
  } else {
    var startHour = parseInt(req.body.startTime.split(':')[0]) + 12;
  }
  var startMinute = parseInt(req.body.startTime.split(':')[1].split(' ')[0]);
  var startTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinute));
  if (req.body.endTime.split(':')[1].split(' ')[1] == 'AM' || req.body.endTime.split(':')[1].split(' ')[1] == undefined) {
    var endHour = parseInt(req.body.endTime.split(':')[0]);
  } else {
    var endHour = parseInt(req.body.endTime.split(':')[0]) + 12;
  }
  var endMinute = parseInt(req.body.endTime.split(':')[1].split(' ')[0]);
  var endTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), endHour, endMinute));
  startTime.setHours(startTime.getHours() + 6);
  endTime.setHours(endTime.getHours() + 6);
  VehicleWork.findByIdAndUpdate(req.params.id, {$set: {
    startTime, endTime,
    jobTitle: req.body.jobTitle,
    vehicle: req.body.vehicle,
    dailyReport: report
  }}, {new: true}, (err, vehiclework) => {
    err && console.log(err);
    res.redirect('back');
  });
});

// DELETE /vehiclework/:id
app.delete('/vehiclework/:id', async (req, res) => {
  var id = req.params.id;
  try {
    await VehicleWork.findByIdAndRemove({_id: id}, async (err, vehicleWork) => {
      err && console.log(err);
      var report = DailyReport.findByIdAndUpdate(vehicleWork.dailyReport, {$pull: {vehicleWork: vehicleWork._id}}, (err) => err && console.log(err));
    });
    res.end();
  } catch (e) {
    console.log(e);
    res.redirect('back');
  }
});

// POST /production
app.post('/production', async (req, res) => {
  var report = await DailyReport.findById(req.body.dailyReport);
  var today = new Date(report.date);
  if (req.body.startTime.split(':')[1].split(' ')[1] == 'AM') {
    var startHour = parseInt(req.body.startTime.split(':')[0]);
  } else {
    var startHour = parseInt(req.body.startTime.split(':')[0]) + 12;
  }
  var startMinute = parseInt(req.body.startTime.split(':')[1].split(' ')[0]);
  var startTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinute));
  if (req.body.endTime.split(':')[1].split(' ')[1] == 'AM') {
    var endHour = parseInt(req.body.endTime.split(':')[0]);
  } else {
    var endHour = parseInt(req.body.endTime.split(':')[0]) + 12;
  }
  var endMinute = parseInt(req.body.endTime.split(':')[1].split(' ')[0]);
  var endTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), endHour, endMinute));
  startTime.setHours(startTime.getHours() + 6);
  endTime.setHours(endTime.getHours() + 6);
  try {
    var production = await new Production({
      jobTitle: req.body.jobTitle,
      quantity: req.body.quantity,
      unit: req.body.unit,
      startTime, endTime,
      description: req.body.description,
      dailyReport: req.body.dailyReport
    });
    production.save((err) => err && console.log(err));
    var report = await DailyReport.findById(req.body.dailyReport);
    await report.production.push(production);
    await report.save((err) => err && console.log(err));
    res.redirect('back');
  } catch (e) {
    console.log(e);
    res.redirect('back');
  }
});

// POST /production/:id/update
app.post('/production/:id/update', async (req, res) => {
  var report = await DailyReport.findById(req.body.dailyReport);
  var today = new Date(report.date);
  if (req.body.startTime.split(':')[1].split(' ')[1] == 'AM' || req.body.startTime.split(':')[1].split(' ')[1] == undefined) {
    var startHour = parseInt(req.body.startTime.split(':')[0]);
  } else {
    var startHour = parseInt(req.body.startTime.split(':')[0]) + 12;
  }
  var startMinute = parseInt(req.body.startTime.split(':')[1].split(' ')[0]);
  var startTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinute));
  if (req.body.endTime.split(':')[1].split(' ')[1] == 'AM' || req.body.endTime.split(':')[1].split(' ')[1] == undefined) {
    var endHour = parseInt(req.body.endTime.split(':')[0]);
  } else {
    var endHour = parseInt(req.body.endTime.split(':')[0]) + 12;
  }
  var endMinute = parseInt(req.body.endTime.split(':')[1].split(' ')[0]);
  var endTime = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), endHour, endMinute));
  startTime.setHours(startTime.getHours() + 6);
  endTime.setHours(endTime.getHours() + 6);
  Production.findByIdAndUpdate(req.params.id, {$set: {
    startTime, endTime,
    jobTitle: req.body.jobTitle,
    quantity: req.body.quantity,
    unit: req.body.unit,
    description: req.body.description, 
    dailyReport: report
  }}, {new: true}, (err, production) => {
    err && console.log(err);
    res.redirect('back');
  });
});

// DELETE /production/:id
app.delete('/production/:id', async (req, res) => {
  var id = req.params.id;
  try {
    await Production.findByIdAndRemove({_id: id}, async (err, production) => {
      err && console.log(err);
      var report = DailyReport.findByIdAndUpdate(production.dailyReport, {$pull: {production: production._id}}, (err) => err && console.log(err));
    });
    res.end();
  } catch (e) {
    console.log(e);
    res.redirect('back');
  }
});

// POST /material
app.post('/material', async (req, res) => {
  try {
    if (req.body.source) {
      var material;
      var vehicle = await Vehicle.find({name: req.body.source + " Truck"});
      if (_.isEmpty(vehicle)) {
        vehicle = new Vehicle({
          name: req.body.source.trim() + " Truck",
          vehicleType: "Dump Truck",
          rental: true,
          sourceCompany: req.body.source.trim()
        });
        await vehicle.save((err) => {
          if (err) {console.log(err); res.redirect('back');}
        });
        material = await new MaterialShipment({
          shipmentType: req.body.shipmentType,
          quantity: req.body.quantity,
          unit: req.body.unit,
          source: req.body.source,
          vehicle: vehicle._id,
          dailyReport: req.body.dailyReport
        });
      } else {
        console.log(vehicle);
        material = await new MaterialShipment({
          shipmentType: req.body.shipmentType,
          quantity: req.body.quantity,
          unit: req.body.unit,
          source: req.body.source,
          vehicle: vehicle[0]._id,
          dailyReport: req.body.dailyReport
        });
      }
    } else {
      material = await new MaterialShipment(req.body);
    }
    material.save((err) => err && console.log(err));
    var report = await DailyReport.findById(req.body.dailyReport);
    await report.materialShipment.push(material);
    await report.save((err) => err && console.log(err));
    res.redirect('back');
  } catch (e) {
    console.log(e);
    res.redirect('back');
  }
});

// POST /material/:id/update
app.post('/material/:id/update', async (req, res) => {
  var report = await DailyReport.findById(req.body.dailyReport);
  MaterialShipment.findByIdAndUpdate(req.params.id, {$set: {
    shipmentType: req.body.shipmentType,
    quantity: req.body.quantity,
    unit: req.body.unit,
    vehicle: req.body.vehicle, 
    dailyReport: report
  }}, {new: true}, (err, materialShipment) => {
    err && console.log(err);
    res.redirect('back');
  });
});

// DELETE /material/:id
app.delete('/material/:id', async (req, res) => {
  var id = req.params.id;
  try {
    await MaterialShipment.findByIdAndRemove({_id: id}, async (err, material) => {
      err && console.log(err);
      var report = DailyReport.findByIdAndUpdate(material.dailyReport, {$pull: {materialShipment: material._id}}, (err) => err && console.log(err));
    });
    res.end();
  } catch (e) {
    console.log(e);
    res.redirect('back');
  }
});

// POST /reportnote
app.post('/reportnote', async (req, res) => {
  try {
    var report = await DailyReport.findById(req.body.dailyReport);
    if (report.reportNote) {
      ReportNote.findByIdAndUpdate(report.reportNote, {note: req.body.note}, (err, note) => {
        err && console.log(err);
        report.save((err) => {
          if (err) {
            console.log('POST /reportnote save error:', err);
          }
          res.redirect('back');
        })
      });
    } else {
      var note = await new ReportNote(req.body);
      await note.save((err) => err && console.log(err));
      var report = await DailyReport.findById(req.body.dailyReport);
      report.reportNote = note._id;
      await report.save((err) => err && console.log(err));
      console.log(report);
      res.redirect('back');
    }
  } catch (e) {
    console.log('POST /reportnote catch error:', e);
    res.redirect('back');
  }
});

// GET /reports
app.get('/reports', async (req, res) => {
  try {
    var reportArray = await DailyReport.getAll();
    var crewArray = await Crew.getAll();
    var jobArray = await Jobsite.getAll();
    res.render('reportIndex', {reportArray, crewArray, jobArray});
  } catch (e) {
    console.log(e);
    res.redirect('back');
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app}