const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

const authMiddleware = require('../middleware/auth');

const authorizedSourseMaterial = require('../controllers/authorizedcoursematerial');

router.post('/login', authController.login);

router.get('/checkifauthisvalid', authController.checkIfAuthIsValid);

router.get('/authorizedcoursematerial', authMiddleware, authorizedSourseMaterial.authorizedcoursematerial)

router.get('/getmyaccesscode', authController.getAccessCode);

module.exports = router;
