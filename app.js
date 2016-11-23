var app = require('koa')()
  , koa = require('koa-router')()
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');
/**
 * Config
 */
const config = require("./config/config");
const logger = require('./common/logger');

/**
 * Connect to database
 */

process.on('SIGINT',function(){
  var mongoose = require('mongoose');
  mongoose.connection.close(function(){
    logger.error('mongoose close through app terminal');
    process.exit(0);
  });
});
/**
 * Load the models
 */
require('./models');

// global middlewares
app.use(require('koa-bodyparser')());
app.use(json());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  logger.info('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));
// routes definition
require('./routes/routes')(app);
// mount root routes
app.on('error', function(err, ctx){
  logger.error('server error', err, ctx);
});

module.exports = app;
