/**
 * Created by tangtang on 2016/11/24.
 */
module.exports = {
  //询价单
  order_enquiry:{
    enquiryType:{
      "维修询价":"MAINTAIN",
      "保险询价":"INSURANCE",
      "轮胎询价":"TIRE"
    },
    insuranceKinds:{
      "与去年相同":"SAME_LAST_YEAR",
      "平台推荐":"PLATFORM_RECOMMEND"
    },
    insuranceType:{
      "新保":"NEW",
      "续保":"RENEWAL"
    },
    customerType:{
      "公户":"SURNAME",
      "个人":"PERSONAGE"
    },
    status:{
      "待报价":"WAITING", //第一次提交
      "已报价":"DONE",  //报价之后
      "已取消":"CANCEL", //店面取消询价
    }
  },
  //订单
  order:{
    orderType:{
      "维修询价下单":"MAINTAIN",
      "保险询价下单":"INSURANCE",
      "轮胎询价下单":"TIRE",
      "自费保养下单":"MAINTENANCE_ORDER",
      "自费钣喷下单":"SPRAY_ORDER",
      "出险下单":"OUT_OF_DANGER_ORDER",
      "任性下单":"WAYWARD_ORDER"
    },
    status:{
      "提交订单":"CREATE_ORDER",
      "报价中":"DOING_QUOTE", //询价下单才有
      "已报价":"DONE_QUOTE",  //询价下单才有
      "提交预约":"SUBMIT_APPOINTMENT",
      "已预约":"DONE_APPOINTMENT",
      "技师已指派":"TECHNICIAN_ASSIGNED",
      "服务中":"DOING_SERVICE",  //服务中包含很多状态 更多状态应该在orderLogs中体现 （意淫的）
      "车辆已送达":"CAR_RETURN",
      "已付款":"DONE_PAY",
      "已完成":"END_SUCCESS",
      "已取消":"CANCEL"
    },
    metalPlateType:{
      "小钣金":"SMALL_<=5CM",
      "中钣金":"MIDDLE_5-20CM",
      "大钣金":"BIG_20-40CM"
    }
  },
  order_Logs:{
    status:{
      "提交订单":"CREATE_ORDER",
      "报价中":"DOING_QUOTE", //询价下单才有
      "已报价":"DONE_QUOTE",  //询价下单才有
      "提交预约":"SUBMIT_APPOINTMENT",
      "已预约":"DONE_APPOINTMENT",
      "技师已指派":"TECHNICIAN_ASSIGNED",
      "正在送往服务地点":"DOING_SEND_SERVICE_SITE",
      "已送达服务地点":"DONE_SEND_SERVICE_SITE",
      "施工完成技师检查无问题":"TECHNICIAN_CHECK_TRUE",
      "正在送车":"DOING_RETURN_CAR",
      "车辆已送达":"CAR_RETURN",
      "已付款":"DONE_PAY",
      "已完成":"END_SUCCESS",
      "已取消":"CANCEL"
    },
  }
}