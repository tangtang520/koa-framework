/**
 * Created by tangtang on 2016/11/23.
 */
'use strict'
const redis = require('redis');
const config = require('../config/config');
const client = redis.createClient(config.redis.port,config.redis.host,config.redis.options);

/**
 * redis 链接
 */
client.on('connect',() => {
  T.info('redis connected to',config.redis.host,':',config.redis.port);
  // 正式环境清空redis
  if(process.env.NODE_ENV === 'production'){
    client.flushdb();
  };
});
client.on('error',(err) => {
  T.error('redis error-->>>',err);
});

exports.set = function (key,value) {
  return new Promise((resolve,reject) => {
    client.set(key,value,function (err,result) {
      if(err){
        reject(err);
      };
      resolve(result);
    })
  })
}

exports.get = function (key) {
  return new Promise((resolve,reject) => {
    client.get(key,function (err,result) {
      if(err){
        reject(err);
      };
      resolve(result);
    })
  })
}

exports.del = function (key) {
  return new Promise((resolve,reject) => {
    client.del(key,function (err,res) {
      if(err){
        reject(err);
      }
      resolve(res);
    })
  })
}

