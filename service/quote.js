/**
 * Created by tangtang on 2016/11/30.
 */
const models = require('../models');
const Quote = models.Quote;
const Dao = require('../dao');
const quoteService = new Dao(Quote);
const redisCli = require('../redis');
const consts = require('../common/consts');
const tools = require('../common/tools');
const enquiryService = require('./enquiry');
const orderOperationLogsService = require('./order_operation_logs');

module.exports = quoteService;

quoteService.insertQuoteOrder = function* (data) {
  try{
    //首先查看询价单是否可以报价 预约下单成功之后就不允许报价了
    const enquiryOrderInfo = yield enquiryService.findOne({enquiryOrderId:data.enquiryOrderId});
    if(!enquiryOrderInfo ||
      (!!enquiryOrderInfo && enquiryOrderInfo.status === consts.order_enquiry.status.已取消) ||
      (!!enquiryOrderInfo && enquiryOrderInfo.status === consts.order_enquiry.status.已完成)){
      return G.resErrorMsg(-1,'该询价单不允许再次报价');
    }
    //生成报价单 重复报价 更新信息 第一次报价 新增信息
    let quoteOrderInfo = yield quoteService.findOne({enquiryOrderId:data.enquiryOrderId});
    let operationLogsObj = {
      operatorInfo:{
        operatorType:consts.order_operation_logs.operatorType.后台运营,
        operatorId:'', //todo 这里记录后台登录人的用户名
        operatorName:'', //todo 记录后台登录人的姓名
        operatorPhone:'', //todo 后台登录人的电话
      },
      targetInfo:{
        targetType:consts.order_operation_logs.targetType.报价单,
        targetId:'',
      },
      operation:'',
      extraInfo:'',
      remark:''
    };
    if(!!quoteOrderInfo){
      //更新
      quoteOrderInfo.personInfo = {}; //todo 登录信息拿
      quoteOrderInfo.quoteContent = data.quoteContent;
      quoteOrderInfo.desc = data.desc || quoteOrderInfo.desc || '';
      quoteOrderInfo.status = consts.order_quote.status.正常;
      yield quoteOrderInfo.save();
      operationLogsObj.targetInfo.targetId = quoteOrderInfo.quoteOrderId;
      operationLogsObj.operation = consts.order_operation_logs.operation.报价单重新报价;
      operationLogsObj.remark = '报价单重新报价';
      yield orderOperationLogsService.create(operationLogsObj);
    }else{
      //新增
      data.quoteOrderId = tools.uuid();
      data.personInfo = {}; //todo 登录信息拿
      const newQuoteOrderInfo = yield quoteService.create(data);
      operationLogsObj.targetInfo.targetId = newQuoteOrderInfo.quoteOrderId;
      operationLogsObj.operation = consts.order_operation_logs.operation.生成报价单;
      operationLogsObj.remark = '生成报价单';
      yield orderOperationLogsService.create(operationLogsObj);
      //询价单改为已报价
      if(enquiryOrderInfo.status === consts.order_enquiry.status.待报价){
        enquiryOrderInfo.status = consts.order_enquiry.status.已报价;
        yield enquiryOrderInfo.save();
        operationLogsObj.targetInfo.targetType = consts.order_operation_logs.targetType.询价单;
        operationLogsObj.targetInfo.targetId = enquiryOrderInfo.enquiryOrderId;
        operationLogsObj.operation = consts.order_operation_logs.operation.询价单变为已报价;
        operationLogsObj.remark = '询价单变为已报价';
        yield orderOperationLogsService.create(operationLogsObj);
      }
    }
    //todo 1,给店面发推送报价消息 2,记录消息数据
    return G.resSuccessMsg();
  }catch (err){
    throw err;
  }
}