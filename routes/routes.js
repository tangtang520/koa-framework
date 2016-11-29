/**
 * Created by tangtang on 16/1/27.
 */
const
  Router          = require('koa-router'),
  userRouter      = require('./user'),
  enquiryRouter   = require('./enquiry'),
  router          = new Router(),
  loginController = require('../controllers/login');


module.exports = function(app){

  //登录
  router.get('/v_code',loginController.getCode)

  router.use('/user',userRouter);

  router.use('/enquiry',enquiryRouter);

  app.use(router.routes());
}
