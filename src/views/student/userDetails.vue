<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
       <mt-cell title="头像" is-link>
             <img src="../../assets/tx.jpg"  class="portrait">
       </mt-cell>
        <mt-cell title="真实姓名" is-link>
             {{studentName}}
       </mt-cell>
        <mt-cell title="微信授权" is-link>
             <span>去授权</span>
       </mt-cell>
        <mt-cell title="学期段" is-link>
            {{classTime}}
       </mt-cell>
         <mt-cell title="昵称" is-link>
              {{nickname}}
       </mt-cell>
  </div>
</template>
<script>
export default {
  data() {
    return {
        studentName:'',
        classTime:"" ,//学期段
        nickname:"",//昵称
    };
  },
};
</script>
<style lang="less" scoped>
/* 头像 */
.portrait {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
</style>
