/**
 * Created by tangtang on 2016/11/23.
 */
const userService = require('../service/user');
exports.test = function* () {
  const result = yield userService.test();
  T.info(result);
  this.body = result;
};

exports.login = function* () {
  try{
    const req = this.request.body;
    T.info('req--->>',req)
    if(!req.userName || !req.password){
      this.body = {code:-1};
      return;
    };
    const userInfo = yield userService.login(req.userName,req.password);
    this.body = userInfo;
  }catch (err){
    T.error(err);
    this.body = {code:-1};
  }
}