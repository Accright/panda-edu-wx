//定义Bmob查询和app全局变量
var Bmob = require('../../utils/Bmob-1.3.1.min.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;//定义全局变量
// pages/detais/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;//全局变量赋值
    //根据type确定标题
    var title = "学习认知"
    // wx.setNavigationBarTitle({
    //   title: '当前页面'
    // })
    //加载框
    wx.showLoading({
      title: '资料加载中',
    })
    var query = Bmob.Query("knowledge_point_cols");
    query.order("order");
    query.equalTo("type", "==", options.type);//设置type为传递的值
    query.find().then(res => {
      console.log(res);
      //取消loading
      wx.hideLoading();
      that.setData({
        dataList:res
      });
    }).catch(err => {
      console.log(err);
      //加载数据出错 提示
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      });
    });
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
  
  },
  playVoice: function(event){
    //版本兼容处理
    if (wx.canIUse("createAudioContext")){
      const innerAudioContext = wx.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      console.log(event.currentTarget.dataset.voiceEn);
      innerAudioContext.src = event.currentTarget.dataset.voiceEn;
      innerAudioContext.play();
      innerAudioContext.onError((res) => {
        wx.showToast({
          title: "播放错误" + res.errCode + "\n" + res.errMsg,
          icon: 'none',
          duration: 2000
        });
      });
    }else{
      wx.playVoice({
        filePath: event.currentTarget.dataset.voiceEn,
        fail: function(res){
          wx.showToast({
            title: "播放错误" + res.errCode + "\n" + res.errMsg,
            icon: 'none',
            duration: 2000
          });
        }
      })
    }
  }
})