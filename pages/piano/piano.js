var innerAudioContext = wx.createInnerAudioContext();
var page;
Page({
  data:{
    doommData: []
  },
  onLoad: function(e){
    page = this;
  },
  onReady: function (e) {

  },
  keyDown: function (e) {
    var src = e.currentTarget.dataset.src;
    console.log(src);
    if (src == innerAudioContext.src){
      innerAudioContext.stop();
      innerAudioContext.play();
    }else{
      innerAudioContext.src = src;
      innerAudioContext.autoplay = true;
    }
    innerAudioContext.onError(() =>{
      wx.showToast({
        title: '播放出错啦',
        icon: 'none'
      })
    });
    doommList.push(new Doomm("宝宝真棒", Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
    this.setData({
      doommData: doommList
    })
  }
})

//
var doommList = [];
var i = 0;
class Doomm {
  constructor(text, top, time, color) {
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    let that = this;
    this.id = i++;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);
      page.setData({
        doommData: doommList
      })
    }, this.time * 1000)
  }
}
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}