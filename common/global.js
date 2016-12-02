/**
 * Created by tangtang on 2016/11/24.
 */
global.G = global.G || {};


//global
G.secret = 'dhapi';
//token前缀
G.tokenPrefix = 'phone_token-';
//验证码存在redis的前缀
G.vCodePrefix = 'phone_code-';
//验证码生成的最小时间间隔 ms
G.codeCreateInterval = 1 * 60 * 1000;
//每天生成验证码的最大次数
G.codeMaxCount = 5;
//验证码失效时间 ms
G.invalidTime = 5 * 60 * 1000;
//jwt secret
G.jwtSecret = 'dhJwtSecret';