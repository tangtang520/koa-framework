/**
 * Created by tangtang on 2016/11/23.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: String,
  password: String,
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
UserSchema.plugin(BaseModel);
mongoose.model('User',UserSchema);