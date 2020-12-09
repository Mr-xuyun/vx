<template>
  <div>
    <van-nav-bar
      title="公示"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <van-tabs v-model="active" swipeable color="#1B8FFFFF">
      <van-tab title="学生情况">
        <!--  日期-->
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
             :min-date="minDate" :max-date="maxDate" 
        />
        <!-- 出勤率 -->
        <div class="play">
          <div style="color: #707070ff; font-size: 14px; padding-left: 15px">
            出勤率
          </div>
          <div style="text-align: center; margin-top: 10px">
            <van-circle
              v-model="currentRate"
              :rate="attendance"
              :speed="100"
              :text="text"
           

            />
          </div>
        </div>
        <!-- 科目 -->
        <van-tabs color="#1B8FFFFF" v-model="subject" swipeable>
          <div v-if="subjectList.length!=0" >
          <van-tab :title="item.subject" v-for="(item,i) of subjectList" :key="i">
            <div>
              <div class="play" style="height: 125px;">
                <div style="display:flex;">
                  <div>
                    <div style="color: #707070ff; font-size: 14px; padding:15px 15px;"> 作业完成率</div>
                    <van-circle
                    v-model="currentRateaccomplish"
                    :rate="item.finished/item.total*100"
                    :speed="100"
                    :text="`${parseInt(item.finished/item.total*100)}%`"
                    size="75px"
                    color="#2FC25BFF"
                  />
                  </div>
                    <div>
                    <div style="color: #707070ff; font-size: 14px; padding:15px 15px;"> 作业准确率</div>
                    <van-circle
                    v-model="currentRateaccuracy"
                    :rate="item.error/item.total*100"
                    :speed="100"
                    :text="`${parseInt(item.error/item.total*100)}%`"
                    size="75px"
                    color="#2748B1FF"
                  />
                  </div>
                    <div>
                    <div style="color: #707070ff; font-size: 14px; padding:15px 15px;"> 问题解决率</div>
                    <van-circle
                    v-model="currentRateissue"
                    :rate="item.answer/item.difficulty*100"
                    :speed="100"
                    :text="`${parseInt(item.answer/item.difficulty*100)}%`"
                     size="75px"
                     color="#FF9D3BFF"
                  />
                  </div>
                </div>
              </div>
            </div>
            <div style="display:flex;">
             <my-echarts  :answers="item.answer"           
                   :difficultys="item.difficulty"
                ></my-echarts> 
                <!--  -->
            </div>
          </van-tab>
          </div>
          <div v-else>
               
                <van-empty description=" 该日期暂无学生数据" />
          </div>
        </van-tabs>
      </van-tab>
      <van-tab title="薄弱点列表">
         <div style="margin-top:15px;">
                  <div class="tableClass1" style=" display: flex;">
            <div>科目</div>
            <div>章节</div>
            <div>问题类别</div>
            <div>处理建议</div>
        </div>
         
        <div class="tableClass" style=" display: flex;">
            <div>数学</div>
            <div>三角函数...asdasdasd</div>
            <div>知识理解</div>
            <div>上课</div>
        </div>
         </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import myEcharts from "../myEcharts.vue";
export default {
  components: {   
 myEcharts  
},  
  data() {
    return {
      active: 0,
      date: "",
      showDate: false,
      currentRate: 0,
       currentRateaccomplish:0,//出勤率
        currentRateaccuracy :0,
        currentRateissue :0,
      day:"",
      attendance :0,//出勤率
      subject: 0,
      accomplish : 10 ,//完成率
      accuracy: 0 ,// 准确率
      issue :0 ,//问题率
      countByMonth : {},  //出勤率,
      subjectList :[],
       minDate: new Date(2020, 9, 12),
      maxDate: new Date(2050, 9, 31),
    };  
  },
  computed: {
    //出勤率
    text() {
      
      let attendance  =  parseInt(this.countByMonth.inTimeCount /this.countByMonth.sum*100)
      return   attendance +"%" ;
    },
  },
  methods: {
    formatDate(date) {
       let moment = require("moment");
       
      return moment(date).format("YYYY-MM-DD")
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
       this.subjectList=[];
       this.attendanceRate();
    },
    attendanceRate(){
       
      let data ={
         token :this.getLocalStorage("token"),
         date :  this.date.slice(5,7), //月份
         day : this.date // 具体时间
      }
             this.$toast.loading({
                    message: '加载中...',
                   duration :0,
                   closeOnClick :true,
                });
       this.axios.post("vx/attendance/queryCountByMonth ",data).then(res=>{
           if(res.data.success){
              this.countByMonth= res.data.result.countByMonth
              this.attendance = parseInt(this.countByMonth.inTimeCount /this.countByMonth.sum*100)
              
              for(let item of  res.data.result.homeworkList){
                    this.subjectList.push(item)
              }
                this.$toast.clear()
                    console.log(res);
           }else{
                this.$toast("查询失败")
           }
          
                  
       })
    }
  },
  mounted(){
    
     this.date = this.$store.state.date;
      let data ={
         token :this.getLocalStorage("token"),
         date :  this.date.slice(5,7), //月份
         day : this.date // 具体时间
      }
       this.axios.post("vx/attendance/queryCountByMonth ",data).then(res=>{
         console.log(res);
            this.countByMonth= res.data.result.countByMonth
            this.attendance = parseInt(this.countByMonth.inTimeCount /this.countByMonth.sum*100)
            
            for(let item of  res.data.result.homeworkList){
                  this.subjectList.push(item)
            }
                  // console.log(this.countByMonth);
       })
  }
};
</script>
<style scoped>
.play {
  position: relative;
  height: 150px;
  border-radius: 10px;
  box-shadow: 1px 1px 4px #999;
  margin: 10px 10px;
}
.tableClass{
   display: flex;
   justify-content: space-around;
   background-color: #F2F2F2FF;
}
.tableClass1{
   display: flex;
   justify-content: space-around;
   background-color: #D8D8D8FF;
}
.tableClass div{
  width: 80px;
  text-align: center;
     color: #999;
     font-size: 15px;
     overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>