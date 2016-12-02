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
      "已报价":"QUOTE",  //报价之后
      "已完成":"DONE",   //预约下单之后
      "已取消":"CANCEL", //店面取消询价
    }
  },
  //报价单
  order_quote:{
    status:{
      "正常":"NORMAL",
      "失效":"INVALID"
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
      "预约下单":"APPOINT_PLACE_ORDER",  //询价下单才有
      "已接单":"DONE_ACCEPT",
      "服务中":"DOING_SERVICE",  //服务中包含很多状态 更多状态应该在orderLogs中体现 （意淫的）
      "车辆已送达":"CAR_RETURN",
      "已付款":"DONE_PAY",
      "已完成":"END_SUCCESS",
      "客户询价取消":"CLIENT_ENQUIRY_CANCEL",
      "技师取消订单":"TECHNICIAN_CANCEL_ORDER"
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
  },
  order_operation_logs:{
    operatorType:{
      "店面":"BRANCH",
      "技师":"TECHNICIAN",
      "后台运营":"OPERATING",
      "系统自动":"SYSTEM_AUTO"
    },
    targetType:{
      "询价单":"ENQUIRY_ORDER",
      "报价单":"QUOTE_ORDER",
      "订单":"ORDER"
    },
    operation:{
      "生成询价单":"CREATE_ENQUIRY_ORDER",
      "询价单变为已报价":"ENQUIRY_ORDER_TO_QUOTE",
      "生成报价单":"CREATE_QUOTE_ORDER",
      "报价单重新报价":"QUOTE_ORDER_AGAIN_QUOTE",
      "维修询价下单":"MAINTAIN",
      "保险询价下单":"INSURANCE",
      "轮胎询价下单":"TIRE",
      "自费保养下单":"MAINTENANCE_ORDER",
      "自费钣喷下单":"SPRAY_ORDER",
      "出险下单":"OUT_OF_DANGER_ORDER",
      "任性下单":"WAYWARD_ORDER",
      "询价单完成":"ENQUIRY_ORDER_DONE",
      "报价单失效":"QUOTE_ORDER_INVALID",
      // "询价单取消":"ENQUIRY_ORDER_CANCEL",

      // "报价单失效":"QUOTE_ORDER_INVALID"
    }
  }
}