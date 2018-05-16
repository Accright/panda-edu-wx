var Bmob = require('../../utils/Bmob-1.3.1.min.js');
var common = require('../../utils/common.js');
var app = getApp();
let current = Bmob.User.current();
Page({
    data: {
        userInfo: {},
    },
    onLoad: function () {
        var that = this;
    },
    addFeedback: function (event) {
        var that = this;
        var contact = event.detail.value.contact;
        var content = event.detail.value.content;
      
        if (!current){
          //如果用户为空 重新登录
          Bmob.User.auth().then(res => {
            console.log("重新登录成功", res);
          });
        }
        if (!contact) {
            common.showTip("标题不能为空", "loading");
            return false;
        }
        else if (!content) {
            common.showTip("内容不能为空", "loading");
            return false;
        }
        else {
          that.setData({
              loading: true
          });
          //增加反馈
          var feedback = Bmob.Query("feedback");
          feedback.set("contact", contact)
          feedback.set("content", content)
          feedback.set("userid", current.objectId);
          feedback.save().then(res => {
            console.log(res)
            common.showTip("提示","反馈成功!");
            //退回上一页
            wx.navigateBack({
              delta: 1
            });
          }).catch(err => {
            console.log(err)
          });
      }

    },

})