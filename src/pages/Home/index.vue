<template>
 <div>
   <TypeNav/>
  <ListContainer/>
  <Recommed/>
  <Rank/>
  <Like/>
  <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
  <Brand/>
 </div>
</template>


<script>

 

</script>

<script>

      /* 全局组件不需要再引入，可以直接使用 */
      /* import TypeNav from './TypeNav' */
      import ListContainer from '@/pages/Home/ListContainer'
      import Recommed from '@/pages/Home/Recommend'
      import Rank from '@/pages/Home/Rank'
      import Like from '@/pages/Home/Like'
      import Floor from '@/pages/Home/Floor'
      import Brand from '@/pages/Home/Brand'
      import {mapState} from 'vuex'


      export default {
        data() {
          return {
            
          };
        },
        components:{
          ListContainer,
          Recommed,
          Rank,
          Like,
          Floor,
          Brand
          },
        mounted(){
          //派发action获取floor组件数据
          this.$store.dispatch('getFloorList');
        },
        computed:{
          ...mapState({
            floorList:state=>state.home.floorList
          })
        }
      }
</script>

<style>

</style>