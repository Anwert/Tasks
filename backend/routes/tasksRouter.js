const express = require('express');
const router = express.Router();
const passport = require('passport');

const tasksController = require('../controllers/tasksController');

const requireSignIn = passport.authenticate('local', {session: false});

router.get('/get', tasksController.get);

router.post('/add', tasksController.add);

router.delete('/delete', tasksController.del);

router.put('/edit', tasksController.edit);

router.put('/changecomplete', tasksController.changeComplete);

module.exports = router;
