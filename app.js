//app.js
var storageManager = require('./utils/storage.js');

App({
  onLaunch: function () {

    storageManager.setHonnraryTitle('才高八斗')

    const that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('login success:',res);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        
        console.log('getSetting success:', res);
        if (res.authSetting['scope.userInfo'] == true) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          that.getUserInfo();
        } else if (res.authSetting['scope.userInfo'] == false) {
          // 用户拒绝了授权,打开设置界面，让用户开启授权
          wx.openSetting({
            success:(res)=>{
              // 开启成功，重新获取用户信息
              that.getUserInfo();
            }
          })
        } else{
         
          // 用户第一次授权
          wx.authorize({
            scope: 'scope.userInfo',
            success: function () {
              console.log('通过授权')
              that.getUserInfo();
            }
          })
        }
      }
    })
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function(){
    const that = this;

    wx.getUserInfo({
      success: res => {
        console.log('getUserInfo success:', res);

        // 可以将 res 发送给后台解码出 unionId
        that.globalData.userInfo = JSON.parse(res.rawData)

        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})