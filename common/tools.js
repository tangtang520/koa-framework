/**
 * Created by tangtang on 2016/11/23.
 */
const crypto = require('crypto');

exports.md5 = function (str) {
  const md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
};

exports.keyValueToValueKey = function (obj = {}) {
  let _obj = {};
  for(let k in obj){
    _obj[obj[k]] = k;
  };
  return _obj;
};
