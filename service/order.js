/**
 * Created by tangtang on 2016/11/29.
 */
const models = require('../models');
const Order = models.Order;
const Dao = require('../dao');
const dao = new Dao(Order);
const redisCli = require('../redis');
const consts = require('../common/consts');
const projectService = require('./project');
const orderLogsService = require('./orderLogs');

module.exports = dao;

dao.insertOrder = function* (data) {
  try{
    let price = 0 , serviceInfo = [];
    if(data.orderType === consts.order.orderType.自费保养下单){
      const serviceIds = data.serviceId.split('-');
      T.debug('serviceIds--->>',serviceIds);
      const projects = yield projectService.find({projectId:{$in:serviceIds}});
      projects.forEach((p) => {
        price += p.price;
        serviceInfo.push({
          serviceId:p.projectId,
          serviceName:p.name,
          servicePrice:p.price     //这个价格目前记录的是project的价格
        })
      })
    };
    if(data.orderType === consts.order.orderType.自费钣喷下单){
      //这里的价格是报价后的结果 逻辑待定
    };
    data.status = consts.order.status.提交订单;
    data.branchInfo = {  //从登录信息中去取
      branchId:'',
      branchName:''
    };
    data.price = price;
    data.serviceInfo = serviceInfo;
    const orderInfo = yield dao.create(data);
    const orderLogsObj = {
      orderInfo:orderInfo._id,
      status:consts.order_Logs.status.提交订单,
    };
    const orderLosInfo = yield orderLogsService.create(orderLogsObj);
    return orderInfo;
  }catch(err){
    throw err;
  }
}