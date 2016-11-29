/**
 * Created by tangtang on 2016/11/29.
 */
const enquiryService = require('../service/enquiry');
const consts = require('../common/consts');
const tools = require('../common/tools');

exports.insertEnquiryOrder = function* () {
  try{
    const req = this.request.body;
    T.debug('req-->>',req);
    const data = JSON.parse(req.params);
    if(!data.carNo){
      return this.body = G.resErrorMsg('xxx','缺少carNo');
    };
    if(!data.enquiryType){
      return this.body = G.resErrorMsg('xxx','缺少enquiryType');
    };
    const enquiryTypeMap = tools.keyValueToValueKey(consts.order_enquiry.enquiryType);
    if(!(data.enquiryType in enquiryTypeMap)){
      return this.body = G.resErrorMsg('xxx','询价类型不正确');
    };
    if(!data.intro && !data.imgUrl){
      return this.body = G.resErrorMsg('xxx','上传询价内容');
    };
    if(data.enquiryType === consts.order_enquiry.enquiryType.轮胎询价){
      if(
        !data.carBrandInfo
        || (!!data.carBrandInfo && !data.carBrandInfo.brand)
        || (!!data.carBrandInfo && !data.carBrandInfo.series)
        || (!!data.carBrandInfo && !data.carBrandInfo.style)
      ){
        return this.body = G.resErrorMsg('xxx','缺少carBrandInfo');
      }
    };
    //create
    const result = yield enquiryService.insertEnquiryOrder(data);
    this.body = G.resSuccessMsg();
  }catch (err){

  }
}