/**
 * Created by tangtang on 2016/11/29.
 */
const
  Router             = require('koa-router'),
  M                  = require('../common/middleware'),
  enquiryController  = require('../controllers/enquiry'),
  router             = new Router();

//新增询价单
router.post('/',enquiryController.insertEnquiryOrder);

module.exports = router.routes();