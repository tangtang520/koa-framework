/**
 * Created by tangtang on 2016/11/24.
 */
global.G = global.G || {};


//global
G.secret = 'dhapi';
//redis key prefix
G.redisPrefix = 'jwtUser-';
//验证码存在redis的前缀
G.vCodePrefix = 'phone-';
//验证码失效时间 ms
G.codeCreateInterval = 1 * 60 * 1000;
//每天生成验证码的最大次数
G.codeMaxCount = 5;