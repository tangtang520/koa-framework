/**
 * Created by tangtang on 2016/11/29.
 * 预约单
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const tools = require('../common/tools');
const Schema = mongoose.Schema;

const AppointSchema = new Schema({
  appointOrder:{   //预约单号
    type:String,
    required:true,
    unique:true
  },
  appointContent:{  //这里记录预约内容 todo

  },
  quoteOrderId:String, //记录报价单信息 推送消息带过去的
  appointInfo:{ //预约信息
    appointmentTime:String,  //预约时间
    pickupLocation:String,   //接车地点
    linkman:String, //联系人
    phone:String, //联系电话
  },
  branchInfo:{      //门店信息
    branchId:String,
    branchName:String
  },
  desc:String,  //预约说明信息
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

AppointSchema.plugin(BaseModel);

mongoose.model('Appoint',AppointSchema);