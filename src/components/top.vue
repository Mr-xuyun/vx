<template>
    <div>
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
    </div>
</template>
<script>
export default {
      data(){
          return{
              searchText:""
          }
      }

}
</script>
<style scoped>
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