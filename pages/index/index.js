import request from '../../utils/request'
Page({
  data: {
    swiper_img: [],
    navigation: [],
    floor:[]
  },

  // 生命周期函数
  onLoad() {
    // 轮播图获取
    request({
      url: "/api/public/v1/home/swiperdata",
    }).then(res => {
      this.setData({
        swiper_img: res.data.message
      })
    }),

    // 导航获取
    request({
      url: '/api/public/v1/home/catitems'
    }).then(res => {
      this.setData({
        navigation: res.data.message
      })
    })

    // 分栏
    request({
      url: '/api/public/v1/home/floordata'
    }).then(res => {
      const {message} = res.data;
      this.setData({
        floor:message
      })
    })

  },
  onShow(){
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
    })
  }
  },

  // 回到顶部
  backTop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }
})