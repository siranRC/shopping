import { reqSearchInfo } from '@/api'
//search模块的小仓库
const state = {
    searchList: {}
}
const actions = {
    //获取Search模块数据
    async getSerchList(context, params = {}) {
        //当前这个reqSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqSearchInfo(params);
        if (result.code == 200) {
            context.commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList
        }
    }
    //计算属性，在项目中，为了简化数据而生。
    //可以把我们将来在组件中用到的数据简化一下【将来组件在获取数据的时候就方便】
const getters = {
    //当前形参state，是当前仓库中的state，并非大仓库中的state
    goodsList(state) {
        //state.searchList.goodsList如果服务器数据回来了，返回的是一个数组
        //加入网络不行，返回的是undefind  无法遍历 设置空数组以防万一
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}

export default { state, actions, mutations, getters }