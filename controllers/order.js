/**
 * Created by tangtang on 2016/11/29.
 */
const orderService = require('../service/order');
const consts = require('../common/consts');
const tools = require('../common/tools');

exports.insertOrder = function* () {
  try{
    const req = this.request.body;
    T.debug('req--->>',req);
    const data = JSON.parse(req.params);
    



    const orderTypeMap = tools.keyValueToValueKey(consts.order.orderType);
    if(!(data.orderType in orderTypeMap)){
      return this.body = G.resErrorMsg('xxx','orderType 不符合');
    };
    this.body = yield orderService.insertOrder(data);
  }catch (err){

  }
}