//index.js
//获取应用实例
const app = getApp()
//定义 首页 tab1
var tab1 = [
  { "name": "字母认知", "ico": "alphabet.png", "url": "../sendSms/sendSms", "color":"#FFF68F" },
  { "name": "数字认知", "ico": "numbers.png", "url": "../picasa/picasa", "color":"#EED2EE" },
  { "name": "动物认知", "ico": "logo.png", "url": "../sendSms/sendSms", "click": "autuLogin", "color": "#E0FFFF"  },
  { "name": "水果认知", "ico": "fruit.png", "url": "../getOpenId/getOpenId","color": "#FFD700" }
];
//定义 首页 tab2
var tab2 = [
  { "name": "车辆认知", "ico": "cars.png", "url": "../sendSms/sendSms", "color": "#FFD700" },
  { "name": "关系认知", "ico": "people.png", "url": "../picasa/picasa", "color": "#FFD700" },
  { "name": "颜色认知", "ico": "colors.png", "url": "../sendSms/sendSms", "click": "autuLogin", "color": "#FFD700" },
  { "name": "乐器认知", "ico": "instrument.png", "url": "../getOpenId/getOpenId", "color": "#FFD700" }
];
Page({
  data: {
    background: ['1', '2'],
    tab1: tab1,
    tab2: tab2
  },
  changeTab: function(e){
    //如果滑动到0-1页 为tab重新赋值
    // if (e.detail.current == 1){
    //   this.setData({ grids: tab2});//为tab重新赋值
    // } else if (e.detail.current == 0){
    //   this.setData({ grids: tab1 });//为tab重新赋值
    // }
  }
})
