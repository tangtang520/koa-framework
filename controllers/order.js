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
    if(!data.carInfo || (!!data.carInfo && !data.carInfo.carNo)){
      return this.body = G.resErrorMsg('xxx','缺少 carInfo');
    }
    if(!data.orderType){
      return this.body = G.resErrorMsg('xxx','缺少 orderType 不符合');
    }
    if(!data.appointContent){
      return this.body = G.resErrorMsg('xxx','缺少 appointContent 不符合');
    }
    if(!data.appointInfo){
      return this.body = G.resErrorMsg('xxx','缺少 appointInfo 不符合');
    }
    if(!data.serviceInfo){
      return this.body = G.resErrorMsg('xxx','缺少 serviceInfo 不符合');
    }
    const orderTypeMap = tools.keyValueToValueKey(consts.order.orderType);
    if(!(data.orderType in orderTypeMap)){
      return this.body = G.resErrorMsg('xxx','orderType 不符合');
    }
    this.body = yield orderService.insertOrder(data);
  }catch (err){

  }
}