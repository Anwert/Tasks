const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  }
});

const Task = module.exports = mongoose.model('Task', taskSchema);
