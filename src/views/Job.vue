<template>
  <div class="home">
    <top></top>
    <!-- //搜索框 -->
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
      style="margin-top: 15px"
    >
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
    <!--  -->
    <div
      style="
        display: flex;
        justify-content: center;
        border: 13px solid #f2f2f2ff;
      "
    >
      <div @click="$router.push('/leteCheck')">
        <img src="../assets/mst/出勤表.png" width="140" height="150" />
      </div>

      <div @click="$router.push('/lateSign')">
        <img src="../assets/late/签到.png" width="140" height="150" />
      </div>
    </div>
    <!--  -->

    <!-- <div>
       <router-link to="/lateRatio" class="blank">
      <mt-cell title="晚辅比例表" is-link>
        <img slot="icon" src="../assets/mst/晚辅比例表.png" width="24" height="24" />
      </mt-cell>
    </router-link>
    </div> -->

    <!-- 晚辅登记 -->
    <!--  -->
    <!-- <div >
    <div >
         <sidebar > 晚辅登记</sidebar>
       <div style="display:flex;justify-content: center;   " >
        <div class="task " @click="$router.push('/workRegister')">
            <img src="../assets/mst/作业登记表.png"  width="40" height="40">
            <div>作业登记表</div>
        </div>
          <div class="task " @click="$router.push('/workErr')">
            <img src="../assets/mst/错题疑难题登记.png"  width="40" height="40">
            <div>疑难错题登记</div>
        </div> 
         <div class="task " @click="$router.push('/workWeakness')">
            <img src="../assets/mst/薄弱点登记表.png"  width="40" height="40">
            <div>薄弱点登记表</div>
        </div> 
         <div class="task " @click="$router.push('/workPerformance')">
            <img src="../assets/mst/完成情况统计表.png"  width="40" height="40">
            <div>完成情况登记表</div>
        </div> 
     </div>
    <div style="display:flex;justify-content: center; " >
        <div class="task " @click="$router.push('/workWeakness')">
            <img src="../assets/late/薄弱点登记表.png"  width="40" height="40">
            <div>薄弱点登记表</div>
        </div>
          <div class="task " @click="$router.push('')">
            <img src="../assets/late/答疑登记.png"  width="40" height="40">
            <div>答疑登记表</div>
        </div> 
          <div class="task " @click="$router.push('')">
            <img src="../assets/late/交作业.png"  width="40" height="40">
            <div>交作业</div>
        </div> 
        <div style="width:60px; height:56.8px; margin:10px 13px;">

        </div>
       
     </div>
    </div>
    </div>     -->
    <div>
      <sidebar> 晚辅登记</sidebar>
      <van-grid :column-num="4" :border="false">
        <van-grid-item>
          <div class="task" @click="$router.push('/workRegister')">
            <img src="../assets/mst/作业登记表.png" width="40" height="40" />
            <div>作业登记</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="task" @click="$router.push('/workLibrary')">
            <img src="../assets/late/作业库.png" width="40" height="40" />
            <div>作业库</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="task" @click="$router.push('workLabel')">
            <img src="../assets/late/作业标注.png" width="40" height="40" />
            <div>作业标注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="task" @click="$router.push('/workQuestions')">
            <img src="../assets/late/答疑登记.png" width="40" height="40" />
            <div>答疑登记</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="task" @click="$router.push('/workWeakness')">
            <img src="../assets/late/薄弱点登记.png" width="40" height="40" />
            <div>薄弱点登记</div>
          </div>
        </van-grid-item>
             <van-grid-item>
          <div class="task" @click="$router.push('/workErr')">
            <img src="../assets/late/疑难错题登记.png" width="40" height="40" />
            <div>疑难错题登记</div>
          </div>
        </van-grid-item>
           <van-grid-item>
          <div class="task" @click="$router.push('/workPerformance')">
            <img src="../assets/late/交作业.png" width="40" height="40" />
            <div>交作业</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div>
      <router-link to="/lateRatio" class="blank">
        <mt-cell title="晚辅分析" is-link>
          <img
            slot="icon"
            src="../assets/mst/晚辅比例表.png"
            width="24"
            height="24"
          />
        </mt-cell>
      </router-link>
    </div>

    <div style="margin-top: 80px">
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
  </div>
</template>
<script>
import sidebar from "../components/sidebar.vue";
import top from "../components/top.vue";
export default {
  components: { top, sidebar },
  data() {
    return {
      searchText: "",
      active: 2,
    };
  },
  mounted() {
    this.active = 2;
  },
};
</script>
<style scoped>
/* 学生版块 */
/* .studentflot{
    position: absolute;
    top: 0;
    z-index: 0;
} */

.task {
  text-align: center;
  /* margin-left:15px ;
     margin-top: 15px; */
}
.task > div {
  color: #666;
  font-weight: 550;
  font-size: 10px;
    margin-top: 5px ;
}
.swipeImg {
  width: 100%;
  height: 110px;
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
</style>
<style >
.van-grid-item__content {
  padding: 16px 6px;
}
</style>