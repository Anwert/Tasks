const passport = require('passport');
const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authenticationController');
const passportService = require('../config/passport');

const requireSignIn = passport.authenticate('local', {session: false});

router.post('/signup', authenticationController.signup);

router.post('/signin', requireSignIn, authenticationController.signin);

module.exports = router;
