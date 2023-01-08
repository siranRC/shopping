import { reqAddressInfo ,reqOrderInfo } from "@/api";
const state = {
    address :'',
    orderInfo : {}
}
const actions = {
    //获取用户地址信息
   async getUserAddress(context){
     let result = await reqAddressInfo()
     if(result.code == 200){
        context.commit('GETUSERADDRESS',result.data)
     }
    },
    //获取商品清单信息
   async getOrderInfo(context){
      let result =  await reqOrderInfo()
      if(result.code == 200){
        context.commit('GETORDERINFO',result.data)
        return 'ok'
      }
    }

}
const mutations = {
    GETUSERADDRESS(state,address){
        state.address = address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const getters = {}
export default{
    state,actions,mutations,getters
}