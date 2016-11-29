/**
 * Created by tangtang on 2016/11/29.
 */
const models = require('../models');
const Project = models.Project;
const Dao = require('../dao');
const dao = new Dao(Project);
const redisCli = require('../redis');

module.exports = dao;