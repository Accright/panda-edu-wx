// pages/story/teller/teller.js
var Bmob = require('../../../utils/Bmob-1.3.1.min.js');
var common = require('../../../utils/common.js');//定义公共处理函数
//获取应用实例
const app = getApp();
//定义当前缓存的对象
let currentUser = Bmob.User.current();
var that;
//创建播放器对象
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    isPlaying: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //远程加载数据
    that = this;
    var objectId = options.objectId;
    var query = Bmob.Query('story');
    query.get(objectId).then(res => {
      //console.log(res);
      that.setData({
        item: res
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
    //开始播放
    innerAudioContext.autoplay = true
    innerAudioContext.src = that.data.item.voiceUrl;
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      wx.hideLoading();
    });
    innerAudioContext.onWaiting(()=>{
      // wx.showLoading({
      //   title: '加载中',
      // })
    })
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
  playToggle: function(e){
    //暂停和播放
    if (innerAudioContext.paused){
      innerAudioContext.play();
      that.setData({
        isPlaying: true
      });
    }else{
      innerAudioContext.pause();
      that.setData({
        isPlaying: false
      });
    }
  }
})