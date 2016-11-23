/**
 * Created by tangtang on 2016/11/23.
 */
module.exports = function (schema) {
  schema.pre('update',function () {
    schema.update({},{$set:{updateTime:Date.now()}})
  })
}