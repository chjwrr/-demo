// pages/welcome/welcome.js
//获取应用实例
const app = getApp();
var storageManager = require('../../utils/storage.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    honoraryTitle: storageManager.getHonnraryTitle()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('globalData', app.globalData)
    if (app.globalData){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
    app.userInfoReadyCallback = res =>{
      console.log('userInfoReadyCallback: ', res.rawData);
      console.log('获取用户信息成功');
      this.setData({
        userInfo: JSON.parse(res.rawData)
      })
    };
   
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
    setTimeout(()=>{
      wx.navigateTo({
        url: '../home/home',
      })
    }, 3000)
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