<template>
  <div class="index">
    <div class="page">
      <div class="title">
        焚膏油以继晷，恒兀兀以穷年<br>
        点点君的博客
      </div>
      <div class="nav">
        <div class="picture">
          <el-carousel height="250px">
            <el-carousel-item v-for="item in pictureList" :key="item">
              <h3 class="small justify-center" text="2xl">
                <img v-bind:src="item" class="img">
              </h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="recentText">
          <h1 style="font-size: 30px;color: darkgray;font-family: SansSerif,sans-serif">最近文章</h1>
          <ul>
            <li v-if="textList.length>=3">
              <div v-for="(item,index) in textList.slice(0,3)" :key="index">
                <router-link to="/text" class="textLink" @click="textPage(item)">{{item.name}}</router-link>
                <h3 style="color: darkgray">{{new Date(item.updateTime).toLocaleDateString()}}</h3>
              </div>
            </li>
            <li v-else>
              <div v-for="(item,index) in textList" :key="index">
                <router-link to="/text" class="textLink" @click="textPage(item)">{{item.name}}</router-link>
                <h3 style="color: darkgray">{{new Date(item.updateTime).toLocaleDateString()}}</h3>
              </div>
            </li>
          </ul>
        </div>
        <div class="recentCategory">
          <h1 style="font-size: 30px;color: darkgray;font-family: SansSerif,sans-serif">最近分类</h1>
          <ul>
            <li v-if="categoryList.length>=3">
              <div v-for="(item,index) in categoryList.slice(0,3)" :key="index">
                <router-link to="/home" class="textLink" @click="categoryPage(item)">{{item.name}}</router-link>
                <h3 style="color: darkgray">{{new Date(item.updateTime).toLocaleDateString()}}</h3>
              </div>
            </li>
            <li v-else>
              <div v-for="(item,index) in categoryList" :key="index">
                <router-link to="/home" class="textLink" @click="categoryPage(item)">{{item.name}}</router-link>
                <h3 style="color: darkgray">{{new Date(item.updateTime).toLocaleDateString()}}</h3>
              </div>
            </li>
          </ul>
        </div>
        <div class="moreCategory">
          <router-link to="/home" style="color: darkgray;font-size: 30px;font-family: SansSerif,sans-serif;font-weight: 700" @click="moreText">更多</router-link>
          <ul>
            <li v-if="moreList.length>=5">
              <div v-for="(item,index) in moreList.slice(0,5)" :key="index">
                <router-link to="/text" class="textLink" @click="moreTextPage(item)">{{item.name}}</router-link>
                <h3 style="color: darkgray">{{new Date(item.updateTime).toLocaleDateString()}}</h3>
              </div>
            </li>
            <li v-else>
              <div v-for="(item,index) in moreList" :key="index">
                <router-link to="/text" class="textLink" @click="moreTextPage(item)">{{item.name}}</router-link>
                <h3 style="color: darkgray">{{new Date(item.updateTime).toLocaleDateString()}}</h3>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="content">
        <button class="pageButton return" @click="back">
          <el-icon size="20" style="vertical-align: middle">
            <ArrowLeftBold />
          </el-icon>
        </button>
        <div class="head_nav">
          <router-link to="/home">
            <el-button type="success"
                       id="home"
                       style="font-size: 50px"
                       @click="Home(1)"
                       @blur="HomeOut()">Home</el-button>
          </router-link>
          <el-dropdown id="DropDownMenuCategory">
            <el-button type="primary">
              Category<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link to="/home">
                  <el-dropdown-item class="menu" v-for="item in categoryList" :key="item" @click="categoryPage(item)">
                    {{item.name}}
                  </el-dropdown-item>
                </router-link>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <input type="text" name="key" placeholder="请输入搜索内容" class="search">
          <el-button type="success"
                     id="submit"
                     style="font-size: 50px"
                     @click="search" @mousedown="mousedownSearch" @mouseup="mouseupSearch"><el-icon class="searchIcon" :size="20" color="black"><Search/></el-icon></el-button>
        </div>
        <div class="contentList">
          <router-view :routerData="routerData" :key="timer"></router-view>
        </div>
        <div class="paging">
          <button class="pageButton" @click="prePage">
            <el-icon size="20" style="vertical-align: middle">
              <ArrowLeftBold />
            </el-icon>
          </button>
          <button class="pageButton" v-for="(item,index) in pageInfo.navigatepageNums" :key="index" @click="assignPage(item)">
            <el-icon size="20" style="vertical-align: middle">
              {{item}}
            </el-icon>
          </button>
          <button class="pageButton" @click="nextPage">
            <el-icon size="20" style="vertical-align: middle">
              <ArrowRightBold />
            </el-icon>
          </button>
        </div>
      </div>
      <el-backtop :right="100" :bottom="100" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import emitter from "@/store/eventBus";
