/**
 * Created by tangtang on 2016/11/29.
 */
const models = require('../models');
const Enquiry = models.Enquiry;
const Dao = require('../dao');
const dao = new Dao(Enquiry);
const redisCli = require('../redis');
const consts = require('../common/consts');
const orderService = require('./order');
const orderLogsService = require('./orderLogs');

module.exports = dao;

dao.insertEnquiryOrder = function* (data) {
  try{
    const entryOrder = yield dao.create(data);
    const orderObj = {
      carNo:data.carNo,
      carBrandInfo:data.carBrandInfo,
      orderType:data.enquiryType,
      status:consts.order.status.提交订单,
      branchInfo:{   //todo 这个信息根据登录来拿，目前登录机制还没确定
        branchId:'',
        branchName:''
      },
      enquiryInfo:{
        enquiryType:data.enquiryType,
        enquiryRef:entryOrder._id
      }
    };
    const order = yield orderService.create(orderObj);
    const orderLogsObj = {
      orderInfo:order._id,
      status:consts.order_Logs.status.报价中,
    };
    const orderLogs = yield orderLogsService.create(orderLogsObj);
  }catch (err){
    throw err;
  }
}
