<template>
     <div>
    <van-nav-bar title="晚辅" left-text="返回" left-arrow   @click-left="$router.go('-1')">
        <template #right>  </template>
    </van-nav-bar>
    <router-link to="/lateRegister" class="blank">
      <mt-cell title="晚辅登记表" is-link>
        <img slot="icon" src="../../assets/late/晚辅登记表.png" width="24" height="24" />
      </mt-cell>
    </router-link>
    <router-link to="/lateSign" class="blank">
      <mt-cell title="签到表" is-link>
        <img slot="icon" src="../../assets/late/签到表.png" width="24" height="24" />
      </mt-cell>
    </router-link>
    <router-link to="/leteCheck" class="blank">
      <mt-cell title="出勤表" is-link>
        <img slot="icon" src="../../assets/late/出勤表.png" width="24" height="24" />
      </mt-cell>
    </router-link>
    <div @click="$router.push('/lateRatio')">
      <mt-cell title="晚辅比例表" is-link>
        <img slot="icon" src="../../assets/late/晚辅比例表.png" width="24" height="24" />
      </mt-cell>
    </div>
    
    
     </div>
</template>
<script>
export default {
   
}
</script>
<style scoped>
.blank {
  color: #000;
}

</style>