/**
 * Created by tangtang on 2016/11/29.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const tools = require('../common/tools');
const Schema = mongoose.Schema;
const BranchSchema = new Schema({
  branchId:String,
  name:String,
  //一些其他的信息
  ownerInfo:{
    phone:{
      type:String,
      required:true,
      unique:true,
      match:[/0?(13|14|15|18)[0-9]{9}/,'电话格式不正确']
    }
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
BranchSchema.plugin(BaseModel);
mongoose.model('Branch',BranchSchema);