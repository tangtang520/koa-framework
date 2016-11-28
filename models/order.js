/**
 * Created by tangtang on 2016/11/28.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const tools = require('../common/tools');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  carNo:{   //车牌信息
      type:String,
      required:true
  },
  carBrandInfo:{ //车牌 车系 车型
    brand:String,
    series:String,
    style:String
  },
  //自费保养
  serviceInfo:{

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
mongoose.model('Order',OrderSchema);