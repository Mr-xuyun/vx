<template>
     <div>
   
    <login></login>
    <van-tabbar v-model="active" >
      <van-tabbar-item icon="apps-o" replace to="/student">首页</van-tabbar-item>
      <van-tabbar-item icon="manager-o"  @click="$router.push('/studentLogin')" >登录</van-tabbar-item>
    </van-tabbar>
     </div>
</template>
<script>
import login from "../components/login"
export default {
     components:{login},
    data(){
         return{
               active:1,
               username: "",
         }
    }

}
</script>