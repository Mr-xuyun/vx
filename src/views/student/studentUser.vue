<template>
  <div>
    <!--   -->
   <div class="header">
      <div class="top">
          <img src="../../assets/tx.jpg"  class="portrait">
          <div >
                <div> 王虎</div>
                <div>学生</div>
          </div>
      </div>   
     
   </div>
    <div style="margin-top: 55px">
      <van-tabbar v-model="active" inactive-color="#999" active-color="#1B8FFF">
        <van-tabbar-item replace to="/students">
          <span>首页</span>
          <template #icon="props">
            <img :src="props.active ? icon.active : icon.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/upload">
          <div style="margin-bottom: 7px; text-align: center">
            <img src="../../assets/student/上传3.svg" width="34" height="30" />
            <div style="padding-top: 3px">上传</div>
          </div>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" replace to="/studentUser">
          <span>我的</span>
          <template #icon="props">
            <img :src="props.active ? userIcon.active : userIcon.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 2,
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
    };
  },
};
</script>
<style  lang="less" scoped>
.top{
  display: flex;
  margin-left: 20px;
  div{
     margin-left: 6px;
    div{
      &:nth-child(1){
            color: #fff;
        }
       &:nth-child(2){
            color: #999;
            opacity: 0.8;
            font-size: 15px;
        }
    }
    
    
  }
}
.header{
    background-color: #1b8fff;
    width: 100%;
    height: 120px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    display: flex;
    align-items: center;
    
}
/* 头像 */
 .portrait{
     width: 45px; height: 45px;
     border-radius: 50%;
      
 }
</style>
