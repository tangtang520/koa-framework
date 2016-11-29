/**
 * Created by tangtang on 2016/11/29.
 */
const urllib = require('urllib');

function send(url,type,param){
  return new Promise(function(resolve, reject) {
    urllib.request(url,
      {
        method: type,
        headers: {
          'Content-Type': 'application/json'
        },
        dataType:'json',
        timeout:20000,
        data: param
      },function (err, data) {
        if (err) {
          reject(err);
        }
        else {
          resolve(data);
        }
      }
    );
  });
}

exports.post = function(url,param) {
  return send(url,'POST',param);
};

exports.get = function(url,param) {
  return send(url,'GET',param);
};
exports.put = function(url,param) {
  return send(url,'PUT',param);
};