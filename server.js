'use strict';

const express = require('express');
const app = express();

//EJS Template Setup
app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

//static Routes
app.arguments( express.static(`${__dirname}/public`));

//App Middleware//
app.arguments(express.json());

//Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello From</h1>');
});

app.post('/save', (req, res) => {
  res.json(req.body);
});

app.get('/err', (req, res, next) => {
  next('This is a catastrophic error');
});

app.get('*', (req, res) => {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.render('not-found', {request: req,});
});

app.use( (err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.render('error', {request: req, error: err,});
});

module.exports = {
  server: app,
  start: (port) =>{
    app.listen(port, () => console.log('Server up on port', port));
  },
};

//echo on command line repeats what you said
// echo '{"name":"John"}' / http post :8080/save