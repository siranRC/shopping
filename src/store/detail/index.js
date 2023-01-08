import { reqGoodInfo, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块uuid--->生成一个随机字符串（不能再变了）
import { getUUID } from "@/utils/uuid_token";
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    //获取产品信息的action
    async getGoodInfo(context, skuId) {
        let result = await reqGoodInfo(skuId)
        if (result.code == 200) {
            context.commit('GETGOODINFO', result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart(context, { skuId, skuNum }) {
        //加入购物车返回的解构
        //加入购物车以后（发请求），前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他数据，只是返回code，代表这次请求成功还是失败
        //因为服务器没有返回其他数据，没必要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        //代表服务器加入购物车成功
        if (result.code == 200) {
            return 'ok'
        } else {
            //代表加入购物车失败
            return Promise.reject(new Error('false'))
        }

    }
}
const getters = {
    //简化数据
    categoryView(state) {
        //比如：state.goodinfo初始状态为空对象，空对象的categoryView属性值为undefined，undefined打点报错
        //当前计算出的categoryView属性值至少是一个空对象，假的报错就不会有了
        return state.goodInfo.categoryView || {}
    },
    //简化产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    //简化产品售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}