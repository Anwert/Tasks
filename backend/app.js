const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const database = require('./config/database').database;
const path = require('path');
const morgan = require('morgan');
const usersRouter = require('./routes/usersRouter');
const cors = require('cors');

mongoose.connect(database.path, database.options);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log(err);
});

const app = express();

const Task = require('./models/task');

app.use(morgan('combined'));
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//authentication routes
usersRouter(app);

const tasks = require('./routes/tasks');
app.use('/tasks', tasks);

const root = require('./routes/root');
app.use('', root);

app.listen(3200, () => {
  console.log('Server started on port 3200...');
});
