<template>
  <div>
    <van-nav-bar
      title="铭师通"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <img src="../../assets/course/铭师通海报.png" class="mstImg" />
    <div class="tabbar">
      <router-link to="/mstCourse">
        <img src="../../assets//course/课程通知.png" width="40" height="40" />
        <div style="font-size: 13px; color: #666">课程通知</div>
      </router-link>
      <router-link to="/mstAssessment">
        <img src="../../assets//course/课堂评价.png" width="40" height="40" />
        <div style="font-size: 13px; color: #666">课堂评价</div>
      </router-link>
      <router-link to="/mstAnalyse">
        <img src="../../assets//course/学情分析.png" width="40" height="40" />
        <div style="font-size: 13px; color: #666">学情分析</div>
      </router-link>
      <router-link to="/mstPublicity">
        <img src="../../assets//mst/公示.png" width="40" height="40" />
        <div style="font-size: 13px; color: #666">公示</div>
      </router-link>
      <router-link to="/mstStatistics">
        <img src="../../assets//mst/统计.png" width="40" height="40" />
        <div style="font-size: 13px; color: #666">统计</div>
      </router-link>
    </div>
    <div>
         <img src="../../assets/msdj.png" class="msdj" >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.mstImg {
  width: 100%;
  height: 150px;
 
}
.msdj{
    margin-top: 20px;
     width: 100%;
    height: 350px;
}
.tabbar{
    display: flex; 
    justify-content: space-around; 
    text-align: center;
    margin-top: 15px;
}
</style>