const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const database = require('./config/database').database;
const fs = require('fs');

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../manifest/html.json'), 'utf8'));

app.use(express.static(path.join(__dirname, '../public'), {
  index: manifest["index.html"].toString(),
}));

const tasks = require('./routes/tasks');
app.use('/tasks', tasks);

app.listen(3200, () => {
  console.log('Server started on port 3200...');
});
