/**
 * Created by tangtang on 2016/11/23.
 */
'use strict'
const Router  = require('koa-router');
const userController = require('../controllers/user');
const router = new Router();
router.get('/',userController.test)
module.exports = router.routes();