<template>
  <div class="cover" @click="show">
<!--    <h1 class="coverTitle">{{content.name}}</h1>-->
    <v-md-preview :text="TextData" class="textZone"></v-md-preview>
    <h3 class="updateTime">发布于{{new Date(content.updateTime).toLocaleDateString()}}</h3>
  </div>
</template>

<script>

import axios from "axios";
import emitter from "@/store/eventBus";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Cover",
  props:['content'],
  async created() {
    const {data: res} = await axios.get(this.content.url, {})
    this.TextData=res
  },
  data(){
    let TextData;
    return{
      TextData
    }
  },
  methods:{
    show(){
      emitter.emit("event",this.content)
    }
  }
}
</script>

<style scoped>
  .cover{
    position: relative;
    width: 730px;
    height: 246px;
    margin: 20px;
    background-color: #FFFFFF;
    border-radius: 25px;
    box-shadow: 0px 0px 20px -4px rgba(0, 0, 0, .1);
    transition: all 0.5s;
  }
  .cover:hover{
    width: 700px;
    height: 220px;
  }
  .coverTitle{
    position: absolute;
    top: 20px;
    left: 40px;
    font-size: 25px;
  }
  .textZone{
    position: absolute;
    top: 10px;
    left: 10px;
    width: 650px;
    height: 200px;
    font-size: 5px;
    color: black;
    scrollbar-width:none;
    -ms-overflow-style: none;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .textZone::-webkit-scrollbar{
    display: none;
  }
  .updateTime{
    position: absolute;
    bottom: 5%;
    right: 5%;
    color: darkgray;
  }
</style>
