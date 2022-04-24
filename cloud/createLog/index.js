// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('logs').add({
      //event是从前端传递过来的参数对象，我们后面会在pages/index/index.js文件中的addLog方法中调用云函数createlog时，传递add、date、openid这些参数
      data: {
        add: event.add,
        date:event.date,
        openid:event.openid
      }
    })
  }catch(e){
    //插入数据错误
    console.log(e)
  }
}
