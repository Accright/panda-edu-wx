// pages/story/story.js
var Bmob = require('../../utils/Bmob-1.3.1.min.js');
var common = require('../../utils/common.js');//定义公共处理函数
//获取应用实例
const app = getApp();
//定义当前缓存的对象
let currentUser = Bmob.User.current();
var that;
var skip = 0;//定义全局变量作为分页
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    skip = 0;//初始化分页
    that = this;
    //获取故事列表
    wx.showLoading({
      title: '获取故事列表中',
    })
    var query = Bmob.Query('story');
    query.order("order");
    query.limit(10);
    query.find().then(res => {
      wx.hideLoading();
      //console.log(res);
      //如果长度大于0 说明获取成功
      if (res.length > 0) {
        //skip += 10;
        that.setData({
          storyList: res
        });
      }
    }).catch(err => {
      wx.hideLoading();
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
    query.order("order");
    query.find().then(res => {
      wx.stopPullDownRefresh();
      //console.log(res);
      //如果长度大于0 说明获取成功
      if (res.length > 0) {
        skip = 0;
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
    console.log(skip);
    skip += 10;
    var query = Bmob.Query('story');
    query.skip(skip);
    query.order("order");
    query.find().then(res => {
      //console.log(res);
      //如果长度大于0 说明获取成功
      if (res.length > 0) {
        //skip += 10;
        res = res.concat(that.data.storyList);
        //console.log(res);
        //需要对数组根据order进行排序 
        res.sort(function (x, y) {
          if (x.order < y.order) {
            return -1;
          }
          if (x.order > y.order) {
            return 1;
          }
          return 0;
        });
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
  onShareAppMessage: function (res) {
    return {
      title: '竹熊早教，让您的孩子全面快乐成长',
      path: '/pages/index/index',
      imageUrl: '/images/shared.png'
    }
  },
  //播放声音
  play: function(e){

  }
})