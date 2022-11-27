<template>
  <div class="home">
    <div v-for="(item,index) in routerData" :key="index">
      <Cover :content="item" :key="timer"></Cover>
    </div>

  </div>
</template>



<script>
import Cover from "@/components/Cover";
export default {
  props:["routerData"],
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data(){
    let TextData;
    let timer
    return{
      TextData,
      timer
    }
  },
  watch:{
    routerData(newValue){
      this.timer=new Date().getTime()
      console.log(newValue)
    }
  },
  methods:{
  },
  components:{
    Cover,
  }
}
</script>

<style scoped>
  .home{
    height: 1600px;
    width: 100%;
  }
</style>
