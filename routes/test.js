/**
 * Created by tangtang on 2016/11/23.
 */
'use strict'
const Router  = require('koa-router');
const router = new Router();
router.get('/',function* () {
    this.body = 'hello World';
})
module.exports = router.routes();