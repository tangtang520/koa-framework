/**
 * Created by tangtang on 2016/12/1.
 */
const models = require('../models');
const OrderOperationLogsLogs = models.OrderOperationLogsLogs;
const Dao = require('../dao');
const orderOperationLogsService = new Dao(OrderOperationLogsLogs);
const redisCli = require('../redis');
const consts = require('../common/consts');
const tools = require('../common/tools');

module.exports = orderOperationLogsService;