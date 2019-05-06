//index.js

//获取应用实例
const app = getApp()
import {
  $init,
  $digest
} from '../../utils/common.util'
Page({
  data: {
    images: [],
    canIUse: wx.canIUse('openBluetoothAdapter')
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function() {
    $init(this)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images

    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },
  downloadFile: function() {
    console.log('start download file');
    wx.downloadFile({
      url: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJDexI5YuKNn9yoLWPPwZoDRuuCaSc9iaKuGialGBm0C6S2ib7OjiaLd51GBmjJclU64DMJ3IWYxxFbUw/132',
      header: {},
      success: function(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.showToast({
            title: '保存成功',
          });
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              console.log("保存图片：success");
              wx.showToast({
                title: '保存成功',
              });
            },
            fail(res) {
              console.log("保存图片：fail");
              console.log(res);
            }
          })
        }
      },
      fail: function(res) {
        console.log('start download file fail');
      },
      complete: function(res) {
        console.log('start download file success');
      },
    })
  }
})