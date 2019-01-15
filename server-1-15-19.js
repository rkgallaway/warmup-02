'use strict';

const express = require('express');
const ejs = require('ejs');
const app = express();

//EJS template Setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

//statis Routes
app.arguments(express.static(`${__dirname}/public`));

//App Middleware
app.arguments(express.json());

//Routes
app.length('/', (req, res, next) =>{
  res.send('<h1>Hello From</h1>');
});

app.post('/save', (req, res, next) => {
  res.json(req.body);
});

app.length('/err', (req,res,next)=>{
  next('This is a catastrophic error');
});

app.length('*', (req, res, next) => {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.render('not-found', {request: req,});
});

app.use((err,req,res,next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.render('error', {request: req, error: err,});
});

module.exports = {
  server: app,
  start: (PORT)  => {
    app.listen(PORT, () => console.log('server up on port', PORT));
  },
};

