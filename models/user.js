/**
 * Created by tangtang on 2016/11/23.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: String,
  password: String
});
mongoose.model('User',UserSchema);