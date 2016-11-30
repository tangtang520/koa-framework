/**
 * Created by tangtang on 2016/11/28.
 */

/**
 * serviceInfo:{
  //询价下单
  enquiryOrderId:String,
  ,
  //自费保养
  serviceInfo:[{  //服务信息
    serviceId:String,//服务id
    serviceName:String,
    servicePrice:Number
  }],
    //钣喷
    sprayQuotation:{
    //这里记录钣喷报价信息
  },
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
}
 */


const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const tools = require('../common/tools');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;


const OrderSchema = new Schema({
  orderId:{
    type:String,
    required:true,
    unique:true
  },
  carInfo:{   //记录车的信息
    carNo:String,
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
  personInfo:{   //下单人信息 从登陆信息中拿
    personName:String,
    phone:String
  },
  price:Number,  //订单的价格
  serviceInfo:Mixed,  //这里记录不同的下单 记录不同的内容
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
OrderSchema.plugin(BaseModel);

OrderSchema.pre('save',function (next) {
  this.orderId = tools.uuid();
  next();
})
mongoose.model('Order',OrderSchema);