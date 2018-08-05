const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const config = require('./config/database');

mongoose.connect(config.database.path, config.database.options);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log(err);
});

const app = express();

app.set('jwtTokenSecret', config.secret);

const Task = require('./models/task');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//authentication routes
const authenticationRouter = require('./routes/authenticationRouter');
app.use('/', authenticationRouter);

//tasks routes
const tasksRouter = require('./routes/tasksRouter');
app.use('/tasks', tasksRouter);

const indexRouter = require('./routes/indexRouter');
app.use('/', indexRouter);

app.listen(3200, () => {
  console.log('Server started on port 3200...');
});
