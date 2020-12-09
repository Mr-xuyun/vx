<template>
  <div>
    <!-- 导航栏 -->
    <div class="navbar">
      <sidebar style="    padding-bottom: 10px;"> 王虎成长档案库</sidebar>
      <div>
        <router-link to="/suggest">
            <img src="../../assets/student/去建议.png"   width="30" height="30"/>
        </router-link>
        <router-link to="/complaint">
        <img src="../../assets/student/去投诉.png" width="30" height="30" />
         </router-link>
       <router-link to="/notification">
        <img src="../../assets/student/查看通知.png" width="30" height="30" />
         </router-link>

      </div>
    </div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        ><img src="../../assets/student/海报1.png" class="mySwiper"
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../../assets/mst/海报2.jpg" class="mySwiper"
      /></van-swipe-item>
      <van-swipe-item
        ><img src="../../assets/mst/海报3@3x.png" class="mySwiper"
      /></van-swipe-item>
    </van-swipe>
    <!--  通知栏 -->
    <van-notice-bar
      color="#1989fa"
      scrollable
      background="#ecf9ff"
      left-icon="volume-o"
    >
      铭师点睛火热招生中!!!
    </van-notice-bar>
    <van-grid
      :column-num="3"
      style="
        box-shadow: 1px 1px 9px #c8c9cc;
        margin: 10px 10px;
        padding: 10px 10px;
        border-radius: 10px;
      "
    >
      <van-grid-item>
        <div class="task" @click="$router.push('/workLibrarys')">
          <img src="../../assets/student/作业库.png" width="40" height="40" />
          <div>作业库</div>
        </div>
      </van-grid-item>

      <van-grid-item>
        <div class="task" @click="$router.push('/students/difficult')">
          <img src="../../assets/student/疑难库.png" width="40" height="40" />
          <div>疑难库</div>
        </div>
      </van-grid-item>

      <van-grid-item>
        <div class="task" @click="$router.push('/errorLibrary')">
          <img src="../../assets/student/错题库.png" width="40" height="40" />
          <div>错题库</div>
        </div>
      </van-grid-item>

      <van-grid-item>
        <div class="task" @click="$router.push('/notesLibrary')">
          <img src="../../assets/student/笔记库.png" width="40" height="40" />
          <div>笔记库</div>
        </div>
      </van-grid-item>
      <!--  -->
      <van-grid-item>
        <div class="task" @click="$router.push('/testLibrary')">
          <img src="../../assets/student/试卷库.png" width="40" height="40" />
          <div>试卷库</div>
        </div>
      </van-grid-item>
      <!--  成绩库-->
      <van-grid-item>
        <div class="task" @click="$router.push('/performance')">
          <img src="../../assets/student/成绩库.png" width="40" height="40" />
          <div>成绩库</div>
        </div>
      </van-grid-item>
      <!-- 题库 -->
      <van-grid-item>
        <div class="task">
          <img src="../../assets/student/题库.png" width="40" height="40" />
          <div>题库</div>
        </div>
      </van-grid-item>
      <!-- 知识点库 -->
      <van-grid-item>
        <div class="task" >
          <img src="../../assets/student/知识点库.png" width="40" height="40" />
          <div>知识点库</div>
        </div>
      </van-grid-item>
      <!-- 教案库 -->
      <van-grid-item>
        <div class="task">
          <img src="../../assets/student/教案库.png" width="40" height="40" />
          <div>教案库</div>
        </div>
      </van-grid-item>
      <div style="margin: 0 auto; width: 100%">
        <van-button
          round
          block
          color="linear-gradient(to bottom, #1B8FFF,#06B2FF)"
          style="height: 30px; width: 100%"
          @click="$router.push('/reviewLibrary')"
        >
          干货复习中心
        </van-button>   
      </div>
    </van-grid>
    <!--  教学中心 -->
    <div class="parent">
      <div>
        <img src="../../assets/student/教学中心.png" />
      </div>
      <div>
        <img src="../../assets/student/过关统计.png" />
        <img src="../../assets/student/进步报表.png" />
      </div>
      <div>
        <img src="../../assets/student/直播入口.png" />
        <img src="../../assets/student/录播入口.png" />
      </div>
    </div>
    <!-- 底部选项卡 -->
    <div style="margin-top: 55px">
      <van-tabbar v-model="active" inactive-color="#999" active-color="#1B8FFF">
        <van-tabbar-item replace to="/students">
          <span>首页</span>
          <template #icon="props">
            <img :src="props.active ? icon.active : icon.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item  replace to="/upload">
         <div style="    margin-bottom: 7px; text-align: center;"
   >
              <img
              src="../../assets/student/上传3.svg"
               width="34" height="30"
            />
             <div style="    padding-top: 3px; " >上传</div>
           </div>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" replace to="/studentUser" >
          <span >我的</span>
          <template #icon="props">
            <img :src="props.active ? userIcon.active : userIcon.inactive"   />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import sidebar from "../../components/sidebar";
export default {
  components: { sidebar },
  data() {
    return {
      active: 0,
      icon: {
        active: require("../../assets/student/首页-选中.png"),
        inactive: require("../../assets/student/首页-未选中.png"),
      },
      uploadIcon: {
        active: require("../../assets/student/上传2.png"),
        // inactive: require("../../assets/student/上传未选中.png"),
      },
      userIcon: {
        active: require("../../assets/student/我的选中.png"),
        inactive: require("../../assets/student/我的未选中.png"),
      },
      errtypeList: [
        { imgType: "疑难题", subject: "", chapter: "", remark: "" },
        { imgType: "错题", subject: "", chapter: "", remark: "" },
        { imgType: "作业", subject: "", chapter: "", remark: "" },
        { imgType: "试卷", subject: "", chapter: "", remark: "" },
        { imgType: "笔记", subject: "", chapter: "", remark: "" },
      ],
    };
  },
  mounted() {},
};
</script>


<style scoped>
.navbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* 宫格一下的内容 */
.parent {
  margin: 10px 10px;
}
.parent img {
  border-radius: 10px;
}
.parent > div:nth-child(1) > img {
  width: 100%;
  height: 120px;
}
.parent > div:nth-child(2),
.parent > div:nth-child(3) {
  padding: 5px 0px;
  display: flex;
  justify-content: space-around;
}
.parent > div:nth-child(2) > img {
  width: 48%;
  height: 80px;
}
.parent > div:nth-child(3) > img {
  width: 48%;
  height: 50px;
}

.mySwiper {
  width: 100%;
  height: 140px;
}
.task {
  text-align: center;
  /* margin-left:15px ;
     margin-top: 15px; */
}
.task > div {
  color: #666;
  font-weight: 550;
  font-size: 10px;
  margin-top: 5px;
}
</style>
