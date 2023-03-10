import Vue from 'vue'
import App from './App.vue'

//三级联动组件 --全局组件注册
import TypeNav from '@/components/TypeNav'
//轮播图
import Carousel from '@/components/Carousel'
//分页器
import Pagination from '@/components/Pagination'
import {Button,MessageBox} from 'element-ui'

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//注册全局组件
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入MockServe.js -----mock数据
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"

//统一接口api文件夹里面全部请求函数
import * as API from '@/api'

//引入路由
import router from '@/router'

//引入仓库
import store from './store/index'

Vue.config.productionTip = false

import bgc from "@/assets/bgc.gif";
//注册插件
Vue.use(VueLazyload,{
    //懒加载默认图片
    loading: bgc,
})

//引入校验插件
import "@/plugins/validate";
new Vue({
    render: h => h(App),
    //全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    //注册路由,组件身上会多两个属性 $router $route属性
    router,
    //注册仓库：组件实例身上会多一个属性$store
    store,

}).$mount('#app')