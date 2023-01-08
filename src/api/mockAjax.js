//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条的样式
import 'nprogress/nprogress.css'

//1.利用axios对象的方法create,去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const request = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径中会出现api
    baseURL: '/mock',
    //代表请求超时的时间5s,(超过则请求失败)
    timeout: 5000,

});
//请求拦截器：在发请求之前，请求拦截器可以拦截，可以在请求发出去之前做一些事情
request.interceptors.request.use((config) => {
        //config:配置对象，请求头(headers)：很重要
        //进度条开始动
        nprogress.start()
        return config;
    })
    //响应拦截器
request.interceptors.response.use((res) => {
    //成功的回调函数：服务器相应数据回来以后，响应拦截可以检测到，可以做一些事情
    //进度条结束
    nprogress.done()
    return res.data
}, (error) => {
    //失败回调
    return Promise.reject(new Error('faile'))
})


//对外暴露
export default request;


/* 为什么要对axios进行二次封装？
答：主要是要用到请求拦截器和响应拦截器; */