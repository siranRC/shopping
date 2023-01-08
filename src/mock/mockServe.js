//先引入mockjs模块
import Mock from 'mockjs'
//把json数据格式引入[JSON数据格式根本没有对外暴露，单是可以引用]
//webpack默认对外暴露的：图片，JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
import address from "./address.json";
import detailArrayList from "./shopTrade.json";

//mock数据:(第一个参数：请求地址,第二个参数：请求返回的数据)
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
Mock.mock("/mock/address",{code:200,data:address});
Mock.mock('/mock/detailarrayList',{code:200,data:detailArrayList})