import router from "@/router";

export default {
  name: 'App',
  async created() {
    let _this=this
    const {data: res1} = await axios.get(_this.baseUrl+'/category/list', {})
    _this.categoryList=res1.data
    const {data: res2} = await axios.get(_this.baseUrl+'/text/getText', {
      params: {
        pageNum:1
      }
    })
    const {data: res3} = await axios.get(_this.baseUrl+'/more/list', {
      params: {
        pageNum:1
      }
    })
    _this.textList=res2.data.list
    _this.pageInfo=res2.data
    _this.moreList=res3.data.list
    _this.routerData=_this.textList
    router.push("/home")
  },
  mounted() {
    emitter.on("event",e=>{
      this.routerData=e
      router.push({path:'text'})
    })
  },
  data(){
    let textList;
    let moreList;
    let categoryList;
    let routerData;
    let pageInfo;
    let timer;
    const baseUrl='自己服务器的ip或url';
    let categoryId=0;
    let pictureList=[
        'http://www.diandianjun.com.cn:8080/resource/blog/dora1.jpg',
        'http://www.diandianjun.com.cn:8080/resource/blog/dora2.jpg',
        'http://www.diandianjun.com.cn:8080/resource/blog/dora3.jpg',
        'http://www.diandianjun.com.cn:8080/resource/blog/dora4.jpg',
    ];
    return{
      textList,
      moreList,
      pictureList,
      categoryList,
      routerData,
      pageInfo,
      timer,
      categoryId,
      baseUrl
    }
  },
  watch:{
    textList(newVal){
      this.routerData=newVal
      this.timer=new Date().getTime()
    }
  },
  methods:{
    async Home(thisPageNum) {
      let home = document.getElementById("home")
      home.style.color = 'rgb(255,255,255)'
      home.style.backgroundColor = 'rgb(0,163,137)'
      let _this = this
      _this.categoryId=0;
      const {data: res2} = await axios.get(_this.baseUrl+'/text/getText', {
        params: {
          pageNum: thisPageNum
        }
      })
      _this.textList = res2.data.list
      _this.pageInfo = res2.data
      const search = document.getElementsByClassName("search")
      search[0].value=''
    },
    HomeOut(){
      let home = document.getElementById("home")
      home.style.color='rgb(0,163,137)'
      home.style.backgroundColor='rgb(0,163,137,0)'
    },
    async search() {
      if(router.currentRoute.value.fullPath==='/text'){
        router.push('/home')
      }
      const search = document.getElementsByClassName("search")
      const searchKey = search[0].value
      let _this = this
      const {data: res} = await axios.get(this.baseUrl+'/text/getText', {
        params: {
          key:searchKey,
          pageNum:1
        }
      })
      _this.textList = res.data.list
      _this.pageInfo=res.data
    },
    mousedownSearch(){
      const submit = document.getElementById("submit")
      submit.style.backgroundColor='rgb(0,163,137)'
    },
    mouseupSearch(){
      const submit = document.getElementById("submit")
      submit.style.backgroundColor='rgb(237,240,245)'
    },
    async prePage() {
      let _this = this
      if(!_this.pageInfo.hasPreviousPage||router.currentRoute.value.fullPath==='/text'){
        return
      }
      const search = document.getElementsByClassName("search")
      const searchKey = search[0].value
      if(this.categoryId===0){
        const {data: res} = await axios.get(this.baseUrl+'/text/getText', {
          params: {
            key: searchKey,
            pageNum: _this.pageInfo.pageNum-1
          }
        })
        _this.textList = res.data.list
        _this.pageInfo=res.data
      }else if(this.categoryId>0){
        const {data: res} = await axios.get(this.baseUrl+'/text/categoryText', {
          params: {
            key: searchKey,
            pageNum: _this.pageInfo.pageNum-1,
            categoryId: _this.categoryId
          }
        })
        _this.textList = res.data.list
        _this.pageInfo=res.data
      }else {
        const {data: res} = await axios.get(this.baseUrl + '/more/list', {
          params: {
            pageNum: _this.pageInfo.pageNum-1,
            key: searchKey
          }
        })
        this.pageInfo=res.data
        this.moreList=res.data.list
        this.routerData = this.moreList
      }
    },
    async nextPage() {
      let _this = this
      if(!_this.pageInfo.hasNextPage||router.currentRoute.value.fullPath==='/text'){
        return
      }
      const search = document.getElementsByClassName("search")
      const searchKey = search[0].value
      if(this.categoryId===0){
        const {data: res} = await axios.get(this.baseUrl+'/text/getText', {
          params: {
            key: searchKey,
            pageNum: _this.pageInfo.pageNum+1
          }
        })
        _this.textList = res.data.list
        _this.pageInfo=res.data
      }else if(this.categoryId>0){
        const {data: res} = await axios.get(this.baseUrl+'/text/categoryText', {
          params: {
            key: searchKey,
            pageNum: _this.pageInfo.pageNum+1,
            categoryId: _this.categoryId
          }
        })
        _this.textList = res.data.list
        _this.pageInfo=res.data
      }else {
        const {data: res} = await axios.get(this.baseUrl + '/more/list', {
          params: {
            pageNum: _this.pageInfo.pageNum+1,
            key: searchKey
          }
        })
        this.pageInfo=res.data
        this.moreList=res.data.list
        this.routerData = this.moreList
      }
    },
    async assignPage(pageNum) {
      let _this = this
      if(_this.pageInfo.pageNum===pageNum||router.currentRoute.value.fullPath==='/text'){
        return
      }
      const search = document.getElementsByClassName("search")
      const searchKey = search[0].value
      if(this.categoryId===0){
        const {data: res} = await axios.get(this.baseUrl+'/text/getText', {
          params: {
            key: searchKey,
            pageNum: pageNum
          }
        })
        _this.textList = res.data.list
        _this.pageInfo=res.data
      }else if(this.categoryId>0){
        const {data: res} = await axios.get(this.baseUrl+'/text/categoryText', {
          params: {
            key: searchKey,
            pageNum: pageNum,
            categoryId: _this.categoryId
          }
        })
        _this.textList = res.data.list
        _this.pageInfo=res.data
      }else {
        const {data: res} = await axios.get(this.baseUrl + '/more/list', {
          params: {
            pageNum: pageNum,
            key: searchKey
          }
        })
        this.pageInfo=res.data
        this.moreList=res.data.list
        this.routerData = this.moreList
      }
    },
    async categoryPage(categoryInfo) {
      this.categoryId = categoryInfo.id
      const search = document.getElementsByClassName("search")
      const searchKey = search[0].value
      const {data: res} = await axios.get(this.baseUrl+'/text/categoryText', {
        params: {
          key: searchKey,
          pageNum: 1,
          categoryId: this.categoryId
        }
      })
      this.textList = res.data.list
      this.pageInfo = res.data
    },
    textPage(textInfo){
      this.routerData=textInfo
    },
    back(){
      router.go(-1)
      this.routerData=this.textList
    },
    moreTextPage(textInfo){
      this.routerData=textInfo
    },
    async moreText() {
      const {data: res} = await axios.get(this.baseUrl + '/more/list', {
        params: {
          pageNum: 1
        }
      })
      this.pageInfo=res.data
      this.moreList=res.data.list
      this.routerData = this.moreList
      this.categoryId = -1
    },
  }
}

