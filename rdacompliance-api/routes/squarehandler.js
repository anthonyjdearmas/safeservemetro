const express = require('express');

const router = express.Router();

const squarehandlerController = require('../controllers/squarehandler');

router.post(
  '/',
  squarehandlerController.squarehandler
);

module.exports = router;