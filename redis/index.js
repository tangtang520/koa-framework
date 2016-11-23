/**
 * Created by tangtang on 2016/11/23.
 */
'use strict'
const redis = require('redis');
const logger = require('../common/logger');
const config = require('../config/config');
const client = redis.createClient(config.redis.port,config.redis.host,config.redis.options);

/**
 * redis 链接
 */
client.on('connect',() => {
  logger.info('redis connected to',config.redis.host,':',config.redis.port);
  // 正式环境清空redis
  if(process.env.NODE_ENV === 'production'){
    client.flushdb();
  };
});
client.on('error',(err) => {
  logger.error('redis error-->>>',err);
});

// export
module.exports = client;
