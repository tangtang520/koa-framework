/**
 * Created by tangtang on 2016/11/28.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const EnquirySchema = new Schema({
  carNo:{   //车牌信息
    type:String,
    required:true
  },
  enquiryType:{ //询价类型  ENUM-> enquiry_order.enquiryType
    type:String,
    required:true
  },
  intro:String,  //询价内容
  imgUrl:[String], //询价图片
  //保险询价
  insuranceKinds:{   //保险种类1.与去年相同 2.平台推荐 ENUM-> enquiry_order.insuranceKinds
    type:String,
    default:''
  },
  insuranceType:{ //保险类型 1.新保 2.续保 ENUM-> enquiry_order.insuranceType
    type:String,
    default:''
  },
  originalInsuranceCompany:String, //原投保公司 所传信息待定
  intentionCompany:[String], //意向公司 1.平安 2.人保 3.太平洋
  customerType:{ //客户类型 公户|个人   ENUM-> enquiry_order.customerType
    type:String,
    default:''
  },
  //轮胎询价
  carBrandInfo:{ //车牌 车系 车型
    brand:String,
    series:String,
    style:String
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
mongoose.model('Enquiry',EnquirySchema);
