/**
 * Created by tangtang on 2016/11/23.
 */
const mongoose = require('mongoose');
const BaseModel = require('./base_model');
const tools = require('../common/tools');
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
UserSchema.pre('save',function (next) {
  if(!this.isModified('password')){
    return next();
  };
  this.password = tools.md5(this.password);
  next();
});
UserSchema.set('toJSON',{
  getters: true,
  transform: function (doc,ret,options) {
    delete ret.password;
    delete ret.id;
  }
})
mongoose.model('User',UserSchema);