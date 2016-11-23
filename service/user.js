/**
 * Created by tangtang on 2016/11/23.
 */
const models = require('../models');
const User = models.User;
const Dao = require('../dao');
const dao = new Dao(User);

exports.test = function*(){
  return yield dao.create({userName:'11'});
}