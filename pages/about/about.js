var Bmob = require('../../utils/Bmob-1.3.1.min.js');
const WxParse = require('../../utils/wxParse/wxParse.js');

Page({
  data: {
    rows: {}
  },
  onLoad: function (e) {
    var type = e.type;
    if(type == 'guide'){
      wx.setNavigationBarTitle({
        title: '宝宝学习指南'
      });
    }else if(type == 'about'){
      wx.setNavigationBarTitle({
        title: '关于竹熊教育'
      });
    }
    //加载loading
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    //获取富文本并解析
    var query = Bmob.Query('about');
    query.equalTo("type", "==", type);
    query.find().then(res => {
      wx.hideLoading();//隐藏弹窗
      //console.log(res, expid);
      //如果长度大于0 说明获取成功
      if (res.length > 0) {
        WxParse.wxParse('content', 'html', res[0].content, that);
        // that.setData({
        //   rows: res[0],
        // })
      }
    }).catch(err => {
      wx.hideLoading();//隐藏弹窗
      console.log(err);
      //加载数据出错 提示
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      });
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //页面分享
  onShareAppMessage: function (res) {
    return {
      title: '竹熊早教，让您的孩子全面快乐成长',
      path: '/pages/index/index',
      imageUrl: '/images/shared.png'
    }
  }
})