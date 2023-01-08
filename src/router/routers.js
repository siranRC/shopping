//引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail';
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess"
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";
//路由配置信息  (路径小写)
export default [{
    path: '/center',
    component: Center,
    meta: {
        show: true
    },
    //子路由
    children:[
        {
              path:'myorder',
              component:MyOrder
        },
        {
            path:'grouporder',
            component:GroupOrder
        },
        {
            path:'/center',
            redirect:'/center/myorder'
        }
    ],

},{
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            show: true
        }
},{
    path: '/pay',
    component: Pay,
    meta: {
        show: true
    },
    beforeEnter: (to, from, next) => {
        if(from.path == '/trade'){
            next()
        }else{
            next(false)
        }
    }
},{
    path: '/trade',
    component: Trade,
    meta: {
        show: true
    },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
        if(from.path == '/shopCart'){
            next()
        }else{
            //其他的路由组件而来，停留在当前页面
            next(false)
        }
    }
}, {
        path: '/shopcart',
        component: ShopCart,
        meta: {
            show: true
        }
    }, {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: {
            //显示footer
            show: true
        }
    },
    {
        path: '/detail/:skuid', //在路由跳转的时候需要带上产品的ID给详情页面
        component: Detail,

    }, {
        path: '/home',
        component: Home,
        meta: {
            show: true
        }
    }, {
        name: 'sousuo',
        path: '/search/:keyword?', //问号代表参数可传可不传
        component: Search,
        meta: {
            show: true
        }
    }, {
        path: '/login',
        component: Login,
        meta: {
            show: false
        }
    }, {
        path: '/register',
        component: Register,
        meta: {
            show: false
        }
    }, {
        //重定向，在项目跑起来的时候，访问/,立马让他定向到首页
        path: '/',
        redirect: '/home'
    },
]