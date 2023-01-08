<template>
  <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousoel,index) in list" :key="carousoel.id">
                <img :src="carousoel.imgUrl">
            </div>
            <!--  <div class="swiper-slide">
                <img src="./images/floor-1-b02.png">
            </div>
            <div class="swiper-slide">
                <img src="./images/floor-1-b03.png">
            </div> -->
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
 name:'Carousel',
 props:['list'],
 watch:{
    list:{
        //立即监听：不管数据有没有变化，立即监听一次
        //为什么watch监听不到list，因为从来没有发生变化（数据是父亲给的，父亲给的时候就是一个对象，对象里面的数据该有的都有的）
        immediate:true,
      handler(){
         this.$nextTick(()=>{
            var mySwiper = new Swiper(
           /*  document.querySelector(".swiper-container"), */
           /* 通过ref获取dom节点 */
            this.$refs.cur,
            {
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                //点击小球的时候也切换图片
                clickable: true,
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },

              // 如果需要滚动条
              scrollbar: {
                el: ".swiper-scrollbar",
              },
            }
          );
         });
      }
    }
 }
}
</script>
 
<style>

</style>