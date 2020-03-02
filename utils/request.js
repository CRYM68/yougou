/**
 *基于wx.request, 封装一个类axios的工具库
 */

//  - 主函数
const request = (config={})=>{  
  if(!/^http/.test(config.url))
  config.url = request.defaults.baseURL+config.url;
  return new Promise((resolve,reject)=>{
    // _发起请求
    wx.request({
     ...config,
     success(res){
       resolve(res)
     },
     fail(res){
       reject(res)
     },
     complete(res){
       request.errors
     }
    })
  })
}

/**
 * request默认属性
 */
request.defaults={
  baseURL:''
}

// - 配置
request.defaults.baseURL='https://api-hmugo-web.itheima.net'

// - 
request.errors=function () {
  
}

// - 错误拦截
request.onError=function (fn) {
  if((typeof fn)==='function'){
    request.errors = fn
  }
}
// 对外暴露
export default request