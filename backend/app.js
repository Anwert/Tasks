const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const database = require('./config/database').database;
const fs = require('fs');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

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

if (isDevelopment) {
  app.get('/styles/index.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'styles', 'index.css'));
  });

  app.get('/src/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'src', 'index.js'));
  });

  app.get('/assets/Mounts.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'assets', 'Mounts.jpg'));
  });

  app.get('/assets/search.png', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'assets', 'search.png'));
  });
} else {
  const cssManifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../manifest/css.json'), 'utf8'))["index.css"].toString();
  app.get(`/styles/${cssManifest}`, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'styles', cssManifest));
  });

  const webpackManifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../manifest/webpack.json'), 'utf8'))["index.js"].toString();
  app.get(`/src/${webpackManifest}`, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'src', webpackManifest));
  });

  const assetsManifestMounts = JSON.parse(fs.readFileSync(path.join(__dirname, '../manifest/assets.json'), 'utf8'))["Mounts.jpg"].toString();
  app.get(`/assets/${assetsManifestMounts}`, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'assets', assetsManifestMounts));
  });

  const assetsManifestSearch = JSON.parse(fs.readFileSync(path.join(__dirname, '../manifest/assets.json'), 'utf8'))["search.png"].toString();
  app.get(`/assets/${assetsManifestSearch}`, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'assets', assetsManifestSearch));
  });
}

const tasks = require('./routes/tasks');
app.use('/tasks', tasks);

app.get('/*', (req, res) => {
  if (isDevelopment) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  }
  else {
    const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../manifest/html.json'), 'utf8'));
    res.sendFile(path.join(__dirname, '../public', manifest["index.html"].toString()));
  }
});

app.listen(3200, () => {
  console.log('Server started on port 3200...');
});
