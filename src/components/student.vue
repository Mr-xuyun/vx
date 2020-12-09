<template>
     <div>
    <!--导航栏 -->
    <van-nav-bar
      title="铭师点睛"
    >
    
      <template #right> </template>
    </van-nav-bar>
     <!--轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white" style="margin-top:15px;">
      <van-swipe-item
        ><img src="../assets/mst/海报1.jpg" class="swipeImg"
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../assets/mst/海报2.jpg" class="swipeImg"
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../assets/mst/海报3@3x.png" class="swipeImg"
      /></van-swipe-item>
    </van-swipe>
    <div class="mstImg">
         <img src="../assets/mst/铭师通2.png" @click="$router.push('/mst')">
    </div>
     <router-link to="/workList" class="blank" style="color:#000">
      <mt-cell title="作业库" is-link>
        <img slot="icon" src="../assets/job/作业库.png" width="24" height="24" />
      </mt-cell>
    </router-link> 
    <router-link to="/workDifficult" class="blank" style="color:#000">
      <mt-cell title="错题疑难题查看" is-link>
        <img slot="icon" src="../assets/mst/错题一难题查看.png" width="24" height="24" />
      </mt-cell>
    </router-link> 
    <!-- 学生内容 -->
    <van-grid square  :column-num="3" border :clickable="true">
        <van-grid-item @click="$router.push('/no')" >
              <img src="../assets/student/晚辅.png" width="30" height="30" >
              <div style="color:#666; font-size:14px; margin-top:5px;">晚辅</div>
        </van-grid-item>
        <van-grid-item @click="$router.push('/no')">
                 <img src="../assets/student/学习管理.png" width="30" height="30" >
              <div style="color:#666; font-size:14px; margin-top:5px;">学习管理</div>
        </van-grid-item>
        <van-grid-item @click="$router.push('/no')">
            <img src="../assets/student/私定.png" width="30" height="30">
              <div style="color:#666; font-size:14px; margin-top:5px;">私定</div>
        </van-grid-item>
                <van-grid-item @click="$router.push('/no')" >
              <img src="../assets/student/一对一.png" width="30" height="30" >
              <div style="color:#666; font-size:14px; margin-top:5px;">一对一</div>
        </van-grid-item>
        <van-grid-item @click="$router.push('/no')">
                 <img src="../assets/student/小班.png" width="30" height="30" >
              <div style="color:#666; font-size:14px; margin-top:5px;">小班</div>
        </van-grid-item>
        <van-grid-item @click="$router.push('/no')">
            <img src="../assets/student/全托.png" width="30" height="30">
              <div style="color:#666; font-size:14px; margin-top:5px;">全托</div>
        </van-grid-item>
   </van-grid>
    <!-- 底部选项卡 -->
    <div style="margin-top:30px;">
     <van-tabbar v-model="active" >
      <van-tabbar-item icon="apps-o" replace to="/student">首页</van-tabbar-item>
      <van-tabbar-item icon="manager-o"  @click="user" >登录</van-tabbar-item>
    </van-tabbar>
    </div>
   
</div>
</template>

<script>
export default {
     data(){
          return {
               active:0,
          }
     },
     methods:{
         user(){
              this.$router.push('/login')
              this.active = 1;
         }
     }
}
</script>
<style scoped>
.swipeImg {
  width: 100%;
  height: 100px;
}
.mstImg{
     padding: 10px 10px;
}
.mstImg>img{
    width: 100%;
    height: 140px;
    
}
</style>