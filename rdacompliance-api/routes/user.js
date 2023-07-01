const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const userController = require('../controllers/user');

const isAuth = require('../middleware/auth');

router.get('/getexpirationdate', isAuth, userController.getExpirationDate);

router.post('/setquizdata', isAuth, userController.setQuizData);

router.get('/getquizdata', isAuth, userController.getQuizData);

router.get('/getallquizdata', isAuth, userController.getAllQuizData);

module.exports = router;
