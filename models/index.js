/**
 * Created by tangtang on 2016/11/23.
 */
const mongoose = require('mongoose');
const config = require("../config/config");
const DBConfig = config.mongo;
const options = DBConfig.option;
const conStr = DBConfig.url;
const logger = require('../common/logger');
//连接复制集
mongoose.connect(conStr,options,function (err) {
    if(err){
      logger.error('connect to mongodb error',err);
      process.exit(1);
    }
});
/**
 * require any model
 */
require('./user');
exports.User      = mongoose.model('User');
