//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from "./routers";
//使用叉件
Vue.use(VueRouter)

//引入store
import store from "@/store";

//先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push|replace方法
//第一个参数：告诉原来push方法，你往哪里跳（传递哪些参数）
//第二个参数：成功的回调
//第三个参数：失败的回调
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        //call 和 applay 都可以改变函数指向
        //不同点：call与apply传递参数：call传递参数用逗号隔开,apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})

    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})

    }
}

//配置路由
let router =  new VueRouter({
    routes,
    //路由滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

//离await最近的函数写async？
router.beforeEach(async(to,from,next)=>{
    //to:可以获取到你要跳转到那个路由的信息
    //from:可以获取到你从哪个路由而来的信息
    //next:放行函数 next（）放行
    //next();
    
    //用户登录了，才会有token，未登录一定不会有token、
    let token = store.state.user.token
    //用户信息
    let name  = store.state.user.userInfo.name
    //用户已经登陆了
    if(token){
        //用户已经登陆了就不能去login,停留在首页
        if(to.path == '/login'){
             next('/home')
        }else{
            //登录，去的不是login【home|search|detail|shopcar】
            if(name){
              next()
            }else{
                //没有用户信息，派发action让仓库存储用户信息再跳转
               try {
                 await store.dispatch('getUserInfo')
                 next()
               } catch (error) {
                //token失效，获取不到用户信息
                //清除token
               await store.dispatch('userLogout')
               next('/login')
               }
            }
        }
    }else{
        //未登录 不能去pay paysuccess center
        let toPath = to.path
        if(toPath.indexOf('/trade') !=-1 || toPath.indexOf('/pay') != -1 ||  toPath.indexOf('/center') != -1  ){
         //把未登录时想去的地方，存储在地址栏中
            next('/login?redirect='+ toPath)
        }else{
            next()
        }
        
    }
})

//全局守卫，前置守卫（在路由跳转之前进行判断）


export default router;
