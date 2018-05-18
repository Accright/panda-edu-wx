//app.js
//初始化BmobJS
const Bmob = require('utils/Bmob-1.3.1.min.js');
Bmob.initialize("3003011b46b284e0b8f364f3ba6a1bf4", "371d12b41128ba104c11741e497606e2");
/*****************************/
App({
  /**
   * 页面的初始数据
   */
  data: {
    //bg_check: true
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //版本兼容
    // if (!wx.canIUse('getUserInfo')){
    //   wx.showModal({
    //     title: '提示',
    //     content: '微信版本过低，请更新微信!',
    //     success: function(res){

    //     }
    //   });
    //   return false;
    // }
    //采用新方式登录
    Bmob.User.auth().then(res => {
      let current = Bmob.User.current();
      console.log(current);
      //console.log(res)
      //console.log('一键登陆成功');
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '登录失败，请点击个人中心重新登录',
      })
    });
  },
  globalData: {
    userInfo: null
  }
})