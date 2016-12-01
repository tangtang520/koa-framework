/**
 * Created by tangtang on 2016/11/29.
 */
const models = require('../models');
const Enquiry = models.Enquiry;
const Dao = require('../dao');
const enquiryService = new Dao(Enquiry);
const redisCli = require('../redis');
const consts = require('../common/consts');
const orderService = require('./order');
const orderOperationLogsService = require('./order_operation_logs');
const tools = require('../common/tools');

module.exports = enquiryService;

enquiryService.insertData = function* (data) {
  try{
    data.enquiryOrderId = tools.uuid();
    data.branchInfo = {};   //todo 从登录信息拿
    data.personInfo = {};  //todo 从登陆信息拿
    data.status = consts.order_enquiry.status.待报价;
    const enquiryOrderInfo = yield enquiryService.create(data);
    //生成记录
    const operationLogsObj = {
      operatorInfo:{
        operatorType:consts.order_operation_logs.operatorType.店面,
        operatorId:'', //todo 这里记录门店id
        operatorName:'', //todo 记录门店name
        operatorPhone:'', //todo 门店联系人电话
      },
      targetInfo:{
        targetType:consts.order_operation_logs.targetType.询价单,
        targetId:enquiryOrderInfo.enquiryOrderId,
      },
      // operationInfo:{
      //   sourceStatus:'',
      //   toStatus:consts.order_enquiry.status.待报价,
      // },
      operation:consts.order_operation_logs.operation.生成询价单,
      extraInfo:'',
      remark:'生成询价单'
    };
    const enquiryOrderLogsInfo = yield orderOperationLogsService.create(operationLogsObj);
  }catch (err){
    throw err;
  }
}