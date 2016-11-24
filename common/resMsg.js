/**
 * Created by tangtang on 2016/11/24.
 */
global.G = {};
G.resSuccessMsg = function (data={},options) {
  return Object.assign({
    res: 'SUCCESS',
    data:data
  },options)
};
G.resErrorMsg = function (code=-1,message='系统错误') {
  return {
    res:'FAILED',
    error: {
      code:code,
      message:message
    }
  };
}