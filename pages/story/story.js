// pages/story/story.js
var Bmob = require('../../utils/Bmob-1.3.1.min.js');
var common = require('../../utils/common.js');//定义公共处理函数
//获取应用实例
const app = getApp();
//定义当前缓存的对象
let currentUser = Bmob.User.current();
var that;
var skip = 10;//定义全局变量作为分页
Page({
  /**
   * 页面的初始数据
   */
  data: {
    storyList:[]//故事列表
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
    that = this;
    //获取故事列表
    var query = Bmob.Query('story');
    query.limit(10);
    query.find().then(res => {
      //console.log(res);
      //如果长度大于0 说明获取成功
      if (res.length > 0) {
        skip += 10;
        that.setData({
          storyList: res
        });
      }
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
    //下拉刷新 刷新数据
    var query = Bmob.Query('story');
    query.limit(10);
    query.find().then(res => {
      wx.stopPullDownRefresh();
      //console.log(res);
      //如果长度大于0 说明获取成功
      if (res.length > 0) {
        skip += 10;
        that.setData({
          storyList: res
        });
      }
    }).catch(err => {
      wx.stopPullDownRefresh();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉加载数据
    var query = Bmob.Query('story');
    query.skip(skip);
    query.find().then(res => {
      //console.log(res);
      //如果长度大于0 说明获取成功
      if (res.length > 0) {
        skip += 10;
        res = res.contact(that.data.storyList);
        that.setData({
          storyList: res
        });
      }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //播放声音
  play: function(e){

  }
})