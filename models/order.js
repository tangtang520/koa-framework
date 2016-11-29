/**
 * Created by tangtang on 2016/11/28.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const tools = require('../common/tools');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
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
  orderType:{   //订单类型  ENUM -> order.orderType
    type:String,
    required:true
  },
  status:{        //订单状态  ENUM -> order.status
    type:String,
    default:''
  },
  branchInfo:{    //门店信息 从登陆信息中拿
    branchId:String,
    branchName:String
  },
  price:Number,  //订单的价格
  //询价下单
  enquiryInfo:{   //询价
    enquiryType:String,   //询价类型 为了以后便于统计 ENUM -> order.enquiryType
    enquiryRef:{          //ref 关联
      type:ObjectId,
      ref:'Enquiry'
    }
  },
  //自费保养
  serviceInfo:[{  //服务信息
    serviceId:String,//服务id
    serviceName:String,
    servicePrice:Number
  }],
  //钣喷
  paintInfo:{   //喷漆信息
    paintNum:Number, //喷锡数量
    isFullPaint:{   //是否全车喷锡
      type:Boolean,
      default:false
    }
  },
  metalPlateInfo:[{ //钣金信息
    metalPlateType:String, //钣金类型 小钣金，中，大  ENUM -> order.metalPlateType
    metalPlateNum:Number   //钣金数量
  }],
  //出险维修或者任性下单
  insuranceCompany:String, //保险公司
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