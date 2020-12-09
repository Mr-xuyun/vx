<template>
    <div>
     <van-nav-bar
      title="留言记录"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    /> 
          <!--  筛选日期-->
      <div @click="showDate = true">
        <mt-cell title="筛选日期" is-link>
          <img
            slot="icon"
            src="../../assets/job/日期.png"
            width="20"
            height="20"
          />
          {{ date }}
        </mt-cell>
      </div>
      <van-calendar
        color="#1B8FFF"
        v-model="showDate"
        @confirm="onConfirmDate"
        :min-date="minDate"
        :max-date="maxDate"
      />
   <div v-for="(item,i) of leaveMessage " :key="i" > 
        <div class="content" style="background-color: #fff"  @click="unfold(item)">
        <div class="text">
          <div class="time">课程编号{{item.courseNumber}}/{{item.product}}/{{item.student}}/{{item.semester}}</div>
          <div>
            <van-tag type="primary" style="color: #fff">{{item.subject}}</van-tag>
          </div>
        </div>
        <div class="txt">{{item.createDate}}  时间段:{{item.timeRange}}</div>
        <div class="user">
          <div>
            <van-icon name="user-o" />
          </div>
        </div>
      </div>
    <div v-show="item.courseDescId==id"> 
      <div>
      <!-- 进度描述 -->
       <div style="margin-top: 20px">
        <sidebar> 进度描述内容:</sidebar>
        <div style="margin:10px 15px; color:#666; fon  border: 1px solid rgba(102,102,102,0.5);">  
           {{item.courseProcess}}
        </div>
        <div style="color:#1B8FFFFF; font-size:14px; margin-left:12px;"> 我的留言:</div>
          <div class="message" style="margin:10px 15px;">
                {{item.courseProcessA}}
          </div>
      </div>
      </div>
      <!-- 课程内容描述  -->
       <div style="margin-top: 20px">
        <sidebar> 课程内容描述:</sidebar>
        <div style="margin:10px 15px; color:#666; fon  border: 1px solid rgba(102,102,102,0.5);">  
           {{item.content}}
        </div>
        <div style="color:#1B8FFFFF; font-size:14px; margin-left:12px;"> 我的留言:</div>
          <div class="message" style="margin:10px 15px;">
               {{item.contentA}}
          </div>
      </div>
      </div> 
     </div>    
    </div>
</template>
<script>
import sidebar from "../sidebar.vue";
export default {
    components:{sidebar},
     data(){
          return{
             showDate:false,
             date: this.$store.state.date,
              minDate: new Date(2020, 9, 12),
             maxDate: new Date(2050, 9, 31),
              leaveMessage:[],
              id:"-1"
          }
     },
     methods:{
         formatDate(date) {
             const moment = require("moment")
            return  moment(date).format("YYYY-MM-DD");
          },
            onConfirmDate(date) {
                this.showDate = false;
                this.date = this.formatDate(date);
           
            }, 
            unfold(obj){
                if(obj.courseDescId==this.id){
                    this.id= "-1"
                }else{
                   this.id =obj.courseDescId
                }
            },

        message(){
          let data = {
              pageSize :"5",
              pageNo:"1",
              createTime:"2020-11-04",
              token:this.getLocalStorage("token")
           }
           this.axios.post("vx/courseDesc/queryCourseDesc",data).then(res=>{
             //console.log( res.data.result.records);
                for(let item of res.data.result.records){
                      this.leaveMessage.push(item)
                }
                    console.log(this.leaveMessage);
            })
        }
     },
     mounted(){
          this.message()
          
          
     }
}
</script>
<style scoped>
.message{
    background-color: #F2F2F2FF;
    padding: 0px 0px ;
    
    color: #999;
    font-size: 14px;
    line-height: 25px;
   
}

</style>