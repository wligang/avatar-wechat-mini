//获取应用实例
const app = getApp()
Page({
  data: {
    targetArticleUrl: 'http://www.wlgdo.com',
    hidden: false
  },
  onLoad: function() {
    const pages = getCurrentPages();
    const src = pages[pages.length - 2].data.targetArticleUrl;
    console.log(src);
    this.setData({
      targetArticleUrl: src
    });
  }
})