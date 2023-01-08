//登录与注册的模块

import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api/index";
import {  getToken, setToken ,removeToken } from "@/utils/token";
const state = {
    code : '',
    token:getToken(),
    userInfo:{}
}
const actions = {
    //获取验证码
   async getCode(context,phone){
       let result =  await reqGetCode(phone)
       if(result.code == 200){
        context.commit('GETCODE',result.data)
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    },
    //用户注册
   async userRegister(context,user){
      let result = await reqUserRegister(user)
     if(result.code == 200){
        return 'ok'
     }else{
        return Promise.reject(new Error('faile'))
     }
    },
    //登录业务
   async userLogin(context,data){
      let result = await reqUserLogin(data)
      //服务器下发token，用户唯一标识符
      //将来经常带token找服务器要信息
    if(result.code == 200){
        //用户已经登录成功且获取到token，但是存储·到仓库中，刷新页面会丢失，因为vuex存储不是持久化的，所以要本地存储
        context.commit('USERLOGIN',result.data.token);
        setToken(result.data.token)
        return ' ok'
    }else{
        return Promise.reject(new Error('faile'))
    }
    },
    //获取用户信息
   async getUserInfo(context){
       let result = await reqUserInfo()
       if(result.code == 200){
        context.commit('GETUSERINFO',result.data)
        return 'ok'    
    }else{
        return Promise.reject(new Error)
    }
    },
    //退出登录
   async userLogout(context){
    //向服务器发请求，退出登录
      let result = await reqLogout()
      if(result.code == 200){
        //action里不能操作state
        context.commit('CLEAR')
      }
    }
}
const mutations = {
    GETCODE(state,code){
     state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
      state.token = ''
      state.userInfo = ''
      removeToken()
    }
}
const getters = {}
export default{
    state,
    actions,
    mutations,
    getters
}