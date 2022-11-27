<template>
<div class="text">
<!--  <div class="textZone" v-highlight v-html="article"></div>-->
  <v-md-preview :text="TextData" class="textZone"></v-md-preview>
</div>
</template>

<script>
import axios from "axios";
// import {marked} from 'marked'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Text",
  props:["routerData"],
  watch:{
    async routerData(newValue) {
      const {data: res} = await axios.get(newValue.url, {})
      this.TextData = res
    }
  },
  data(){
    let TextData
    return{
      TextData,
    }
  },
  async created() {
    const {data: res} = await axios.get(this.routerData.url, {})
    this.TextData = res
  },
  // computed:{
  //   article(){
  //     return marked(this.TextData)
  //   }
  // }
}
</script>

<style scoped>
  .text{
    position: relative;
    background-color: #FFFFFF;
    height: 1600px;
    width: 100%;
    border-radius: 25px;
    box-shadow: 0px 0px 20px -4px rgba(0, 0, 0, .1);
  }
  .textZone::-webkit-scrollbar{
    display: none;
  }
  .textZone{
    position: absolute;
    scrollbar-width:none;
    -ms-overflow-style: none;
    overflow-x: hidden;
    overflow-y: auto;
    height: 1550px;
    width: 90%;
    left: 6%;
    top: 2%;
    font-size: 35px;
    line-height: 30px;
  }
</style>
