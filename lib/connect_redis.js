/**
 * Created by tangtang on 16/5/11.
 */
// 'use strict'
// const redis = require("redis");
// const config = require("../config/config");
// const RedisConfig = config.redis;
// const client = redis.createClient(
//     RedisConfig.port,
//     RedisConfig.ip
//     //RedisConfig.option
// );
// client.on('error',function(error){
//     console.log(error);
// });
// client.on("ready",function(err){
//     console.log("ready");
// });
// client.on("connect",function(){
//     console.log("redis connect to " + RedisConfig.ip + ":" + RedisConfig.port);
// });
// client.on("end",function(err){
//     console.log("end");
// });
// module.exports = client;