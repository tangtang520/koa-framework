/**
 * Created by tangtang on 2016/11/23.
 */
const models = require('../models');
const User = models.User;
const Dao = require('../dao');
const dao = new Dao(User);
const jwt = require('jsonwebtoken');
const redisCli = require('../redis');

module.exports = dao;

dao.test = function*(){
  return yield dao.create({userName:'11',password:'11'});
}

dao.login = function* (userName,password) {
  try{
    const userInfo = yield dao.findOne({userName:userName});
    if(!userInfo){
      return {code:-1};
    };
    if(userInfo.password !== password){
      return {code:-1};
    };
    //jwt token
    delete userInfo.password;
    const token = jwt.sign(userInfo,global.G.secret,{ expiresIn: '24h' });
    //redis exists true cover false insert
    const redis_set = yield redisCli.set(G.redisPrefix + userName,token);
    T.debug('redis_set-->>',redis_set);
    return {res:'SUCCESS',data:userInfo,token};
  }catch (err){
    T.error('login',err);
    this.body = {};
  }
};