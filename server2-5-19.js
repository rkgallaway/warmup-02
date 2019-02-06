'use strict';

const express = require('express');
const ejs = require('ejs');
const app = express();

//EJS Template Setup
app.set('views', `${__dirname}/view`);
app.set('view engine', 'ejs');

//Static Routes
app.use(express.static(`${__dirname}/public`));

//App Middleware
app.use(express.json());

//Routes
app.get('/', (req, res, next) => {
  res.send('<h1>Hello From</hi>');
});

app.post('/save', (req, res, nesxt) => {
  res.json(req.body);
});

app.get('/err', (req, res, next) => {
  next('Catastrophic Eror');
});

app.get('*', (req, res, next) => {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.render('error', {request: req,});
});

app.use((err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.render('error', {request: req, error:err,});
});

module.exports = {
  server: app,
  start: () => {
    const PORT = process.env.port || 3000;
    app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
  },
};
