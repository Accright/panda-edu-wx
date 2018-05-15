//index.js
//获取应用实例
const app = getApp()
//定义 首页 tab1
var tab1 = [
  { "name": "字母认知", "ico": "alphabet.png", "url": "../details/details?type=letters", "color":"#77B3D4" },
  { "name": "数字认知", "ico": "numbers.png", "url": "../details/details?type=numbers", "color":"#FF7256" },
  { "name": "动物认知", "ico": "logo.png", "url": "../details/details?type=logo" , "color": "#8AC064"  },
  { "name": "水果认知", "ico": "fruit.png", "url": "../details/details?type=fruit","color": "#A8F0C7" }
];
//定义 首页 tab2
var tab2 = [
  { "name": "车辆认知", "ico": "cars.png", "url": "../details/details?type=cars", "color": "#32BEA6" },
  { "name": "人物认知", "ico": "people.png", "url": "../details/details?type=people", "color": "#FFC0CB" },
  { "name": "颜色认知", "ico": "colors.png", "url": "../details/details?type=colors", "color": "#E0E0D1" },
  { "name": "乐器认知", "ico": "instrument.png", "url": "../details/details?type=instrument", "color": "#F9A72F" }
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
