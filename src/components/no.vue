<template>
    <div>
         <van-nav-bar
        title="工作台"
        left-text="返回"
        left-arrow
        @click-left="$router.go('-1')"

     />
         <van-empty description="此功能还没开放, 敬请期待!!!" />

    </div>
</template>
<script>
export default {
    data(){
         return{
         }
    }
}
</script>
<style scoped>


</style>