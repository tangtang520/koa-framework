/**
 * Created by tangtang on 2016/11/29.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const tools = require('../common/tools');
const Schema = mongoose.Schema;
const AppointmentSchema = new Schema({
  orderId:String, //订单id
  appointmentTime:String,  //预约时间
  pickupLocation:String,   //接车地点
  linkman:String, //联系人
  phone:String, //联系电话
  remark:String,  //预约说明信息
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
mongoose.model('Appointment',AppointmentSchema);