/**
 * Created by tangtang on 2016/11/29.
 */

const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const tools = require('../common/tools');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

const OrderOperationLogsSchema = new Schema({
  operatorInfo:{  //操作端信息
    operatorType:String,   //操作者类型 有可能是店面 有可能是技师 enum -> order_operation_logs.operatorType
    operatorId:String,
    operatorName:String,
    operatorPhone:String
  },
  targetInfo:{              //被操作信息
    targetType:String,      //询价单 或者 订单....  ENUM -> order_operation_logs.targetType
    targetId:String, //操作对应表的id
  },
  // operationInfo:{  //操作信息
  //   sourceStatus:String,  //开始状态
  //   toStatus:String,      //结束状态
  // },
  operation:String,  //操作类型
  extraInfo:Mixed, //记录一些额外信息
  remark:String,//备注信息
  createTime:{
    type: Date,
    default: Date.now
  },
  updateTime:{
    type: Date,
    default: Date.now
  },
  isDelete:{
    type: Boolean,
    default: false
  }
});
mongoose.model('OrderOperationLogs',OrderOperationLogsSchema);
