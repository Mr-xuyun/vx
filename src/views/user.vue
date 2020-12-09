<template>
  <div>
    <van-nav-bar
      title="用户"
    />
    <img src="../assets/course/铭师通海报.png" class="mstImg" />

     <div >
       <img src="../assets/msdj.png" alt="" class="msdj">
     </div>
     <div>
       <van-button type="info" round block @click="$router.push('/login')">登录</van-button>
     </div>
     <!-- <div class="">
       <van-button type="default" round block @click="$router.push('/logon')">注册</van-button>
     </div> -->
    <van-tabbar v-model="active" >
      <van-tabbar-item icon="apps-o" replace to="/">办公</van-tabbar-item>
      <van-tabbar-item icon="orders-o" replace to="/course" >课程</van-tabbar-item>
      <van-tabbar-item icon="records" replace to="/job">作业</van-tabbar-item>
      <van-tabbar-item icon="manager-o" replace to="/user" >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active:3
    };
  },
};
</script>
<style scoped>
.mstImg {
  width: 100%;
  height: 150px;
 
}
.msdj{
    margin-top: 10px;
     width: 100%;
    height: 250px;
}
.tabbar{
    display: flex; 
    justify-content: space-around; 
    text-align: center;
    margin-top: 15px;
}
</style>