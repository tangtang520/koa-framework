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
  appointRouter   = require('./appoint');


module.exports = function(app){

  //生成验证码
  router.get('/v_code',loginController.getCode);

  router.use('/user',userRouter);

  //询价
  router.use('/enquiry',enquiryRouter);

  //报价
  router.use('/quote',quoteRouter);

  //预约单
  router.use('/appoint',appointRouter);

  app.use(router.routes());
}
