/**
 * Created by tangtang on 2016/11/29.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;
const consts = require('../common/consts');

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
  status:{     //状态
    type:String,
    default:consts.order_quote.status.正常
  },
  quoteContent:[{   //这里记录报价内容
    serviceContent:String,  //比如 太平洋保险
    eachInfo:[{
      eachContent:String,   //比如车辆损失险 具体的款项
      price:{  //平台报价>=结算价
        originPrice:Number,   //原始价
        platformPrice:Number, //平台报价
        settlementPrice:Number //结算价
      }
    }]
  }],
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