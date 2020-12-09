<template>
    <div>
      <van-nav-bar
        title="课程列表"
        left-text="返回"
        left-arrow
        @click-left="$router.go('-1')"
        />
        <router-link to="/courselist" class="blank" >
      <mt-cell title="课程列表" is-link >
        <img slot="icon" src="../assets/course/课程列表.png" width="24" height="24" />
      </mt-cell>
    </router-link>
    <router-link to="/jobAssgin" class="blank">
      <mt-cell title="布置作业" is-link>
        <img slot="icon" src="../assets/course/布置作业.png" width="24" height="24" />
      </mt-cell>
    </router-link>
    <router-link to="/jobExamine" class="blank">
      <mt-cell title="查看作业" is-link>
        <img slot="icon" src="../assets/course/查看作业.png" width="24" height="24" />
      </mt-cell>
    </router-link>
    <router-link to="/jobSubmit" class="blank">
      <mt-cell title="提交作业" is-link>
        <img slot="icon" src="../assets/course/提交作业.png" width="24" height="24" />
      </mt-cell>
    </router-link>
     <router-link to="/jobCheck" class="blank">
      <mt-cell title="评改作业" is-link>
        <img slot="icon" src="../assets/course/评改作业.png" width="24" height="24" />
      </mt-cell>
    </router-link>
    </div>
</template>
<script>
export default {
     data(){
         return{
             
         }
     },
     mounted(){
       console.log(1111);
     }
}
</script>
<style scoped>
.blank {
  color: #000;
}
</style>