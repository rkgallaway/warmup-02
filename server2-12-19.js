'use strict';

const express = require('express');
const ejs = require('ejs');
const app = express();

//EJS template setup
app.set('view', `${__dirname}/view`);
app.set('view engine', 'ejs');

//static routes
app.use(express.static(`${__dirname}/public`));

//app middleware
app.use(express.json());

//routes
app.get('/', (req, res, next) => {
  res.send('<h1>Hello From</h1>');
});

app.post('/save', (req, res, next) => {
  res.json(req.body);
});

app.get('/err', (req, res, net) => {
  next('catastrophic error');
});

app.get('*', (req, res, next) => {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.render('error', {request: req});
});

app.use((err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.render('error', {request: req, error: err});
});

module.exports = {
  server:app,
  start: () => {
    const PORT = process.env.port || 3000;
    app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
  },
};
