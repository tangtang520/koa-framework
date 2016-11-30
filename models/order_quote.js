/**
 * Created by tangtang on 2016/11/29.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const QuoteSchema = new Schema({
  quoteOrderId:{   //报价单id uuid
    type:String,
    required:true,
    unique:true
  },
  enquiryOrderId:{  //记录询价单内容
    type:String,
    required:true
  },
  personInfo:{   //报价人员信息 从登陆信息中可以拿 todo 具体的信息待定
    userName:String,
    userType:String,
    realName:String
  },
  quoteContent:Mixed,    //这里记录报价内容  todo->>具体的需求待定
  desc:String,     //报价的描述信息
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

QuoteSchema.plugin(BaseModel);

mongoose.model('Quote',QuoteSchema);