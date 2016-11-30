/**
 * Created by tangtang on 2016/11/30.
 */
const models = require('../models');
const Appoint = models.Appoint;
const Dao = require('../dao');
const dao = new Dao(Appoint);
const redisCli = require('../redis');
const consts = require('../common/consts');
const orderService = require('./order');
const orderLogsService = require('./orderLogs');
const tools = require('../common/tools');

module.exports = dao;

dao.insertAppointOrder = function* (data) {

}