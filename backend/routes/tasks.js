const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  next();
});

router.get('/get', (req, res) => {
  Task.find((err, tasks) => {
    if (err) res.send(err);
    res.json(tasks);
  });
});

router.post('/add', (req, res) => {
  const task = new Task();
  task.value = req.body.value;
  task.date = req.body.date;
  task.completed = false;

  task.save((err) => {
    if (err) return console.log(err);
    res.json(task);
  });
});

router.delete('/delete', (req, res) => {

  const query = { _id: req.body._id }

  Task.remove(query, (err) => {
    if (err) return console.log(err);
    res.send("Task was deleted succussfully!");
  });
});

router.put('/edit', (req, res) => {
  const query = { _id: req.body._id }

  Task.findById(query, (err, task) => {
    if (err) return console.log(err);
    task.value = req.body.value;
    task.date = req.body.date;
    task.completed = req.body.completed;
    task.save((err, updatedTask) => {
      if (err) return console.log(err);
      res.send("Task was edited succussfully!");
    });
  });
});

router.put('/changecomplete', (req, res) => {
  const query = { _id: req.body._id }

  Task.findById(query, (err, task) => {
    if (err) return console.log(err);
    task.completed = !task.completed;
    task.save((err, updatedTask) => {
      if (err) return console.log(err);
      res.send("Task was edited succussfully!");
    });
  });
});

module.exports = router;
