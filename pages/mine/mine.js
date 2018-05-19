// pages/mine/mine.js
var Bmob = require('../../utils/Bmob-1.3.1.min.js');
var app = getApp();
var common = require('../../utils/common.js');//定义公共处理函数
var util = require('../../utils/util.js');//定义公共处理函数
//全局变量
var that;
//定义当前用户
var currentUser;
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
    today: util.getNowDay(new Date()),
    //是否开启声音后台播放 --默认为true
    bg_check: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;//全局this赋值
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //var now = util.getNowTime(new Date());//
    //var next = util.getNextTime(new Date());// 
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
    //更新音乐后台播放设置
    if (wx.getStorageSync("bg_check") != null && wx.getStorageSync("bg_check") != undefined){
      this.setData({
        bg_check: wx.getStorageSync("bg_check")
      });
    }else{
      wx.setStorageSync("bg_check", true);
    }
    //定义当前缓存的对象
    currentUser = Bmob.User.current();
    console.log("curruser", currentUser);
    var now = util.getNowTime(new Date());//
    var next = util.getNextTime(new Date());// 
    //判断用户是否注册 --根据是否有isLock进行判断
    if (currentUser && currentUser.isLock) {
      var userInfo = {};
      userInfo.avatarUrl = currentUser.userPic;
      userInfo.nickName = currentUser.nickName;
      //更新全局变量
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
      wx.showLoading({
        title: '拉取用户信息'
      })
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
          //获取签到记录数
          var signDaysQuery = Bmob.Query('sign_logs');
          signDaysQuery.equalTo("userid", "==", currentUser.objectId);
          signDaysQuery.count().then(res => {
            wx.hideLoading();//取消加载框
            //更新签到天数
            that.setData({
              signdays: res
            });
          }).catch(err => {
            wx.hideLoading();//取消加载框
            console.log(err);
            //加载数据出错 提示
            wx.showToast({
              title: err,
              icon: 'none',
              duration: 2000
            });
          });
        }else{
          wx.hideLoading();
          //未签到
          that.setData({
            signed: false
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
    } else if (currentUser == null) {
      //如果用户为空 重新登录
      Bmob.User.auth().then(res => {
        console.log("重新登录成功", res);
      }).catch(err => {
        wx.showToast({
          title: '登录失败，请检查网络',
        })
      });
    }else{
      //如果用户未解锁
      that.setData({
        hasUserInfo: false
      });
    }
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
  //页面分享
  onShareAppMessage: function (res) {
    return {
      title: '竹熊早教，让您的孩子全面快乐成长',
      path: '/pages/index/index',
      imageUrl: '/images/shared.png'
    }
  },
  //获取用户信息以解锁
  getUserInfo: function (e) {
    //用户拒绝授权
    if (e.detail.errMsg && e.detail.errMsg == "getUserInfo:fail auth deny"){
      wx.showToast({
        title: '解锁失败，请允许授权',
        icon: "none"
      })
      return false;
    }
    //更新全局用户信息
    wx.showLoading({
      title: '解锁中',
    })
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo);
    //更新Bmob用户信息
    Bmob.User.upInfo(e.detail.userInfo).then(result => {
      console.log(result)
      //获取信息之后更新islock字段
      var query = Bmob.Query('_User');
      query.get(currentUser.objectId).then(res => {
        console.log(res)
        res.set('isLock', true);
        res.save().then(res => {
          console.log(res);
          //刷新缓存
          Bmob.User.updateStorage(currentUser.objectId).then(res => {
            wx.hideLoading();
            console.log(res);
            //更新全局数据
            this.setData({
              userInfo: e.detail.userInfo,
              hasUserInfo: true
            })
            wx.showToast({
              title: '解锁成功',
            })
          }).catch(err => {
            wx.hideLoading();
            console.log(err);
            wx.showToast({
              title: '解锁失败，请重新点击解锁',
              icon: "none"
            })
          });
        }).catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: '解锁失败，请重新点击解锁',
            icon: "none"
          })
          console.log(err);
        });
      }).catch(err => {
        wx.hideLoading();
        console.log(err);
        wx.showToast({
          title: '解锁失败，请重新点击解锁',
          icon: "none"
        })
      })
    }).catch(err => {
      wx.hideLoading();
      console.log(err);
      wx.showToast({
        title: '解锁失败'+err,
        icon: 'none'
      })
    });
  },
  //签到
  signUp: function(e){
    wx.showLoading({
      title: '签到中',
    })
    const query = Bmob.Query('sign_logs');
    query.set("userid", currentUser.objectId);
    query.save().then(res => {
      console.log(res);
      that.setData({
        signed: true,
        signedTime: res.createdAt
      });
      //获取签到记录数
      var signDaysQuery = Bmob.Query('sign_logs');
      signDaysQuery.equalTo("userid", "==", currentUser.objectId);
      signDaysQuery.count().then(res => {
        wx.hideLoading();//取消加载框
        //更新签到天数
        that.setData({
          signdays: res
        });
      }).catch(err => {
        wx.hideLoading();//取消加载框
        console.log(err);
        //加载数据出错 提示
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        });
      });
    }).catch(err => {
      wx.hideLoading();
      common.showModal('签到出错', err);
    })
  },
  //监听声音后台播放switch设置
  bgCheckChange: function(e){
    wx.setStorage({
      key: 'bg_check',
      data: e.detail.value,
      success: function(res){
        wx.showToast({
          title: '更改成功'
        })
      },
      fail: function(err){
        wx.showToast({
          title: '更改失败',
          icon:"none"
        })
      }
    })
  }
})