/**
 * Created by tangtang on 2016/11/29.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const tools = require('../common/tools');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const OrderLogsSchema = new Schema({
  orderInfo:{      //关联订单信息
    type:ObjectId,
    ref:'Order',
    required:true,
    unique:true
  },
  status:{       //状态
    type:String,
    required:true
  },
  quoteInfo:{
    //这里记录报价信息 从报价单中获取 带过来 根据需求判断带id 还是冗余
  },
  appointmentInfo:{
    //这里记录预约信息 根据需求判断是从预约表拿来数据 还是在order表中记录一个字段关于预约的数据
  },
  technicianInfo:{
    //这里记录技师信息 技师信息是后台填写的
  },
  pickUpCarInfo:{
    //这里记录接车信息 也是后台填写的
  },
  serviceSiteInfo:{
    //这里记录维修地点信息
  },
  serviceResult:{
    //这里记录服务结果信息
  },
  sendCarInfo:{
    //这里记录送车信息
  },
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
mongoose.model('OrderLogs',OrderLogsSchema);
