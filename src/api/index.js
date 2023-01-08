//当前这个模块：API进行统一管理

//引入二次封装的axios，发请求需要使用
import requests from './request'

//
import mockRequest from './mockAjax'
import request from './request'

//三级联动接口
///api/product/getBaseCategoryList   get  无参数

export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'GET' })
    //发请求:axios发请求返回结果Promise对象  
    //参数与axios参数相同


//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequest.get('/banner')

//获取floor数据
export const reqFloorList = () => mockRequest.get('/floor')

//获取Search数据 地址/api/list 请求方式post 参数：需要带参数
export const reqSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

//获取产品详情信息的接口
export const reqGoodInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表接口地址
export const reqCartList = () => request({ url: `/cart/cartList`, method: 'get' }, )

//删除购物产品的接口
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改商品选中状态
export const reqUpdataCheckedById = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码
export const reqGetCode = (phone)=>request({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册
export const reqUserRegister = (data)=>request({url:`/user/passport/register`,data,method:'post'})

//登录
export const reqUserLogin = (data)=>request({url:`/user/passport/login`,data,method:'post'})

//获取用户信息  [需要带着用户的token向服务器要用户信息]
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLogout = ()=>request({url:'/user/passport/logout',method:'get'})

//获取用户地址信息的接口
export const reqAddressInfo = ()=>mockRequest.get('/address')
//export const reqAddressInfo = () => request({url:'user/userAddress/auth/findUserAddressList',method:'get'})

//获取商品清单、接口201，mock数据
export const reqOrderInfo = ()=>request({url:'/order/auth/trade',method:'get'})
//export const reqOrderInfo = ()=>mockRequest.get("/detailarrayList")

//提交订单接口 /order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data)=>request({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取支付信息
export const reqPayInfo= (orderId)=>request({url:`/payment/weixin/createNative/${orderId}`})

//获取支付订单
export const reqPayStatus = (orderId)=>request({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取个人中心数据（我的订单）
export const reqMyOrderList = (page,limit)=>request({url:`/order/auth/${page}/${limit}`,method:'get'})