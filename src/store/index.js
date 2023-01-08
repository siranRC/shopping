//引入Vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//引入小仓库
import home from './home'
import search from './search'
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

export default new Vuex.Store({
    //实现Vuex模块化开发存储数据
    modules: { home, search, detail, shopcart ,user,trade}

})