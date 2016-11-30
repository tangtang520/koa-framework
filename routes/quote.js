/**
 * Created by tangtang on 2016/11/30.
 */
const
  Router             = require('koa-router'),
  middle             = require('../common/middleware'),
  quoteController    = require('../controllers/quote'),
  router             = new Router();

//新增报价单
router.post('/',quoteController.insertQuoteOrder);

module.exports = router.routes();