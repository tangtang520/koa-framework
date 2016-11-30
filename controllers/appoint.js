/**
 * Created by tangtang on 2016/11/30.
 */

const appointService = require('../service/appoint');
exports.insertAppointOrder = function* () {
  try{
    const data = this.request.body;
    T.debug('data-->>',data);
    if(!data.appointContent){
      return this.body = G.resErrorMsg('xxx','缺少appointContent')
    }
    if(!data.quoteOrderId){
      return this.body = G.resErrorMsg('xxx','缺少quoteOrderId')
    }
    if(!data.appointInfo){
      return this.body = G.resErrorMsg('xxx','缺少appointInfo')
    }
  }catch (err){
    T.error('err-->>',err);
  }
}