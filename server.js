'use strict';

const express = require('express');
const routes = require('./routes.js');

const app = express();

const PORT = process.env.PORT || 8080;

const timeStamp = (req, res, next) => {
  req.requestTime = new Date();
  next();
};

const timeLogger = (req, res, next) => {
  console.log(req.requestTime, req.method, req.path);
  next();
};

const squareValue = number => (req, res, next) => {
  req.number = number * number;
  next();
};

app.use(timeStamp);
app.use(timeLogger);
app.use(routes);

app.get('/a', (req, res) => {
  res.status(200).send('Route A');
});

app.get('/b', squareValue(3), (req, res) => {
  res.status(200).send(`Route B, squared number: ${req.number}`);
  console.log(req.number);
});

app.use('*', (req, res) => {
  res.status(404).send('404, Not Found');
});

app.use((error, req, res, next) => {
  res.status(500).send('error');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
