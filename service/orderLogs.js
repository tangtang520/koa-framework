/**
 * Created by tangtang on 2016/11/29.
 */
const models = require('../models');
const OrderLogs = models.OrderLogs;
const Dao = require('../dao');
const dao = new Dao(OrderLogs);
const redisCli = require('../redis');

module.exports = dao;