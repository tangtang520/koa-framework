/**
 * Created by tangtang on 2016/11/28.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;
const tools = require('../common/tools');

/**
 * extraInfo:{
    //保险询价
    insuranceKinds:{   //保险种类1.与去年相同 2.平台推荐 ENUM-> order_enquiry.insuranceKinds
      type:String,
      default:''
    },
    insuranceType:{ //保险类型 1.新保 2.续保 ENUM-> order_enquiry.insuranceType
      type:String,
      default:''
    },
    originalInsuranceCompany:String, //原投保公司 所传信息待定
    intentionCompany:[String], //意向公司 1.平安 2.人保 3.太平洋
    customerType:{ //客户类型 公户|个人   ENUM-> order_enquiry.customerType
      type:String,
      default:''
    },
    //轮胎询价
    carBrandInfo:{ //车牌 车系 车型
      brand:String,
      series:String,
      style:String
    },
  },
 */

const EnquirySchema = new Schema({
  enquiryOrderId:{  //询价单号
    type:String,
    required:true,
    unique:true
  },
  branchInfo:{  //门店信息 从登陆中拿
    branchId:String,
    branchName:String
  },
  personInfo:{   //下单人信息 从登陆信息中拿
    personName:String,
    phone:String
  },
  carInfo:{   //车辆信息
    carNo:{
      type:String,
      required:true
    },
  },
  status:{   //状态   enum -> order_enquiry.status
    type:String,
    required:true
  },
  enquiryType:{ //询价类型  ENUM-> order_enquiry.enquiryType
    type:String,
    required:true
  },
  enquiryContent:{
    textIntro:String,  //询价内容
    imgIntro:[String], //询价图片
  },
  extraInfo:Mixed,  //这里记录不同的询价类型产生的不同的附加信息
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

EnquirySchema.plugin(BaseModel);

mongoose.model('Enquiry',EnquirySchema);
