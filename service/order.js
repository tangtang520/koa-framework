/**
 * Created by tangtang on 2016/11/29.
 */
const models = require('../models');
const Order = models.Order;
const Dao = require('../dao');
const orderService = new Dao(Order);
const redisCli = require('../redis');
const consts = require('../common/consts');
const projectService = require('./project');
const orderOperationLogsService = require('./order_operation_logs');
const quoteOrderService = require('./quote');
const enquiryOrderService = require('./enquiry');
const tools = require('../common/tools');

module.exports = orderService;


/**
 *
 */

orderService.insertOrder = function* (data) {
  try{
    let quoteOrderInfo;
    //如果是报价单下的单 那么需要判断该报价单是否失效
    if(data.orderType === consts.order.orderType.保险询价下单 ||
      data.orderType === consts.order.orderType.维修询价下单 ||
      data.orderType === consts.order.orderType.轮胎询价下单){
      quoteOrderInfo = yield quoteOrderService.findOne(
        {quoteOrderId:data.serviceInfo.quoteOrderId,status:consts.order_quote.status.正常}
      );
      if(!quoteOrderInfo){
        //不存在
        return G.resErrorMsg(-1,'报价单已失效');
      }
    }
    //计算价格
    if(!!quoteOrderInfo){
      //代表询价下单
    }


    //生成订单
    data.orderId = tools.uuid();
    data.status = consts.order.status.预约下单;
    data.branchInfo = {}; //todo 登录信息中取
    data.price = 0; //todo 根据不同的下单信息来算 有的有可能是技师填写
    const orderInfo = yield orderService.create(data);
    //记录订单记录
    let operationLogsObj = {
      operatorInfo:{
        operatorType:consts.order_operation_logs.operatorType.店面,
        operatorId:'', //todo 这里记录后台登录人的用户名
        operatorName:'', //todo 记录后台登录人的姓名
        operatorPhone:'', //todo 后台登录人的电话
      },
      targetInfo:{
        targetType:consts.order_operation_logs.targetType.订单,
        targetId:orderInfo.orderId,
      },
      operation:data.orderType,
      extraInfo:'',
      remark:'生成订单'
    };
    yield orderOperationLogsService.create(operationLogsObj);

    if(!!quoteOrderInfo){
      //代表是询价下单 更改询价单的状态
      const enquiryFindOrUpdate = yield enquiryOrderService.findOneAndUpdate(
        {enquiryOrderId:quoteOrderInfo.enquiryOrderId},
        {$set:{status:consts.order_enquiry.status.已完成}}
      )
      if(!!enquiryFindOrUpdate){
        //记录日志
        operationLogsObj.operatorInfo.operatorType = consts.order_operation_logs.operatorType.系统自动;
        operationLogsObj.targetInfo.targetType = consts.order_operation_logs.targetType.询价单;
        operationLogsObj.targetInfo.targetId = quoteOrderInfo.enquiryOrderId;
        operationLogsObj.operation = consts.order_operation_logs.operation.询价单完成;
        operationLogsObj.remark = '询价单完成';
        yield orderOperationLogsService.create(operationLogsObj);
      }
      //更改报价单的状态为已失效
      const quoteOrderFindOrUpdate = yield quoteOrderService.findOneAndUpdate(
        {quoteOrderId:quoteOrderInfo.quoteOrderId},
        {$set:{status:consts.order_quote.status.失效}}
      )
      //记录日志
      operationLogsObj.operatorInfo.operatorType = consts.order_operation_logs.operatorType.系统自动;
      operationLogsObj.targetInfo.targetType = consts.order_operation_logs.targetType.报价单;
      operationLogsObj.targetInfo.targetId = quoteOrderInfo.quoteOrderId;
      operationLogsObj.operation = consts.order_operation_logs.operation.报价单失效;
      operationLogsObj.remark = '报价单失效';
      yield orderOperationLogsService.create(operationLogsObj);
    }
    return G.resSuccessMsg(orderInfo);

  }catch(err){
    throw err;
  }
}