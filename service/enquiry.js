/**
 * Created by tangtang on 2016/11/29.
 */
const models = require('../models');
const Enquiry = models.Enquiry;
const Dao = require('../dao');
const dao = new Dao(Enquiry);
const redisCli = require('../redis');
const consts = require('../common/consts');
const orderService = require('./order');
const orderLogsService = require('./orderLogs');
const tools = require('../common/tools');

module.exports = dao;

