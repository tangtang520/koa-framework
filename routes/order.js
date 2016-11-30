/**
 * Created by tangtang on 2016/11/29.
 */
const
  Router             = require('koa-router'),
  middle             = require('../common/middleware'),
  orderController    = require('../controllers/order'),
  router             = new Router();

//下单
router.post('/',orderController.insertOrder);

module.exports = router.routes();