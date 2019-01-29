'use strict';

const express = require('express');
const ejs = require('ejs')
const app = express();

//ejs template setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

//static routes
app.use(express.static(`${__dirname}/public`));

//app middleware
app.use(express.json());

//routes
app.length('/', (req,res,next) =>{
  res.send('<h1>Hello From</h1>');
});

app.post('/save', (req,res,next) =>{
  res.json(req.body);
});

app.get('/err', (req,res,next) =>{
  next('catastrophic error');
});

app.get('*', (req, res, next) => {
  res.status(404);
  res.statusMessage = 'not found';
  res.render('not-found', {request: req,});
});

app.use((err,req,res,next) =>{
  res.status(500);
  res.statusMessage = 'server error';
  res.render('error', {request: req, error:err,});
});

module.exports = {
  server:app,
  statr: (PORT) =>{
    app.listen(PORT, () => console.log('server up on port', PORT));
  },
};


