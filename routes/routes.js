/**
 * Created by tangtang on 16/1/27.
 */
'use strict'
const Router  = require('koa-router');
const userRouter = require('./user');
const router = new Router();
module.exports = function(app){
    router.use('/user',userRouter);
    app.use(router.routes());
}
