var Bmob = require('../../../utils/Bmob-1.3.1.min.js');
//获取应用实例
var app = getApp();
//定义当前缓存的对象
let currentUser = Bmob.User.current();
var that;
//创建播放器对象
var innerAudioContext = wx.createInnerAudioContext();
var backgroundAudioManager = wx.getBackgroundAudioManager();//获取全局唯一后台音乐播放器
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
    wx.showLoading({
      title: '正在加载',
    })
    var objectId = options.objectId;
    var query = Bmob.Query('story');
    query.get(objectId).then(res => {
      wx.hideLoading();
      console.log(res);
      //设置标题
      wx.setNavigationBarTitle({
        title: res.title
      })
      //是否开启后台播放 --开启
      if (wx.getStorageSync("bg_check")){
        wx.playBackgroundAudio({
          dataUrl: res.voiceUrl,
          title: res.title,
          coverImgUrl: res.imgUrl,
          success: function(res){
            console.log(res);
          },
          fail: function(err){
            wx.showToast({
              title: "播放错误",
              icon: 'none',
              duration: 2000
            });
          }
        })
      }else{
        //版本兼容 --高版本
        if (wx.canIUse("createInnerAudioContext")) {
          innerAudioContext.src = res.voiceUrl;
        } else {
          //版本兼容 --低版本
          wx.playVoice({
            filePath: res.voiceUrl,
            fail: function (res) {
              wx.showToast({
                title: "播放错误" + res.errCode + "\n" + res.errMsg,
                icon: 'none',
                duration: 2000
              });
            }
          })
        }
      }
      that.setData({
        item: res
      });
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //版本兼容 -- 低版本
    if (!wx.canIUse("createInnerAudioContext")) {
      wx.showToast({
        title: '微信版本太低了，不支持故事播放',
        icon: "none"
      })
      return false;
    }else{
      //开始播放  ---版本兼容 高版本
      if (!innerAudioContext.paused) {
        innerAudioContext.stop();
      }
      innerAudioContext.autoplay = true
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
        wx.hideLoading();
        that.setData({
          isPlaying: true
        });
      });
      innerAudioContext.onWaiting(() => {
        console.log('加载中')
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        that.setData({
          isPlaying: false
        });
      });
      innerAudioContext.onCanplay(() =>{
        console.log('继续播放')
        wx.hideLoading();
        that.setData({
          isPlaying: true
        });
      });
      innerAudioContext.onEnded(() =>{
        console.log('已结束');
        that.setData({
          isPlaying: false
        });
      });
    }
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
    return {
      title: '我正在用竹熊早教给宝宝听故事，一起加入吧',
      path: '/pages/index/index'
    } 
  },
  playToggle: function(e){
    //是否开启后台播放 --开启
    if (wx.getStorageSync("bg_check")) {
      // //播放器正常
      // if (backgroundAudioManager){
      if (backgroundAudioManager.paused) {
        backgroundAudioManager.play();
        that.setData({
          isPlaying: true
        });
      } else {
        backgroundAudioManager.pause();
        that.setData({
          isPlaying: false
        });
      }
      // }
      // else{//后台播放器关闭
      //     backgroundAudioManager.src = that.data.item.voiceUrl;
      //     backgroundAudioManager.title = that.data.item.title;
      //     backgroundAudioManager.coverImgUrl = that.data.item.imgUrl;
      //     backgroundAudioManager.play();
      //     that.setData({
      //       isPlaying: true
      //     });
      // }  
    }else{
      //版本兼容 --高版本
      if (wx.canIUse("createInnerAudioContext")) {
        //暂停和播放
        if (innerAudioContext.paused) {
          innerAudioContext.play();
          that.setData({
            isPlaying: true
          });
        } else {
          innerAudioContext.pause();
          that.setData({
            isPlaying: false
          });
        }
      } else {
        //版本兼容 --低版本
        wx.getBackgroundAudioPlayerState({
          success: function (res) {
            var status = res.status;//播放状态
            var dataUrl = res.dataUrl;//播放链接
            if (status == 1) {
              wx.pauseVoice();
            } else {
              wx.playVoice({
                filePath: that.data.item.voiceUrl
              });
            }
          }
        })
      }
    }
  }
})