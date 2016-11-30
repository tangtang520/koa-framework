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
    return this.model.findOne(this.queryIncludesIsDelete(query),select,this.optionsSortDesc(options)).exec();
  }
  find(query,select,options){
    return this.model.find(this.queryIncludesIsDelete(query),select,this.optionsSortDesc(options)).exec();
  }
  update(query,doc,options){
    return this.model.update(this.queryIncludesIsDelete(query),doc,this.optionsSortDesc(options)).exec();
  }
  findById(id,select,options){
    return this.model.findById(id,select,this.optionsSortDesc(options)).exec();
  }
  findOneAndUpdate(query,doc,options){
    return this.model.findOneAndUpdate(this.queryIncludesIsDelete(query),doc,this.optionsSortDesc(options)).exec();
  }
  findByIdAndUpdate(id,doc,options){
    return this.model.findByIdAndUpdate(id,doc,this.optionsSortDesc(options)).exec();
  }
  count(query){
    return this.model.count(query).exec();
  }
  queryIncludesIsDelete(query={}){
    if(!('isDelete' in query)){
      query['isDelete'] = false;
    };
    return query;
  }
  optionsSortDesc(options={}){
    if('sort' in options){
      if(!('_id' in options['sort'])){
        options['sort']['_id'] = -1;
      }
    }else{
      options['sort'] = {_id:-1};
    }
    return options;
  }
  list(query,select,options){
    let sum = 0 , self = this;
    let countPromise = this.count(query);
    let findPromise = this.find(query,select,options);
    return Promise.all([countPromise,findPromise]);
  }
}