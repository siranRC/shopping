<template>
  <div>
    <!-- 三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread ： 面包屑，带有小xx-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">x</i></li>
          <!-- 关键字的面包屑 -->
          <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">x</i></li>
          <!-- trademark的面包屑 -->
          <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">x</i></li>
          <!-- 平台售卖属性 -->
          <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{attrValue.split(':')[1]}}<i @click="removeAttr(index)">x</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/><!-- 这里自定义事件不需要参数 -->

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 根据order的值判断是否需要背景色 -->
                <li :class="{active:orderIsOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="orderIsOne" class="iconfont icon-packup" :class="{'icon-packup': orderIsAsc,'icon-arrow-down-bold':orderIsDesc}"></span></a>
                </li>
                <li :class="{active:orderIsTwo}"  @click="changeOrder('2')">
                  <a @click="">价格<span v-show="orderIsTwo" class="iconfont icon-packup" :class="{'icon-packup': orderIsAsc,'icon-arrow-down-bold':orderIsDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"><!-- 路由跳转一定要带id -->
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li> 
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div> -->
          <Pagination 
            :pageNo = 'searchParams.pageNo' 
            :pageSize= 'searchParams.pageSize' 
            :total='total' 
            :continues='5'
            @getPageNo = 'getPageNo'
             />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters ,mapState} from 'vuex'
  import SearchSelector from './SearchSelector/SearchSelector'
  export default {
    name: 'Search',

    components: {
      SearchSelector
    },
    data() {
      return {
        searchParams: {      
          "category1Id": "",
          "category2Id": "",    
          "category3Id": "",
          "categoryName": "",
          "keyword": "",
          //商品排序：初始值应该是综合降序
          "order": "1:desc",
          //当前页
          "pageNo": 1,
          "pageSize": 10,
          "props": [],
          "trademark": ""
        },
      };
    },
    beforeMount(){
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    mounted(){
      //在发请求之前带给服务器参数【searchParms参数发生变化有数值带给服务器】
     this.getData();
    },
    computed:{
      //
    ...mapGetters(['goodsList']),
    orderIsOne(){
      return this.searchParams.order.indexOf('1') !== -1

    },
     orderIsTwo(){
      return this.searchParams.order.indexOf('2') !== -1

    },
    orderIsAsc(){//升序
      return this.searchParams.order.indexOf('asc') !==-1 
    },
    orderIsDesc(){
      return this.searchParams.order.indexOf('desc') !==-1
    },
    //获取search模块展示产品一共多少条
    ...mapState({
      total:state=>state.search.searchList.total
    })

    },
    methods:{
      //向服务器发请求，获取search模块数据（根据参数不同，返回不同的数据进行展示）
      //把这次请求封装为一个函数，当你需要时再调用即可
      getData(){
        this.$store.dispatch('getSerchList',this.searchParams)
      },
      //删除分类的名字
      removeCategoryName(){
        //把带给服务器的参数置空了，还需要向服务器发请求
        //带给服务器的参数是可有可无的；如果属性值为空的字符串还是会把相应的字段带给服务器
        //但是undefined,当前这个字段不会带给服务器
        this.searchParams.categoryName = undefined;
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        this.getData();
        //地址栏也需要改：进行路由跳转
        //严谨：本意是删除query参数，如果路径中出现了params不应该删除，路由跳转的时候应该带着
       /*  this.$router.back(1) */ //不好
        this.$router.push({name:'search',params:this.$route.params})
      },
      removeKeyword(){
        //给服务器带的参数searcnParrams的keyword置空
        this.searchParams.keyword = undefined;
        //再次发请求
        this.getData();
        //通知兄弟组件Header清除关键字
        this.$bus.$emit('clear')
        //地址栏也需要改：进行路由跳转
        if(this.$route.$query){
          this.$router.push({name:'search',query:this.$route.query})
        }
      },
      removeTrademark(){
        this.searchParams.trademark = undefined
        this.getData()
      },
      //自定义回调
      trademarkInfo(trademark){
        //1.整理品牌字段的参数
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      //2.再次发请求获取search列表数据进行展示
      this.getData()
      },
      //收集平台属性的回调函数
      attrInfo(attr,attrValue){
        //参数格式整理好
        let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
        //数组去重
        if(this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props)  
        this.getData()
        console.log(attr);
      
      },
      removeAttr(index){
        //再次整理参数，再发请求
       this.searchParams.props.splice(index,1)
       this.getData()
      },
      //排序
      changeOrder(flag){
        //flag形参 代表用户点击的是综合还是价格
       let originOrder = this.searchParams.order;
       //这里是获取到下一次点击的前一次的状态
       let originFlag = originOrder.split(':')[0]
       let originSort = originOrder.split(':')[1]
       //准备一个新order属性
       let newOrdre = ''
       //点击同一个
       if(originFlag == flag ){
          newOrdre = `${originFlag}:${originSort == 'desc' ? 'asc':'desc'}`;
       }else{
        //点击另一个
        newOrdre = `${flag}:${'desc'}`
       }
       //新order赋值给searchParams
       thiis.searchParams.order = newOrdre;
       //再次发起请求
       this.getData()
      },
      //分页器自定义事件回调函数
      getPageNo(pageNo){
        //整理带给服务器参数
        this.searchParams.pageNo = pageNo
        //再次发起请求
        this.getData()
      }

    }, 
    watch:{
      $route(oldval){
        //监听路由的信息是否发生变化，如果发生变化，再次发起请求
        Object.assign(this.searchParams,this.$route.parms,this.$route.query)
        //再次发起ajax请求
        this.getData();
        //每一次请求完毕，应该把相应的1,2,3,级分类的id置空，让她接受下一次的相应的1,2,3
        //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给它赋予新的数据
        this.searchParams.category1Id = '';
         this.searchParams.category1Id = '';
         this.searchParams.category1Id = '';

      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>