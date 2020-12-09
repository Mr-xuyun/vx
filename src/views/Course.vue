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
    <!--  -->
    <div style="  border: 13px solid #F2F2F2FF;border-radius: 10px; margin-top:10px;"
        v-if="this.getLocalStorage('identity')=='管理员'" >
         <sidebar > 任务版块</sidebar>
       <div style="display:flex;justify-content: space-around;   " >
        <div class="task " @click="$router.push('/cissue')">
            <img src="../assets/mst/课程发布.png"  width="40" height="40">
            <div>课程发布</div>
        </div>
        
          <div class="task " @click="$router.push('/coursematerial')">
            <img src="../assets/mst/课程资料发布.png"  width="40" height="40">
            <div>课程资料发布</div>
        </div> 
         <div class="task " @click="$router.push('no')">
            <img src="../assets/mst/课表统计.png"  width="40" height="40">
            <div>课表统计</div>
        </div> 
         <div class="task " @click="$router.push('no')">
            <img src="../assets/mst/查看留言.png"  width="40" height="40">
            <div>查看留言</div>
        </div> 
     </div>
     <!-- 老师就显示只显示课程发布 -->
    </div>
     <div style="  border: 13px solid #F2F2F2FF;border-radius: 10px; margin-top:10px;"
     v-else>
        <sidebar > 任务版块</sidebar> 
              <div class="task "   >
            <img @click="$router.push('/coursematerial')" src="../assets/mst/课程资料发布.png"  width="40" height="40">
            <div>课程资料发布</div>
           </div>
     </div>
    <!-- 工作台 -->
    <div style="display:flex; justify-content: space-around; margin-top:15px;"
     v-show="this.getLocalStorage('identity')=='管理员'">
        <div style="text-align:center; ">
             <div @click="$router.push('/courseBench')"> <img src="../assets/mst/工作台2.png" width="140"  height="140"></div>
             <div  @click="$router.push('/courseSchedule')" style="margin-top:12px;"><img src="../assets/mst/进度查看2.png" width="150" height="65" ></div>
        </div>

        <div style="text-align:center;">
             <div @click="$router.push('/mst')"> <img src="../assets/mst/铭师通.png" width="140"  height="140"></div>
             <div @click="$router.push('/audit')" style="margin-top:12px;"><img src="../assets/mst/审核评价2.png" width="150" height="65" ></div>
        </div>
    </div>
    <!--  -->
    <div style="display:flex; justify-content: space-around; margin-top:15px;" 
    v-show="this.getLocalStorage('identity')=='老师'" >
        <div style="text-align:center; ">
             <div @click="$router.push('/courseBench')"> <img src="../assets/mst/工作台2.png" width="140"  height="150"></div>
            
        </div>
        <div style="text-align:center;">
          <div  @click="$router.push('/courseSchedule')" style="margin-top:12px;"><img src="../assets/mst/进度查看2.png" width="150" height="65" ></div>
             <div @click="$router.push('/audit')" style="margin-top:12px;"><img src="../assets/mst/审核评价2.png" width="150" height="65" ></div>
        </div>
    </div>
    <!-- 底部选项卡 -->
   <van-tabbar v-model="active">
      <van-tabbar-item icon="apps-o" replace to="/">办公</van-tabbar-item>
      <van-tabbar-item icon="orders-o" replace to="/course" >课程</van-tabbar-item>
      <van-tabbar-item icon="records" replace to="/job">作业</van-tabbar-item>
      <van-tabbar-item icon="manager-o" replace to="/user" >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import sidebar from "../components/sidebar.vue"
import { Toast } from 'vant';

export default {
  components:{ sidebar},
  name: "Home",
  data() {
    return {
      searchText: "",
      active: 0,
    };
  },
  methods: {
    //登录按钮
     login(){
            // if(this.value1==""){
            //     Toast('执行人不能为空'); 
            // }else{
            //     let data ={mobile: this.value1,type:"vx",password:"123456"}
            //     this.axios.post("sys/phoneLogin",data).then((res)=>{
            //             Toast('登录成功'); 
                  
            //   })   
            // }
            this.$router.push("/login")
       },
      //  工作台跳转
      Taskdesk(){
          this.$router.push('/taskdesk')
      },
      userLogin(){
           this.$router.push("/login")
      },
      
  },
  mounted() {
         this.active=1
               
  },
};

</script>
 
<style scoped>
.task{

   text-align:center;
     /* margin-left:15px ;
     margin-top: 15px; */
     margin: 10px 13px;
}
.task>div{
 
  color: #666;
  font-weight: 550;
  font-size: 10px;
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
