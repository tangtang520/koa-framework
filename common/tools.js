/**
 * Created by tangtang on 2016/11/23.
 */
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const uuid = require('uuid/v1');

exports.md5 = function (str) {
  const md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
};

exports.keyValueToValueKey = function (obj = {}) {
  let _obj = {};
  for(let k in obj){
    _obj[obj[k]] = k;
  }
  return _obj;
};


exports.matchPhone = function (phone) {
  const pattern = /0?(13|14|15|18)[0-9]{9}/;
  return pattern.test(phone);
};

exports.createVCode = function (num) {
  let str = '';
  num.forEach((n) => {
    str += Math.floor(Math.random() * 10);
  });
  return str;
}

exports.sendMail = function (toUser='1315803594@qq.com') {
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: '1315803594@qq.com',
      pass: 'itlnpwrokqschdic'
    }
  });

  const mailOptions = {
    from: '1315803594@qq.com', // sender address
    to: toUser, // list of receivers
    subject: '余额不足', // Subject line
    text: '余额不足 🐴', // plaintext body
    html: '<b>验证码服务余额不足</b>' // html body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      T.error('error--->>',error);
    }
    T.debug('Message sent: ' + info.response);
  });
}

//生成id
exports.uuid = function () {
  return uuid().replace(/-/g,'');
}
