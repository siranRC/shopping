<template>
     <!-- 商品分类导航 -->
        <div class="type-nav">
            <div class="container">
              <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                  <h2 class="all">全部商品分类</h2>
                  <!-- 三级联动 -->
                  <!-- 过渡动画 -->
                <transition 
                name="animate__animated animate__bounce"
                enter-active-class="animate__fadeIn"
                leave-active-class="animate__fadeOut"
                >
                  <div class="sort" v-show="show">
                    <div class="all-sort-list2"  @click="goSearch">
                        <div class="item" v-for="(c1 , index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                            <h3 @mouseenter="changeIndex(index)">
                                <a :data-categoryName = 'c1.categoryName' :data-category1Id='c1.categoryId'>{{c1.categoryName}}</a>
                            </h3>
                            <!-- 二级，三级分类 -->
                            <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName = 'c2.categoryName'  :data-category2Id='c2.category2Id'>{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName = 'c3.categoryName'  :data-category3Id='c3.category3Id'>{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div> 
                            </div>
                        </div>
                       
                    </div>
                </div>
                </transition>
              </div>

                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
               
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex'
/* 防抖节流api(按需引入) */
import {throttle} from 'lodash'
//引入动画库
import 'animate.css';

export default {
   name:'TypeNav',
   data() {
    return {
        currentIndex: '',
        show:'true'
    };
   },
   //组件挂载完毕：可以向服务器发请求
   computed:{
    ...mapState({
        //右侧需要的是一个函数，当时用这个计算属性的时候，右侧函数会立即执行一次
        //注入一个参数state，其实为大仓库中的数据
        categoryList:state=> state.home.categoryList
    })
   },
   methods: {
    //throttle(节流，（技能冷却）)回调尽量别用箭头函数
    //鼠标进入修改响应式数据currentIndex属性
    changeIndex:throttle(function(index){
         //鼠标移上某一个一级分类的元素的索引值
       this.currentIndex = index
    },100),
    enterShow(){
        this.show = true
    },
    leaveIndex(){
        /* 給h2和div sort加一个父div这样鼠标移到二级分类上背景颜色也不会掉 */
        this.currentIndex = -1 
        if(this.$route.path != '/home'){
            //判断路径，鼠标离开的时候，typeNav隐藏
            this.show = false         
        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    },
    goSearch(event){
        //最好的解决方法:编程式导航 + 事件委派 -->
        // 存在的问题1：事件的委派，是把全部的子节点【h3,dt,dl,em】的事件委派给父亲节点
        //点击a标签的时候，才会进行路由跳转 （怎么确定点击的一定是a标签）
        // 存在的问题2：如何区分是一级，二级，还是三级菜单的a标签

        /* 问题一：把子节点当中的a标签，加上自定义属性data-categoryName,其余子节点是没有的 */

       /*  this.$router.push('/search') */
       let element = event.target;
       /* 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值 */
       let {categoryname,category1id,category2id,category3id} = element.dataset;
       /* 如果标签身上拥有categoryname一定是a标签 */
       if(categoryname){
        //整理路由跳转参数
        let location = {name:'sousuo'}
        let query = { categoryName:categoryname}
          //一级分类，二级分类，三级分类的a标签
          if(category1id){
             query.category1Id =  category1id
          }else if(category2id){
              query.category2Id =  category2id
          }else{
               query.category3Id =  category3id
          }
          //判断：路由跳转的时候，带有params参数，捎带传过去
          if(this.$route.params){
            location.params = this.$route.params
             location.query = query
          //路由跳转
          this.$router.push(location)
          }
         
       }
       
    },
   
   },
   mounted(){
   

    //当前路由是'/search'，typeNav隐藏
    if(this.$route.path != '/home'){
         //当组件挂载成功，修改show的属性值
        this.show = false
    }
   
   }
}
</script>

<style scoped lang='less'>
  .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        /* &:hover {
                            .item-list {
                                display: block;
                            }
                        } */
                    }
                    .cur{
                        background-color: skyblue;
                    }
                }
            }
           
        }
    }
</style>