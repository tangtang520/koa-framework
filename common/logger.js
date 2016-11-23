/**
 * Created by tangtang on 2016/11/23.
 */
const log4js = require('log4js');
const mongoose = require('mongoose');
const config = require("../config/config");
log4js.configure({
  appenders: [
      { type: 'console' },
      { type: 'file', filename: '../logs/cheese.log', category: 'cheese' }
  ]
});

const logger = log4js.getLogger('cheese');
logger.setLevel(config.debug ? 'DEBUG' : 'ERROR')

module.exports = logger;