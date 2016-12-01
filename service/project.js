/**
 * Created by tangtang on 2016/11/29.
 */
const models = require('../models');
const Project = models.Project;
const Dao = require('../dao');
const projectService = new Dao(Project);
const redisCli = require('../redis');

module.exports = projectService;