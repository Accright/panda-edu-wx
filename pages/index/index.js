//index.js
var Bmob = require('../../utils/Bmob-1.3.1.min.js');
var common = require('../../utils/common.js');//定义公共处理函数
//获取应用实例
const app = getApp();
//定义当前缓存的对象
var user;
//定义 首页 tab1
var tab1 = [
  { "name": "认识字母", "ico": "letters.png", "icolock": "letterslock.png","url": "../details/details?type=letters", "color":"#77B3D4" },
  { "name": "认识数字", "ico": "numbers.png",  "icolock": "numberslock.png", "url": "../details/details?type=numbers", "color":"#FF7256" },
  { "name": "认识动物", "ico": "logo.png",     "icolock": "logolock.png",  "url": "../details/details?type=animal", "color": "#8AC064" },
  { "name": "听故事", "ico": "storybook.png",  "icolock": "storybooklock.png", "url": "../story/story", "color": "#F06060" }
];
//定义 首页 tab2
var tab2 = [
  { "name": "认识水果", "ico": "fruit.png",    "icolock": "fruitlock.png","url": "../details/details?type=fruit", "color": "#A8F0C7" },
  { "name": "认识人物", "ico": "people.png",   "icolock": "peoplelock.png", "url": "../details/details?type=people", "color": "#FFC0CB" },
  { "name": "认识颜色", "ico": "colors.png", "icolock": "colorslock.png", "url": "../details/details?type=colors", "color": "#aaa4a5" },
  { "name": "学画画", "ico": "paint.png",      "icolock": "paintlock.png", "url": "../paint/paint", "color": "#76C2AF" }
];
//定义 首页 tab3
var tab3 = [
  { "name": "认识乐器", "ico": "instrument.png", "icolock": "instrumentlock.png", "url": "../details/details?type=instrument", "color": "#F9A72F" },
  { "name": "学钢琴", "ico": "piano-tab.png", "icolock": "piano-tablock.png", "url": "../piano/piano", "color": "#ffc0cb" },
  { "name": "认识车辆", "ico": "cars.png", "icolock": "carslock.png", "url": "../details/details?type=cars", "color": "#32BEA6" }
];
Page({
  data: {
    background: ['1', '2'],
    tab1: tab1,
    tab2: tab2,
    tab3: tab3,
    userInfo: {},
    isLock:false
  },
  onLoad: function (options) {

  },
  onShow: function(e){
    //每次进入都刷新缓存
    var that = this;
    user = Bmob.User.current();
    this.setData({
      userInfo: user  
    });
  },
  changeTab: function(e){
    //如果滑动到0-1页 为tab重新赋值
    // if (e.detail.current == 1){
    //   this.setData({ grids: tab2});//为tab重新赋值
    // } else if (e.detail.current == 0){
    //   this.setData({ grids: tab1 });//为tab重新赋值
    // }
  },
  //如果未解锁提示
  showTip: function(e){
    //common.showModal("请先进入“个人中心”页面解锁", "提示");
    wx.showToast({
      title: '请先进入“个人中心”页面帮宝宝解锁',
      icon: "none"
    })
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
