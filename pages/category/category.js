import request from '../../utils/request'
Page({
  data: {
    category: [],
    current:0
  },

  // 选项卡切换
  toggleCard(e){
    console.log(e);
    this.setData({
      current:e.currentTarget.dataset.index
    })
    
  },
  onLoad() {
    request({
      url: '/api/public/v1/categories'
    }).then(res => {
      console.log(res);
      const {message} = res.data;
      this.setData({
        category:message
      })
    })
  }
})