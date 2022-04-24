// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    openid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const ui = wx.getStorageSync('userinfo')
    this.setData({
      userinfo: ui,
      openid: ui.openid
    })
  },
  
  /**
  * 生命周期函数--监听页面加载
  */
 onGotUserInfo: function (e) {
   const that = this
   wx.cloud.callFunction({
     name:"login",
     success:res=>{
       console.log("调用云函数成功")
       that.setData({
         openid:res.result.openid,
         userinfo: e.detail.userInfo
       })

       // 将openid字段加入到userInfo变量中， 这句话不懂
       that.data.userinfo.openid = that.data.openid
       // 打印
       console.log("openid", that.data.openid)
       console.log("userinfo", that.data.userinfo)
       wx.setStorageSync('userinfo', that.data.userinfo)
     },
     fail:res=>{
      console.log("调用云函数失败")
     }
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})