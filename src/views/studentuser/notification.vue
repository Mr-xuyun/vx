<template>
    <div>
          <van-nav-bar title="通知中心" left-arrow @click-left="$router.go('-1')" />
       <div class="notification">
           <img  src="../../assets/student/通知方形.png" width="45" height="45">
           <div class="news">
               <div>
                 <b>系统通知</b>
                 <span> 2020-08-20 15：35：12</span>       
               </div>
               <div >
                   王虎 10月21日 18:32分已离校
               </div>
           </div>
       </div>
    </div>
</template>

<style scoped>
.notification{
     display: flex;
     padding: 10px 8px;
     border-bottom: 1px solid #F2F2F2;
     
}
.news{
     margin-left: 5px;
}
.news span , .news>div:nth-child(2){
      color: #707070;
      font-size: 13px;
}
.news>div:nth-child(2){
    margin-top:6px;
}
</style>

