//引入请求
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'

//home模块的小仓库
const state = {
    //state中数据默认初始值要根据服务器返回值确定
    categoryList: [],
    bannerList: [],
    floorList: []
}
const actions = {
    async categoryList(context, val) {
        //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
        let result = await reqCategoryList()
        if (result.code == 200) {
            context.commit('CATEGORYLIST', result.data)
        }


    },
    //获取首页轮播图的数据
    async getBannerList(context, val) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            context.commit('GETBANNERLIST', result.data)
        }
    },
    async getFloorList(context, val) {
        let result = await reqFloorList()
        if (result.code == 200) {
            context.commit('GETFLOORLIST', result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, val) {
        state.categoryList = val
    },
    GETBANNERLIST(state, val) {
        state.bannerList = val
    },
    GETFLOORLIST(state, val) {
        state.floorList = val
    }
}
const getters = {}

export default { state, actions, mutations, getters }