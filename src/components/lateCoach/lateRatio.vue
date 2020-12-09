<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="晚辅比例表" left-text="返回" left-arrow @click-left="$router.go('-1')">
      <template #right></template>
    </van-nav-bar>
    <!-- 学生 -->
    <div @click="showStudent = true">
      <mt-cell title="选择学生" is-link>
        <img slot="icon" src="../../assets/course/学生.png" width="20" height="20"/>
        {{ student }}
      </mt-cell>
    </div>
    <van-popup v-model="showStudent" position="bottom">
      <van-picker
          show-toolbar
          :columns="studentList"
          @confirm="onConfirmStudent"
          @cancel="showStudent = false"
      />
    </van-popup>
    <!-- 日期区间-->
    <div @click="showDate = true">
      <mt-cell title="选择日期区间" is-link>
        <img slot="icon" src="../../assets/course/日期.png" width="20" height="20"/>
        {{ date }}
      </mt-cell>
    </div>
    <van-calendar v-model="showDate"  :min-date="minDate" color="#1B8FFF" type="range" @confirm="onConfirmDate"/>
   <div v-if="statisticsList.length!=0">
    <div class="parent" v-for="(item,index) of statisticsList" :key="index+200">
      <div style="color:#707070;font-size: 14px;">答疑总时长：<span style="color:#1B8FFF;font-size: 14px; ">{{ item.coachSum }}</span>
      </div>
      <table>
        <tr class="title">
          <th>科目</th>
          <th>耗时比例</th>
          <th>答疑时长</th>
          <th>答疑老师</th>
        </tr>
        <tr class="list">
          <td>{{ item.subject }}
            <van-tag round type="primary">{{ item.coachCount }}</van-tag>
          </td>
          <td>{{ item.percent }}</td>
          <td>{{ item.teacherCoachSum }}</td>
          <td>{{ item.teacher }}</td>
        </tr>
      </table>
    </div>
   </div>
   <div>
      
   </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showStudent: false,
      showDate: false,
      studentList: [],
      statisticsList:[],
      date: "",
      startDate:"",
      endDate:"",
      student: "",
      minDate:new Date('2020/10/1')
    }
  },
  methods: {
    onConfirmStudent(value) {
      this.showStudent = false;
      this.student = value.text;
      if (this.date==""){
        this.$toast("日期不能为空");
        return ;
      }
      let data = {
        student: this.student,
        startDate: this.startDate,
        endDate: this.endDate
      }
      //console.log(data);
      this.axios.post("vx/nightCoach/nightCoachStatistics",data).then((res)=>{
        if(res.data.result.length!=0){
              // console.log(res);
          this.statisticsList = res.data.result;
        }else{
            this.$toast("暂无数据")
        }
      })
    },
    formatDate(date) {
      const moment = require("moment")
      return moment(date).format("MM-DD");
    },
    onConfirmDate(date) {
      const moment = require("moment")
      const [start, end] = date;
      this.showDate = false;
      this.date = `${moment(start).format("MM-DD")} - ${moment(end).format("MM-DD")}`;
      this.startDate = `${moment(start).format("YYYY-MM-DD")}`;
      this.endDate = `${moment(end).format("YYYY-MM-DD")}`;
      this.show = true;
      if (this.student==""){
        this.$toast("请先选择学生");
        return ;
      }
      let data = {
        student: this.student,
        startDate: this.startDate,
        endDate: this.endDate
      }
      console.log(data);
      this.statisticsList=[];
      this.axios.post("vx/nightCoach/nightCoachStatistics",data).then((res)=>{
        console.log(res);
          if(res.data.result.length!=0){
               for(let item of res.data.result){
                   this.statisticsList.push(item)
               } 
          }else{
              this.$toast("暂无数据!")
          }
      })

    },
  },
  mounted() {
    //学生
    this.axios.post("vx/task/getAllReceiver",{roleList: ["学生"]}).then((res)=>{
      for (let student of res.data.result) {
        let studentObj = {text: student.realname, value: student.id}
        this.studentList.push(studentObj)
      }
    })
    
  }
}
</script>

<style scoped>
.parent {
  background-color: #F2F2F2;
  border-radius: 10px;
  padding: 10px 10px;
  box-shadow: 5px 5px 5px #999;
  margin-top: 15px;
}

.title > th {
  font-size: 15px;
  color: #1B8FFF;
  padding-left: 10px;

}

.title th:nth-child(1) {
  padding-left: 0px;
}

.list > td {
  color: #999;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 12px;
}
</style>
