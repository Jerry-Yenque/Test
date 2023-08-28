'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const fs = require('fs');

// Link to views folder.
// let views = path.dirname(__dirname);
let views = __dirname;
views = path.dirname(__dirname);
views = path.dirname(views);
views = path.dirname(views);
// views = path.dirname(views);
let direct = "directory: " + views;
let fi = "";

fs.readdir("/var/opt/build/repo/", (err, archivos) => {
  if (err) {
    console.error('Error al leer el directorio:', err);
    return;
  }

  console.log('Archivos en el directorio actual:');
  archivos.forEach(archivo => {
    fi += archivo;
  });
});

let ruta = direct + 'files' + fi
// Home route.
router.get('/', (req, res) => {
  res.send(fi)
  // res.sendFile('index.html', { root: views });
});

// Other routes.
router.get('/p', function(req, res){
  res.sendFile('index.html');
  // res.send(direct)
});
router.get('/page2', function(req, res){
  res.sendFile('page2.html', { root: views });
});
router.get('/page3', function(req, res){
  res.sendFile('page3.html', { root: views });
});
router.get('/page4', function(req, res){
  res.sendFile('page4.html', { root: views });
});


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda (express/server.js)

module.exports = app;
module.exports.handler = serverless(app);
