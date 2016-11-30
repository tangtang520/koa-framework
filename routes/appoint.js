/**
 * Created by tangtang on 2016/11/30.
 */
const
  Router             = require('koa-router'),
  middle             = require('../common/middleware'),
  appointController  = require('../controllers/appoint'),
  router             = new Router();

//新增预约单
router.post('/',appointController.insertAppointOrder);


module.exports = router.routes();