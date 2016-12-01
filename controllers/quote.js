/**
 * Created by tangtang on 2016/11/30.
 */

const quoteService = require('../service/quote');

exports.insertQuoteOrder = function* () {
  try{
    const data = this.request.body;
    T.debug('data-->>',data);
    if(!data.enquiryOrderId){
      return this.body = G.resErrorMsg('xxx','缺少enquiryOrderId')
    }
    const result = yield quoteService.insertQuoteOrder(data);
    this.body = result;
  }catch (err){
    T.error('err--->>',err);
  }
}