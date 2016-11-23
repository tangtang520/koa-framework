/**
 * Created by tangtang on 2016/11/23.
 */
module.exports = class{
  constructor(model){
    Object.assign(this,{model})
  }
  create(obj){
    return this.model.create(obj);
  }
  findOne(query,select,options){
    return this.model.findOne(query,select,options).exec();
  }
  find(query,select,options){
    return this.model.find(query,select,options).exec();
  }
  update(query,doc,options){
    return this.model.update(query,doc,options).exec();
  }
  findById(id,select,options){
    return this.model.findById(id,select,options).exec();
  }
  findOneAndUpdate(query,doc,options){
    return this.model.findOneAndUpdate(query,doc,options).exec();
  }
  findByIdAndUpdate(id,doc,options){
    return this.model.findByIdAndUpdate(id,doc,options).exec();
  }
}