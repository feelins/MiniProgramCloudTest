// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: 'cloud-test0905-7go5i25a8682e97c',
      traceUser: true
    })
  }
})
