// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    //需要从前端传过openid数据，通过openid字段来获取日志信息
    return await db.collection('logs').where({
     openid: event.openid
    }).get()
  } catch (e) {
    //插入数据错误
    console.log(e)
  }
}
