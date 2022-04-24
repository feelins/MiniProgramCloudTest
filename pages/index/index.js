// index.js
// 获取应用实例
const app = getApp()
Page({
  //event就是我们通过data-add传递的参数对象
  addLog(event){
    const add = event.currentTarget.dataset.add
    console.log("add", add)
    
    //需要添加的部分
    const that = this
    const ui = wx.getStorageSync('userinfo')
    
    //如果缓存中没有用户信息，就跳转到我的页面
    if (!ui.openid){
      wx.switchTab({
        url: '/pages/me/me',
      })
    }else{
      //调用云函数createlog
      wx.cloud.callFunction({
        name: "createLog",
        data: {
          add: add,
          date: Date.now(),
          openid: ui.openid
        },
        success: function (res) {
          console.log("增加记录函数调用成功", res)
        },
        fail: function (res) {
          console.log("增加记录函数调用失败", res)
        }
      })
    }
  }
})
