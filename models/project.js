/**
 * Created by tangtang on 2016/11/29.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  projectId:{
    type:String,
    required:true,
    unique:true
  },
  name:String,
  items:{
    oneCategoryId:String,
    oneCategoryName:String,
    twoCategoryId:String,
    twoCategoryName:String,
    threeCategoryId:String,
    threeCategoryName:String
  },
  price:Number,
  sortNum:Number  //排序字段  asc
});
ProjectSchema.plugin(BaseModel);
mongoose.model('Project',ProjectSchema);