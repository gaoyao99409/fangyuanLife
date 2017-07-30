//index.js
//百度地图
var bmap = require('../../libs/bmap-wx.js');
var BMap = new bmap.BMapWX({
  ak: 'MEZ7gXGjGQ6FZR8RPCmAHwDYOzUPzP3G'
});  
//获取应用实例
var app = getApp()
Page({
  data: {
    latitude: 39.9596,
    longitude: 116.7773,
    markers: [{
      latitude: 39.9596,
      longitude: 116.7773,
      name: 'T.I.T 创意园'
    }],
    list:[{title:'test1',url:'/image/img1.jpg'},{title:'test2',url:'/image/img2.jpg'}]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  refreshAddress: function(){
    var param = {};
    var mapContext = wx.createMapContext('myMap');
    //console.info(mapContext);
    var that = this;
    that.setData({
      address: '定位中...'
    });
    mapContext.getCenterLocation({
      success: function (res) {
        param.location = res.latitude + ',' + res.longitude;
        param.success = function (data) {
          var wxMarkerData = data.wxMarkerData;
          var address = wxMarkerData[0].address;
          that.setData({
            address: address
          });
        };
        BMap.regeocoding({
          location: res.latitude + ',' + res.longitude,
          success: function (data) {
            var wxMarkerData = data.wxMarkerData;
            var address = wxMarkerData[0].address;
            that.setData({
              address: address
            });
          }
        });
      }
    })
  },
  onLoad: function () {
    var that = this;
    that.refreshAddress();
  },
  bindregionchange: function(){
    var that = this;
    that.refreshAddress();
  }
})
