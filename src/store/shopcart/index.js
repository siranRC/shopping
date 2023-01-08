import { reqCartList, reqDeleteCartById, reqUpdataCheckedById } from "@/api";
const state = {
    cartList: []
}
const actions = {
    //获取购物车列表数据
    async getCartList(context) {
        let result = await reqCartList()
        if (result.code == 200) {
            context.commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId(context, skuId) {
        let result = await reqDeleteCartById(skuId)
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车某一个产品的选中状态
    async updateCkeckedById(context, { skuId, isChecked }) {
        let result = await reqUpdataCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(faile))
        }
    },
    //删除全部勾选产品 (特殊)
    deleteAllCheckedCart({dispatch,getters}) {
        //context小仓库，commit【提交mutation修改state】 getters【计算属性】 dispatch 【派发action】 state 【当前仓库数据】
        //获取购物车中全部数据
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            if(item.isChecked == 1){
             let promise =  dispatch('deleteCartListBySkuId',item.skuId)
             //将每一次返回的Promise添加到数组中
             PromiseAll.push(promise)
            }
        });
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态 (特殊)
    updataAllCartChecked({dispatch,state},isChecked){
        let promiseAll = []
      state.cartList[0].cartInfoList.forEach(item=>{
       let promise =  dispatch('updateCkeckedById',{skuId:item.skuId,isChecked})
       promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const getters = {
    cartList() {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}