/**
 * Created by tangtang on 2016/11/29.
 */
/**
 * 发送短信,或者语音验证码
 */
const msg_url= 'sms-api.luosimao.com';
const voice_url= 'voice-api.luosimao.com';
const msg_path = '/v1/send.json';
const voice_path = '/v1/verify.json';
const msg_key = 'api:key-250ed9ce48710cbe4b6640564eb53c5b';
const voice_key = 'api:key-b5f83c8dd9a8dacb75f042f37346b1ac'
const https = require("https");
const querystring = require('querystring');

let _sendMegOrVoice = function (postData,host,path,auth){
  let content = querystring.stringify(postData);
  const options = {
    host:host,
    path:path,
    method:'POST',
    auth:auth,
    agent:false,
    rejectUnauthorized : false,
    headers:{
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-Length' :content.length
    }
  };
  return new Promise(function(resolve,reject){
    let req = https.request(options,function(res){
      res.setEncoding('utf8');
      res.on('data',function(chunk){
        console.log('chunk',chunk);
        const _chunk = JSON.parse(chunk);
        resolve(_chunk);
      })
    });
    req.write(content);
    req.end();
  })
};


exports.sendMsg =  function (postData){
  return _sendMegOrVoice(postData,msg_url,msg_path,msg_key);
};

exports.sendVoice =  function (postData){
  return _sendMegOrVoice(postData,voice_url,voice_path,voice_key);
};