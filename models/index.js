/**
 * Created by tangtang on 2016/11/23.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require("../config/config");
const DBConfig = config.mongo;
const options = DBConfig.option;
const conStr = DBConfig.url;
//连接复制集
mongoose.connect(conStr,options,function (err) {
    if(err){
      T.error('connect to mongodb error',err);
      process.exit(1);
    }
});
/**
 * require any model
 */
require('./user');
require('./order_appoint');
require('./branch');
require('./order');
require('./order_enquiry');
require('./order_logs');
require('./order_quote');
require('./project');


exports.User        = mongoose.model('User');
exports.Branch      = mongoose.model('Branch');
exports.Order       = mongoose.model('Order');
exports.Enquiry     = mongoose.model('Enquiry');
exports.OrderLogs   = mongoose.model('OrderLogs');
exports.Quote       = mongoose.model('Quote');
exports.Project     = mongoose.model('Project');
exports.Appoint     = mongoose.model('Appoint');
