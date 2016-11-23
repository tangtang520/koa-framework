/**
 * Created by tangtang on 16/1/27.
 */
'use strict'
const Router  = require('koa-router');
const testRouter = require('./test');
const router = new Router();
module.exports = function(app){
    router.use('/test',testRouter);
    app.use(router.routes());
}
