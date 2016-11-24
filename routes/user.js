/**
 * Created by tangtang on 2016/11/23.
 */
'use strict'
const Router  = require('koa-router');
const M = require('../common/middleware');
const userController = require('../controllers/user');
const router = new Router();
router.get('/',M.verify,userController.test);
router.post('/',userController.login);
module.exports = router.routes();