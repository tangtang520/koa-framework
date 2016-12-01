/**
 * Created by tangtang on 2016/11/29.
 */
const enquiryService = require('../service/enquiry');
const consts = require('../common/consts');
const tools = require('../common/tools');

//生成询价单
exports.insertEnquiryOrder = function* () {
  try{
    const req = this.request.body;
    T.debug('req-->>',req);
    const data = JSON.parse(req.params);
    if(!data.carInfo || (!!data.carInfo && !data.carInfo.carNo)){
      return this.body = G.resErrorMsg('xxx','缺少carNo');
    }
    if(!data.enquiryType){
      return this.body = G.resErrorMsg('xxx','缺少enquiryType');
    }
    const enquiryTypeMap = tools.keyValueToValueKey(consts.order_enquiry.enquiryType);
    if(!(data.enquiryType in enquiryTypeMap)){
      return this.body = G.resErrorMsg('xxx','询价类型不正确');
    }
    if(!data.enquiryContent
      || (!!data.enquiryContent && !data.enquiryContent.textIntro)
      || (!!data.enquiryContent && !data.enquiryContent.imgIntro)
    ){
      return this.body = G.resErrorMsg('xxx','缺少询价内容');
    }
    // if(data.enquiryType === consts.order_enquiry.enquiryType.轮胎询价){
    //   if(!data.extraInfo.carBrandInfo){
    //     return this.body = G.resErrorMsg('xxx','缺少carBrandInfo');
    //   }
    // };
    //create
    const enquiryOrderInfo = yield enquiryService.insertData(data);
    this.body = G.resSuccessMsg();
  }catch (err){
    T.error('err-->>',err);
  }
};

//生成询价单列表
exports.getList = function* () {
  try{
    const result = yield enquiryService.list();
    this.body = G.resSuccessMsg(result[1],{sum:result[0]});
  }catch (err){
    T.error('err--->>',err);
  }
}