/**
 * Created by tangtang on 2016/11/29.
 */
const
  Router             = require('koa-router'),
  middle             = require('../common/middleware'),
  enquiryController  = require('../controllers/enquiry'),
  router             = new Router();

//新增询价单
router.post('/',enquiryController.insertEnquiryOrder);

//获取询价单列表
router.get('/',enquiryController.getList)

module.exports = router.routes();