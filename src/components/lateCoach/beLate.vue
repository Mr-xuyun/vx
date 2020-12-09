<template>
    <div>
        <div>
            <van-nav-bar
                title="异动跟进表"
                left-text="返回"
                left-arrow
                @click-left="$router.go('-1')"
            /> 
           <div>
              <table v-if="noArrival.length!=0" >
                  <tr class="parent" v-for="(item,i) of noArrival" :key="i">
                      <td>{{item.student}} <span class="yuan"></span></td>
                      <td>{{item.dueTime}}</td>
                      <td>{{item.teacher}} <img src="../../assets/right.png"></td>
                  </tr>
              </table> 
                  <div style="text-align: center; margin-top: 100px" v-else>
                    <img src="../../assets/job/空白.png" width="100" height="100s" />
                    <div style="color: #666; font-size: 15px">暂无数据!</div>
                  </div>   
           </div>   
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
          noArrival:[],
        }
    },
    mounted(){
            //  let date = new Date()
            //  let data1=date.getDate()>=10 ? date.getDate() : "0"+( date.getDate());
            //   //月份
            //   let day = date.getMonth()+1>=10  ? date.getMonth()+1 : "0" + (date.getMonth()+1);
          //   console.log(data1 ,day);
           const moment = require("moment")
           let now = new Date();
           let data = {
             startDate:  moment(now).format("YYYY-MM-DD") ,
             endDate: moment(now.setDate(now.getDate()+1)).format("YYYY-MM-DD")
          }
         console.log(data);
         this.axios.post("vx/attendance/listByCondition",data).then(res=>{
            console.log(res);
           
              for(let item of res.data.result){
                      if(item.status==1){
                          this.noArrival.push(item)
                      } 
              }
              console.log(this.noArrival);
        })
    }
    
}
</script>
<style scoped>
.yuan{
     display: inline-block;
    width: 8px; height: 8px;
    background-color: chocolate;
    border-radius: 50%;
}
table{
    background-color: #F2F2F2FF;  
    border-radius: 15px;
    margin-top: 15px;
    
}
.parent td{
     width: 150px;
     height: 30px;
     text-align: center;
     color: #707070FF;
}
</style>