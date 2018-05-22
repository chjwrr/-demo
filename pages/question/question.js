// pages/question/question.js
const app = getApp();

var questionList = require('../../data/questionTestData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.globalData.userInfo,
    questionList: questionList.questionList,
    currentCount: 1, // 当前页数
    allCount: 10, // 总页数
    answerResult: [], // 答案数组
    isEnd: false, // 时候答题完毕
    animation:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成  
    this.questionItem = this.selectComponent("#questionItem");
    this.questionItem.showProgress();

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
  
  },

  // 答题答案点击
  answerClick: function(e) {
    console.log('e',e)
    if(this.data.isEnd){
      return
    } 
   
   

    var result = new Array(...this.data.answerResult);
    result.push(e.detail.isRight);

    this.setData({
      answerResult: result
    })
    var count = this.data.currentCount;
    count++
    console.log('答案：', result)
    if (count > this.data.allCount){
      console.log('答题完毕,跳转至其他页面');
      //this.questionItem.endProgress()
      this.setData({
        isEnd: true
      })
      return
    }

    this.setData({
      currentCount: count
    })
  }
  
})