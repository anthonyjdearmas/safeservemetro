const express = require('express');

const router = express.Router();

const contactUsController = require('../controllers/contactus');

router.post(
  '/',
  contactUsController.contactus
);

module.exports = router;