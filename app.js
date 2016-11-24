var app = require('koa')()
  , koa = require('koa-router')()
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');
/**
 * Config
 */
const config = require("./config/config");
require('./common/logger');
require('./common/global');

/**
 * Connect to database
 */

process.on('SIGINT',function(){
  var mongoose = require('mongoose');
  mongoose.connection.close(function(){
    T.error('mongoose close through app terminal');
    process.exit(0);
  });
});
/**
 * Load the models
 */
require('./models');
require('./redis');

// global middlewares
app.use(require('koa-bodyparser')());
app.use(json());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  T.info('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));
// routes definition
require('./routes/routes')(app);
// mount root routes
app.on('error', function(err, ctx){
  T.error('server error', err, ctx);
});

module.exports = app;