</script>

<style>
  .index{
    background-color: rgb(219,222,229);
    width: 100%;
    height: 2000px;
    padding-top: 50px;
  }
  .page{
    position: relative;
    margin: 0 auto;
    background-color: rgb(255,255,255);
    overflow: hidden;
    width: 80%;
    height: 1800px;
    border-radius: 24px;
    box-shadow: 0 0 20px -4px rgba(0, 0, 0, .3);
  }
  .title{
    height: 150px;
    width: 30%;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    padding-top: 30px;
  }
  .nav{
    position: relative;
    height: 1650px;
    width: 30%;
    background-color: rgb(224,244,241);
  }
  .content{
    position: absolute;
    top: 0;
    right: 0;
    height: 1800px;
    width: 70%;
    float: left;
    background-color: rgb(237,240,245);
  }
  .head_nav{
    position: absolute;
    top: 20px;
    right: 100px;
    width: 80%;
    height: 80px;
    background-color: rgb(224,244,241);
    border-radius: 10px;
  }
  #home{
    position: absolute;
    top: 15px;
    left: 30px;
    height: 50px;
    width: 70px;
    border: none;
    color: rgb(0,163,137);
    background-color: rgb(0,163,137,0);
  }
  #DropDownMenuCategory{
    position: absolute;
    top: 15px;
    left: 120px;
    border: none;
    color: rgb(0,163,137);
    background-color: rgb(0,163,137,0);
    height: 50px;
  }
  #DropDownMenuCategory:hover{
    color: rgb(255,255,255);
    background-color: rgb(0,163,137);
  }
  .search{
    position: absolute;
    top: 15px;
    right: 70px;
    height: 50px;
    width: 60%;
    color: rgb(0,163,137);
    padding-left: 10px;
    border-radius: 24px;
    box-shadow: 0 0 20px -4px rgba(0, 0, 0, .3);
  }
  #submit{
    position: absolute;
    top: 15px;
    right: 10px;
    height: 50px;
    width: 50px;
    border-radius: 10px;
    background-color: rgb(237,240,245);
    border: none;
  }
  .contentList{
    position: absolute;
    height: 1600px;
    width: 80%;
    top: 110px;
    right: 100px;
  }
  .picture{
    position: absolute;
    top: 50px;
    left: 10%;
    height: 250px;
    width: 80%;
  }
  .recentText{
    position: absolute;
    top: 350px;
    left: 10%;
    height: 250px;
    width: 80%;
  }
  .recentCategory{
    position: absolute;
    top: 650px;
    left: 10%;
    height: 250px;
    width: 80%;
  }
  .moreCategory{
    position: absolute;
    top: 950px;
    left: 10%;
    height: 600px;
    width: 80%;
  }
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
  }
  .img{
    width: 100%;
    height: 200px;
  }
  .textLink{
    font-size: 15px;
    font-family: 'Microsoft Yahei',ui-serif;
    font-weight: 600;
    color: darkgray;
    line-height: 50px;
    text-align: center;
  }
  .paging{
    position: absolute;
    bottom: 15px;
    left: 115px;
    height: 60px;
    width: 77%;
  }
  .pageButton{
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background-color: #FFFFFF;
    box-shadow: 0 0 20px -4px rgba(0, 0, 0, .2);
    margin-left: 10px;
    margin-right: 10px;
    transition: all 0.5s;
  }
  .pageButton:hover{
    width: 50px;
    height: 50px;
  }
  .return{
    position: fixed;
    top: 130px;
    left: 580px;
    box-shadow: 0 0 20px -4px rgba(0, 0, 0, .1);
  }
</style>
