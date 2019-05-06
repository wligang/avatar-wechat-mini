//获取应用实例
const app = getApp()
Page({
  data: {
    per: 'top-hoverd-btn',
    hot: '',
    avatarUrl: '',
    csdnUserInfo: null,
    topNavs: [],
    csdnArticles: [],
    hotArticles: [],
    targetArticleUrl: '',
    hidden: 'per',
    perNav: true
  },

  onLaunch: function() {
    console.log('bb Launching ...');
    this.data.csndAvatarUrl = app.globalData.csdnUserInfo.avatarUrl;

  },
  onLoad: function() {
    if (app.globalData.csdnUserInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        csdnUserInfo: app.globalData.csdnUserInfo,
        hotArticles: app.globalData.hotArticles,
        hasUserInfo: true
      })
    }
    if (app.globalData.csdnUserInfo.articles.length > 0) {
      this.setData({
        csdnArticles: app.globalData.csdnUserInfo.articles,
        perNav: false,
      })
    } else {
      this.setData({
        perNav: true,
        hot: this.getHoverd('hot', 'hot')
      })
      this.toHot();
    }

  },
  onShow: function() {
    var that = this;
    setTimeout(function() {
      if (app.globalData.csdnUserInfo.articles.length > 0) {
        that.setData({
          csdnArticles: app.globalData.csdnUserInfo.articles
        })

      } else {
        that.setData({
          perNav: true,
        })
      }

    }, 500);
  },

  bindViewTap: function(e) {
    const articlUrl = e.currentTarget.dataset.articlUrl;
    this.setData({
      targetArticleUrl: articlUrl
    })

    wx.showToast({
      title: '点赞成功',
      icon: 'success',
      duration: 1500
    })
    return;
    wx.navigateTo({
      url: '../articls/index'
    })
  },
  toPersonal: function() {
    console.log('per');
    this.setData({
      hidden: "per"
    })
    this.updateBtnStatus('per');
  },
  toHot: function() {
    console.log('hot');
    this.setData({
      hidden: "hot"
    })
    this.updateBtnStatus('hot');
  },
  updateBtnStatus: function(k) {
    this.setData({
      per: this.getHoverd('per', k),
      hot: this.getHoverd('hot', k)
    });
  },
  getHoverd: function(src, dest) {

    return (src === dest ? 'top-hoverd-btn' : '');
  }
});