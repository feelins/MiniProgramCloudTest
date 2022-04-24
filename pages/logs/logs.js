//加载util.js文件，用来格式化日期
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  getlogs:function(){
    //从缓存中获取用户信息
    const ui = wx.getStorageSync('userinfo')
    //如果缓存中没有用户信息，就跳转到我的页面
    if (!ui.openid) {
      wx.switchTab({
        url: '/pages/me/me',
      })
    }else{
      const that = this
      wx.cloud.callFunction({
        name: "showLog",
        data: {
          openid: ui.openid
        },
        success: function (res) {
          console.log("ni", res)
          that.setData({
            logs: res.result.data.map(log => {
              var date = util.formatTime(new Date(log.date))
              log.date = date
              return log
            })
          })
          console.log("logs", that.data.logs)
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
  },
  //通过onShow生命周期函数，调用getlogs方法
  //这样每次切换到日志页面，都会调用getlogs方法
  //在首页点击加减按钮后，切换到日志页面，新增的日志记录就会自动更新，提高用户体验
  onShow:function(){
    this.getlogs()
  }
})
