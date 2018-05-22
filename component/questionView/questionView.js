// component/questionView/questionView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    answerInfo: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { } // 属性被改变时执行的函数（可选）
    },
    answerCount: {
      type: Number,
      value: '1',
      observer: function (newVal, oldVal) { } // 属性被改变时执行的函数（可选）
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    chooseAnswer: '',
    ableClick: true,
    animation: null,
    progressValue: 100,
    isAnimal: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    answerClick: function (e) {
      if (!this.data.ableClick) {
        return;
      }
      console.log('答案点击了：', e.currentTarget.dataset.answer)
      console.log('答案：', this.data.answerInfo.answer)

      var isRight = false;
      if (e.currentTarget.dataset.answer != this.data.answerInfo.answer) {
        // 答案错误
        wx.vibrateShort({
        })
      } else {
        // 答案正确
        isRight = true;
      }
      this.setData({
        chooseAnswer: e.currentTarget.dataset.answer,
        ableClick: false
      })

      //结束进度条动画
      this.jumpNextQuestion(isRight);

    },
    // 跳转到下一题
    jumpNextQuestion:function(e) {
      this.endProgress()

      if (this.data.answerCount == 10){
        console.log('最后一题')
        var myEventDetail = { isRight: e };
        var myEventOption = {};
        this.triggerEvent('answerClick', myEventDetail, myEventOption);
        return
      }
      // 开启进度条动画
      this.showProgress()
      
      setTimeout(() => {
        var myEventDetail = { isRight: e };
        var myEventOption = {};
        this.triggerEvent('answerClick', myEventDetail, myEventOption);

        this.setData({
          ableClick: true,
          chooseAnswer: '',
        }, () => {
        })

      }, 300)
    },
    // 动画
    showAnimation: function () {
      console.log('开始动画')
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })

      animation.opacity(0).step()
      animation.opacity(1).step()

      this.setData({
        animation: animation.export()
      })
    },
    // 进度条动画效果
    showProgress: function () {
    
      this.showAnimation()
      var value = this.data.progressValue

      this.interval = setInterval(() => {
        value -= 10;
        this.setData({
          progressValue: value
        })

        if (value <= 0) {
          // 倒计时结束，这道题错误，下一道题
          this.jumpNextQuestion(false)
          return;
        }
      }, 1000)
    },
    // 结束进度条动画效果
    endProgress: function () {
      clearInterval(this.interval)
      this.setData({
        progressValue: 100,
      })
    }
  }
})
