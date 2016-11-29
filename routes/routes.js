/**
 * Created by tangtang on 16/1/27.
 */
const
  Router          = require('koa-router'),
  userRouter      = require('./user'),
  enquiryRouter   = require('./enquiry'),
  router          = new Router();


module.exports = function(app){

  router.use('/user',userRouter);

  router.use('/enquiry',enquiryRouter);

  app.use(router.routes());
}
