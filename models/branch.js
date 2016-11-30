/**
 * Created by tangtang on 2016/11/29.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const tools = require('../common/tools');
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
  branchId:{
    type:String,
    required:true,
    unique:true
  },
  name:String,    //门店名称
  headImg:String, //门头照片 一张
  branchImg:[String], //门店的其他照片
  openTime:String, //门店开门时间
  closeTime:String, //门店关门时间
  branchType:String, //门店类型 实体门店,虚拟门店,线上平台
  branchModel:String,  //门店模式 自营模式,加盟模式
  tel:String,   //门店电话
  managePer:{
    staffId:String, //门店负责人ID
    name:String, //门店负责人名字
    tel:String //电话
  },
  status:String,  //门店状态 正在营业,暂停营业,关闭营业
  location:{   //门店所在位置  省,市,区
    province:String,
    city:String,
    area:String
  },
  address:String, //门店详细地址
  areaInfo:{   //区域信息
    cityId: {
      type:String,
      ref:'Area'
    },
    cityName:String,
    areaId:{
      type:String,
      ref:'Area'
    },
    areaName:String
  },
  gitude:[Number],
  carParkNo: Number,  //车位数(工位数)
  workPositon:[{
    type:String,
    ref:'WorkPosition'
  }],
  intro:String, //门店描述
  tags:[String],//标签
  cameraId:[String], //门店所属的摄像头id
  level:String, //门店等级 A类,B类,C类
  isDelete:{   //是否删除字段
    type:Boolean,
    default:false
  },
  createTime:{
    type:Date,
    default:Date.now()
  },
  updateTime:{  //表更新时间
    type:Date,
    default:Date.now()
  },
  propertyName:String, //物业名称
  propertyStaff:String, //物业联系人
  propertyTel:String, //联系人电话  判断格式
  propertyMail:String, //物业邮箱
  contractNo:String, //合同编号
  contractStartTime:Date, //合同开始时间
  contractEndTime:Date,  //合同结束时间
  contractPath:String //合同文件地址
});
BranchSchema.plugin(BaseModel);

mongoose.model('Branch',BranchSchema);