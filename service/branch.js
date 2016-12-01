/**
 * Created by tangtang on 2016/11/29.
 */
const models = require('../models');
const Branch = models.Branch;
const Dao = require('../dao');
const branchService = new Dao(Branch);
const redisCli = require('../redis');
const consts = require('../common/consts');

module.exports = branchService;

