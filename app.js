//app.js
//初始化BmobJS
const Bmob = require('utils/Bmob-1.3.1.min.js');
Bmob.initialize("3003011b46b284e0b8f364f3ba6a1bf4", "371d12b41128ba104c11741e497606e2");
/*****************************/
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //才用新方式登录
    Bmob.User.auth().then(res => {
      let current = Bmob.User.current();
      console.log(current);
      //console.log(res)
      //console.log('一键登陆成功');
    }).catch(err => {
      console.log(err)
    });
  },
  globalData: {
    userInfo: null
  }
})