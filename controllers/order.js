/**
 * Created by tangtang on 2016/11/29.
 */
const orderService = require('../service/order');
const consts = require('../common/consts');
const tools = require('../common/tools');


//自费保养下单的选择服务 可以传serviceId = 'id1-id2-id3-id4'
exports.insertOrder = function* () {
  try{
    const req = this.request.body;
    T.debug('req--->>',req);
    const data = JSON.parse(req.params);
    switch (true){
      case(!data.carNo):
        return this.body = G.resErrorMsg('xxx','缺少carNo');
      case (!data.orderType):
        return this.body = G.resErrorMsg('xxx','缺少orderType');
      case (data.orderType === consts.order.orderType.自费保养下单
          && !data.carBrandInfo):
        return this.body = G.resErrorMsg('xxx','缺少carBrandInfo');
      case (data.orderType === consts.order.orderType.自费保养下单
          && !data.serviceId):
        return this.body = G.resErrorMsg('xxx','缺少serviceId');
      case (data.orderType === consts.order.orderType.自费钣喷下单
          && !data.sprayQuotation):
        return this.body = G.resErrorMsg('xxx','缺少sprayQuotation');
      case ((data.orderType === consts.order.orderType.出险下单
          || data.orderType === consts.order.orderType.任性下单)
          && !data.insuranceCompany):
        return this.body = G.resErrorMsg('xxx','缺少insuranceCompany');
    };
    const orderTypeMap = tools.keyValueToValueKey(consts.order.orderType);
    if(!(data.orderType in orderTypeMap)){
      return this.body = G.resErrorMsg('xxx','orderType 不符合');
    };
    this.body = yield orderService.insertOrder(data);
  }catch (err){

  }
}