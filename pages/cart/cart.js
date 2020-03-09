Page({
  data: {
    address: {},
    goods: [],
    allPrice: 0,
    allSelected: true
  },

  // 单个选中状态处理
  handleSelectState(e) {
    const { index } = e.currentTarget.dataset;
    this.data.goods[index].selected = !this.data.goods[index].selected;

    // 判断是否全选
    let allSelected = this.data.goods.some(e => {
      return !e.selected
    })

    // 页面数据刷新
    this.setData({
      allSelected: !allSelected,
      goods: this.data.goods
    })
    this.handleAllPrice()
    wx.setStorageSync('cart', this.data.goods)
  },

  // 点击全选
  handleClickAllSelected(e) {
    this.data.allSelected = !this.data.allSelected
    this.data.goods.forEach(e => {
      e.selected = this.data.allSelected
    })
    this.setData({
      allSelected: this.data.allSelected,
      goods: this.data.goods
    })
    this.handleAllPrice()
    wx.setStorageSync('cart', this.data.goods)
  },

  // 输入数量处理
  handleNumber(e) {
    const { index } = e.currentTarget.dataset;
    let { value } = e.detail.value;
    value = Math.floor(value)
    if (value < 1) {
      value = 1
    }
    this.data.goods[index].number = value
    this.handleAllPrice()
    wx.setStorageSync('cart', this.data.goods)
  },

  // 增加减少( + ,  -)商品
  handleCalc(e) {
    const { index } = e.currentTarget.dataset;
    const { number } = e.currentTarget.dataset;
    this.data.goods[index].number += number
    if (this.data.goods[index].number === 0) {
      wx.showModal({
        title: '提示',
        content: '是否删除商品',
        success: (res) => {
          if (res.confirm) {
            this.data.goods.splice(index, 1)
          } else if (res.cancel) {
            this.data.goods[index].number = 1;
          }
        },
        complete: () => {
          this.setData({
            goods: this.data.goods
          })
          wx.setStorageSync('cart', this.data.goods)
        }
      })
    }
    this.setData({
      goods: this.data.goods
    })
    wx.setStorageSync('cart', this.data.goods)
    this.handleAllPrice()
  },

  // 计算总价格
  handleAllPrice() {
    let allPrice = 0;
    this.data.goods.forEach(e => {
      if (e.selected) {
        allPrice += e.goods_price * e.number
      }
    })
    this.setData({
      allPrice: allPrice
    })
  },

  // 地址信息获取
  handleGetAddress() {
    wx.chooseAddress({
      success: (res) => {
        this.setData({
          address: {
            name: res.userName,
            tel: res.telNumber,
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
        wx.setStorageSync('address', this.data.address)
      }
    })
  },

  // 生命周期
  onLoad() {
    // 地址信息
    const address = wx.getStorageSync('address');
    this.setData({
      address: address || {}
    })

  },
  onShow() {
    // 商品信息
    this.setData({
      goods: wx.getStorageSync('cart') || []
    })
    this.handleAllPrice()
    // 加载全选状态
    // let allSelected = true;
    // this.data.goods.forEach(e => {
    //   if (!e.selected) {
    //     allSelected = false
    //   }
    // })
    let allSelected = this.data.goods.some(e => {
      return !e.selected
    })
    this.setData({
      allSelected: !allSelected
    })

    // tabbar
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
        number:(wx.getStorageSync('cart') ||[]).length 
      })
    }
  }

})