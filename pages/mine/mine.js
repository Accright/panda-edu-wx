// pages/mine/mine.js
var Bmob = require('../../utils/Bmob-1.3.1.min.js');
var app = getApp();
var common = require('../../utils/common.js');//定义公共处理函数
var util = require('../../utils/util.js');//定义公共处理函数
//定义当前缓存的对象
let currentUser = Bmob.User.current();
//全局变量
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户信息
    userInfo:{},
    //是否解锁--获取了用户信息
    hasUserInfo:false,
    //签到天数
    signdays: 10,
    //今天是否签到
    signed: false,
    //今日签到时间
    signedTime: "",
    //今日推荐文章
    todayExp:{},
    //日期
    today: util.getNowDay(new Date())
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
    var now = util.getNowTime(new Date());//
    var next = util.getNextTime(new Date());// 
    //判断用户是否注册 --根据是否有userName进行判断
    if (currentUser && currentUser.isLock) {
      let userInfo = {};
      userInfo.avatarUrl = currentUser.userPic;
      userInfo.nickName = currentUser.nickName;
      //更新全局变量
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
      //查询用户是否签到
      var query = Bmob.Query('sign_logs');
      query.equalTo("userid", "==", currentUser.objectId);
      query.equalTo("createdAt", ">", now);
      query.equalTo("createdAt", "<", next);
      query.find().then(res => {
        //console.log(res);
        //如果长度大于0 说明签到了
        if (res.length > 0) {
          that.setData({
            signedTime: res[0].createdAt,
            signed: true
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
      //获取签到记录数
      var signDaysQuery = Bmob.Query('sign_logs');
      query.equalTo("userid", "==", currentUser.objectId);
      query.count().then(res => {
        //更新签到天数
        that.setData({
          signdays: res
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
    } else if (currentUser == null) {
      //如果用户为空 重新登录
      Bmob.User.auth().then(res => {
        console.log("重新登录成功", res);
      });
    }
    //获取育儿经
    var expQuery = Bmob.Query('experience');
    //获取当天的育儿经 --改为获取所有并以创建时间降序排列 取第一条
    // expQuery.equalTo("createdAt", ">", now);
    // expQuery.equalTo("createdAt", "<", next);
    expQuery.limit(1);
    expQuery.order("-createdAt");
    expQuery.find().then(res => {
      //console.log(res);
      //如果长度大于0 说明获取成功
      if (res.length > 0) {
        that.setData({
          todayExp: res[0]
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
  //关于
  about: function (e) {
    common.showModal('本程序后端使用Bmob简单实现，仅供学习使用，如想加入一起学习，请加QQ群：118541934');
  },
  //获取用户信息以解锁
  getUserInfo: function (e) {
    //更新全局用户信息
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo);
    //更新Bmob用户信息
    Bmob.User.upInfo(e.detail.userInfo);
    var query = Bmob.Query('_User');
    query.get(currentUser.objectId).then(res => {
      console.log(res)
      res.set('isLock', true);
      res.save();
    }).catch(err => {
      console.log(err)
    })
    //刷新缓存
    Bmob.User.updateStorage(currentUser.objectId).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    //更新全局数据
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //签到
  signUp: function(e){
    const query = Bmob.Query('sign_logs');
    query.set("userid", currentUser.objectId);
    query.save().then(res => {
      console.log(res);
      that.setData({
        signed: true,
        signedTime: res.createdAt
      });
    }).catch(err => {
      common.showModal('签到出错', err);
    })
  }
})