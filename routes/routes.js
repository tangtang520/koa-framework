/**
 * Created by tangtang on 16/1/27.
 */
const
  Router          = require('koa-router'),
  userRouter      = require('./user'),
  enquiryRouter   = require('./enquiry'),
  router          = new Router(),
  loginController = require('../controllers/login'),
  quoteRouter     = require('./quote'),
  orderRouter     = require('./order'),
  middle          = require('../common/middleware');


module.exports = function(app){

  //生成验证码
  router.get('/vCode',middle.whetherCanSendCode,loginController.getCode);

  //登录
  router.post('/login',middle.whetherCodeTrue,loginController.login);

  //检验token
  router.post('/auth',middle.verify);

  router.use('/user',userRouter);

  //询价
  router.use('/enquiry',enquiryRouter);

  //报价
  router.use('/quote',quoteRouter);

  //预约单
  router.use('/order',orderRouter);

  app.use(router.routes());
}
