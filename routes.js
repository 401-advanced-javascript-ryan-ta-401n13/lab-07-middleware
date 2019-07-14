'use strict';

const express = require('express');
const router = express.Router();

const hello = greeting => (req, res, next) => {
  req.greeting = greeting;
  next();
};

const oops = (req, res, next) => {
  next('oops, that does it!');
};

router.get('/c', hello('Hello World'), (req, res) => {
  res.status(200).send(`Route C tell them: ${req.greeting}`);
});

router.get('/d', oops, (req, res) => {
  res.status(200).send('Route D');
});

module.exports = router;
