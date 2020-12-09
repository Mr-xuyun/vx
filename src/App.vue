<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
      
}
</script>
<style >
/* /* 微信日历兼容问题 */ 
#app .van-calendar__day--end{
   background-color: #1b8fff;
}
#app .van-calendar__day--start{
   background-color: #1b8fff;
}
#app  .van-calendar__day--middle{
  color:  #1b8fff;
}
 #app  .van-button--danger{
   background-color: #1b8fff;
    border: 1px solid#1b8fff;
}
#app .removeBtn{
      background-color: #ee0a24;
    border: 1px solid #ee0a24;
     border-radius: 8px;;
         height: 100%;
   
}
</style>
