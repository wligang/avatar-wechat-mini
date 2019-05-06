//index.js

//获取应用实例
const app = getApp()
Page({
  data: {
    images: [],
    appName: 'Hido',
    hasUserInfo: false,
    inputValue: 'LeegooWang',
    canIUse: wx.canIUse('openBluetoothAdapter'),
    userInfo: {
      'avatarUrl':'http://img.wlgdo.com/avatar/logo.png'
    }
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function() {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    const that=this;
    wx.request({
      url: app.globalData.baseDomain + '/apps/info/csdn',
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        console.log(res.data)
        app.globalData['appInfo'] = res.data.data.appInfo
        app.globalData['hotArticles'] = res.data.data.hotArticles

        that.setData({
          appName: res.data.data.appInfo.appName,
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },

  getCsdnUserInfo: function(e) {
    const csndUserName = this.data.inputValue;
    wx.request({
      url: app.globalData.baseDomain + '/index/get/' + csndUserName,
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        console.log(res.data)
        app.globalData['csdnUserInfo'] = res.data.data
        wx.navigateTo({
          url: '../avatar/csdn/index'
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },

  loadAppInfo: function(e) {
    wx.request({
      url: app.globalData.baseDomain + '/apps/info/csdn',
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        console.log(res.data)
        app.globalData['appInfo'] = res.data.data.appInfo
        app.globalData['hotArticles'] = res.data.data.hotArticles
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },

  loadCsdnPage: function(e) {
    console.log('进度条完成了');
   
    console.log(app.globalData);
   
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  }
})