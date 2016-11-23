/**
 * Created by tangtang on 2016/11/23.
 */
const userService = require('../service/user');
exports.test = function* () {
  this.body = yield userService.test();
}