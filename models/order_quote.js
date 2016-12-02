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
  resPlansInfo:[{   //为了保险公司
    insurer:String,   //保险公司   PICC(中国人保)、PAIC(中国平安)、CIPC(太平洋保险)
    rebate:Number, //报价比例
    priceInfo:{
      originPrice:Number,   //原始价
      platformPrice:Number, //平台报价
      settlementPrice:Number, //结算价
    },
    insuranceKinds:[{       //险种信息
      insuranceId:String, //险种id
      name:String, //名称
      limitPrice:String, //责任限额
      sumInsured:Number   //保险金额
    }]
  }],
  resGoodsInfo:[{                 //报价商品
    name:{type: String},         //名称
    brandInfo:[{
      brandType:String, //原厂 各个品牌
      priceInfo:{
        originPrice:Number,   //原始价
        platformPrice:Number, //平台报价
        settlementPrice:Number, //结算价
      }
    }],
    description:{type: String}    //商品本身的描述
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