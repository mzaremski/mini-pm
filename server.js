/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');
const express = require('express');
var bodyParser = require("body-parser");
const mysql = require('mysql');
var cors = require('cors')






/**
 * Flag indicating whether webpack compiled for the first time.
 * @type {boolean}
 */
let isInitialCompilation = true;

const compiler = webpack(config);

new WebpackDevServer(compiler, config.devServer)
.listen(config.port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.port);
});

compiler.plugin('done', () => {
  if (isInitialCompilation) {
    // Ensures that we log after webpack printed its stats (is there a better way?)
    setTimeout(() => {
      console.log('\n✓ The bundle is now ready for serving!\n');
      console.log('  Open in iframe mode:\t\x1b[33m%s\x1b[0m',  'http://localhost:' + config.port + '/webpack-dev-server/');
      console.log('  Open in inline mode:\t\x1b[33m%s\x1b[0m', 'http://localhost:' + config.port + '/\n');
      console.log('  \x1b[33mHMR is active\x1b[0m. The bundle will automatically rebuild and live-update on changes.')
    }, 350);
  }
  isInitialCompilation = false;
});



// -----------------------------------------------------------------------------
// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'pmadmin',
    password : 'admin',
    database : 'minipm'
});

// Connect
db.connect((err) => {
    if(err){
        console.error("TURN ON XAMPP !!!")
        throw err;
    }
    console.log('MySql Connected...');
});
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen('3000', () => {
    console.log('Server started on port 3000');
});










//
app.get('/api/projects', (req, res) => {
    let sql = 'SELECT * FROM projects';
    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
        }else{
            res.json(rows)
            console.log("Successful query")
        }
    })
});
app.get('/api/project/:id', (req, res) => {
    let sql = `SELECT * FROM projects WHERE idproject = ${req.params.id}`;
    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
        }else{
            res.json(rows)
            console.log("Successful query")
        }
    })
});
app.get('/api/tasks/:parentId', (req, res) => {
    let sql = `SELECT * FROM tasks WHERE parentId = ${req.params.parentId}`;
    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
        }else{
            res.json(rows)
            console.log("Successful query")
        }
    })
});

app.post('/api/addproject', (req, res) => {
    let sql ='insert into projects values(NULL,"' + req.body.projectName +'","' + req.body.projectDescription + '",' + req.body.responsiblePerson + ',' + req.body.workedTime + ',' + req.body.estimatedTime + ',' + req.body.percentDone + ')';
    db.query(sql, function(error, rows, fields){
        if(!!error){
            console.log("Error in the query");
            res.send({isError: true, message: error.sqlMessage});
        }else{
            //res.json(rows)
            console.log("Successful query")
            res.send({isError: false, rows})
        }
    })
});
