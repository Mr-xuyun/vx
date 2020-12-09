<template>
  <div class="home">
    <!-- //搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="搜索任务/消息"
      />
    </form>
    <div class="tabbar">
      <div class="rili">
        <van-icon name="notes-o" size="24" color="#787878" />
        <span>日历</span>
      </div>
      <div class="daiban">
        <van-icon name="todo-list-o" size="24" color="#787878" />
        <span>待办</span>
      </div>
      <div class="tishi">
        <van-icon name="bulb-o" size="24" badge="9" color="#787878" />
        <span>提醒</span>
      </div>
    </div>
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
    <!-- 通知栏 -->
        <van-notice-bar
        color="#1B8FFFFF"
        background="#fff"
      left-icon="volume-o"
      text="欢迎使用铭师点睛教学系统!!!!!!!"
    />
    <div class="demo"></div>
    <!--  任务版块-->
     <sidebar>
         任务版块
     </sidebar>
     <div style="display:flex;" >
        <div class="task " @click="$router.push('/about')">
            <img src="../assets/mst/发布任务.png"  width="40" height="40">
            <div>发布任务</div>
        </div>
          
          <div class="task " @click="$router.push('/taskdesk')">
            <img src="../assets/mst/工作台.png"  width="40" height="40">
            <div>工作台</div>
        </div> 
     </div>
     <!-- -->
     <div style="margin:10px 0px;">
          <img src="../assets/mst/胶囊.png" width="100%" height="45" >
     </div>
     
     <!-- 进度版块 -->
     <sidebar>
         进度版块
     </sidebar>
     <div style="display:flex;">
        <div class="task " @click="$router.push('/scheduleLook')" >
            <img src="../assets/mst/进度查看.png"  width="40" height="40">
            <div>进度查看</div>
        </div>
        <div class="task " @click="$router.push('/Audit')" v-show="this.getLocalStorage('identity')=='管理员'">
            <img src="../assets/mst/审核评价.png"  width="40" height="40">
            <div>审核评价</div>
        </div>
     </div>

    <!-- <div class="demo"></div>
    <van-cell title="执行人选择" icon="user-o" is-link>
    
      <template #right-icon>
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu>
      </template>
    </van-cell> -->
    <!-- 工作台 -->

    <!-- 底部选项卡 -->
     <div style="height: 5rem;">
        <van-tabbar v-model="active">
      <van-tabbar-item icon="apps-o" replace to="/">办公</van-tabbar-item>
      <van-tabbar-item icon="orders-o" replace to="/course"
        >课程</van-tabbar-item
      >
      <van-tabbar-item icon="records" replace to="/job">作业</van-tabbar-item>
      <van-tabbar-item icon="manager-o" replace to="/user"
        >我的</van-tabbar-item
      >
    </van-tabbar>
     </div>
    <!-- <van-button type="info" block round @click="login" style="margin-top: 20px"
      >登录</van-button
    > -->
  </div>
</template>
<script>
import sidebar from "../components/sidebar"
import { Toast } from "vant";
export default {
  components:{
      sidebar
  },
  name: "Home",
  data() {
    return {
      searchText: "",
      active: 0,
      show: true,
      actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
      option1: [
        { text: "管理员", value: 18086118288 },
        { text: "老师", value: 13026360512 },
      ],
      token: false,
      value1: "",
     
    };
  },
  methods: {
    //登录按钮
     
    login() {
      if (this.value1 == "") {
        Toast("执行人不能为空");
      } else {
        let data = { mobile: this.value1, type: "vx", password: "123456" };
        this.axios.post("sys/phoneLogin", data).then((res) => {
          let token = res.data.result.token;
          // console.log(res);
          sessionStorage.setItem("token", token);
          Toast("登录成功");
        });
      }
      // this.$router.push("/login")
    },
    //  工作台跳转
    Taskdesk() {
      this.$router.push("/taskdesk");
    },
    userLogin() {
      this.$router.push("/login");
    },
    goCourse() {
      this.$router.push("/course");
    },
  },
  mounted() {
  },
    //  beforeRouteEnter(to,from,next){
    //      next(vm=>{
    //           if(vm.getLocalStorage("identity")=="学生"){
    //                 next("/students")
    //           }else{
    //                 next()
    //           }
    //      })
    // }
};
</script>
 
<style scoped>
/* 任务版块 */
.task{
   text-align:center;
     /* margin-left:15px ;
     margin-top: 15px; */
     margin: 10px 13px;
}
.task>div{
  color: #333;
  font-weight: 550;
  font-size: 13px;
}


.swipeImg {
  width: 100%;
  height: 120px;
}
.blank {
  color: #000;
}
.demo {
  margin-top: 10px;
  margin-bottom: 2px;
  width: 100%;
  height: 15px;
  background-color: #f2f2f2;
}

.cell {
  display: flex;
  align-items: center;
}
.cell img {
  width: 48px;
  height: 48px;
}
.cell h4 {
  font-size: 44px;
}
.tabbar {
  display: flex;
  justify-content: space-around;
}
.daiban,
.tishi,
.rili {
  display: flex;
}
.tabbar img {
  width: 20px;
  height: 20px;
}
</style>
