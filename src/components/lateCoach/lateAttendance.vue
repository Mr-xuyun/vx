<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="出勤表" left-text="返回" left-arrow @click-left="$router.go('-1')">
      <template #right></template>
    </van-nav-bar>
    <!-- 学生 -->
    <div @click="showStudent = true">
      <mt-cell title="学生" is-link>
        <img slot="icon" src="../../assets/course/学生.png" width="20" height="20"/>
        {{ studentName }}
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
    <!-- 日期-->
    <div @click="showDate = true">
      <mt-cell title="日期" is-link>
        <img slot="icon" src="../../assets/job/日期.png" width="20" height="20"/>
          {{ date }}
      </mt-cell>
    </div>
    <van-calendar
        color="#1B8FFF"
        v-model="showDate"
        type="multiple"
        @confirm="onConfirmDate"
        :min-date="minDate"
        :max-date="maxDate"
    />
    <!-- 时间 -->
    <div @click="showTime = true">
      <mt-cell title="应到时间" is-link>
        <img slot="icon" src="../../assets/course/时间.png" width="20" height="20"/>
        {{ time }}
      </mt-cell>
    </div>
    <van-popup v-model="showTime" position="bottom">
      <van-datetime-picker
          type="time"
          @confirm="onConfirmTime"
          @cancel="showTime = false"
      />
    </van-popup>
    <!-- 老师 -->
    <div @click="showTeacher = true">
      <mt-cell title="老师" is-link>
        <img slot="icon" src="../../assets/course/老师.png" width="24" height="24"/>
        {{ teacherName }}
      </mt-cell>
    </div>
    <van-popup v-model="showTeacher" position="bottom">
      <van-picker
          show-toolbar
          :columns="teacherList"
          @confirm="onConfirmTeacher"
          @cancel="showTeacher = false"
      />
    </van-popup>
    <!-- 产品 -->
    <div @click="showProduct = true">
      <mt-cell title="出勤类别" is-link>
        <img slot="icon" src="../../assets/late/出勤类别.png" width="24" height="24"/>
        {{ productName }}
      </mt-cell>
    </div>
    <van-popup v-model="showProduct" position="bottom">
      <van-picker
          show-toolbar
          :columns="productList"
          @confirm="onConfirmProduct"
          @cancel="showProduct = false"
      />
    </van-popup>
    <van-button type="info" :disabled="showBtn" round block style="margin-top:15px;" @click="submit"> 提交</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: '',
      date: this.$store.state.date,
      studentName: "",
      studentId: "",
      productName: "",
      teacherName: '',
      teacherId: '',
      teacherList: [],
      studentList: [],
      productList: [],
      showDate: false,
      showTime: false,
      showStudent: false,
      showTeacher: false,
      showProduct: false,
      showBtn: false
    }
  },
  computed :{
    minDate (){
      return this.getWeekDay()[0];
    },
    maxDate (){
      return this.getWeekDay()[6];
    }
  },
  methods: {
    //   时间
    onConfirmTime(time) {
      this.showTime = false;
      this.time = time;
    },
    onConfirmDate(date) {
      if(date.length>7){
        this.$toast("最多选取7天!");
        return ;
      }
      this.date = "";
      for (let item of date) {
        if (this.date != "") {
          this.date += ",";
        }
        this.date += `${item.getMonth() + 1}-${item.getDate()}`;
      }
      this.showDate = false;
    },
    onConfirmStudent(value) {
      this.showStudent = false;
      this.studentName = value.text;
      this.studentId = value.value;
    },
    onConfirmTeacher(value) {
      this.showTeacher = false;
      this.teacherName = value.text;
      this.teacherId = value.value;
    },
    onConfirmProduct(value) {
      this.showProduct = false
      this.productName = value
    },
    submit(){
      if (this.studentName==null || this.date==null || this.time==null || this.teacherName==null || this.productName==null){
        this.$toast("以上内容不能为空");
        return ;
      }
      this.showBtn = true;
      let data = {
        student : this.studentName,
        studentId : this.studentId,
        dueDate : this.date,
        dueTime : this.time,
        teacher : this.teacherName,
        teacherId : this.teacherId,
        attendanceType : this.productName,
        token :this.getLocalStorage("token")
      }
      this.axios.post("vx/attendance/saveOrUpdate",data).then((res)=>{
        this.$toast("操作成功!");
      })
    },
    getWeekDay() {
      let presentDate = new Date(),
      today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;
      return Array.from(new Array(7), function(val, index) {
        return new Date(presentDate.getTime() - (today - index-1) * 24 * 60 * 60 * 1000);
      })
    }
  },
  mounted() {
    //出勤类别
    this.axios.post("vx/coursePublish/findCategoryByName",{name:"产品"}).then((res)=>{
      let result = res.data.result;
      for(let i of result){
        this.productList.push(i.title);
      }
    })
    //老师
    this.axios.post("vx/task/getAllReceiver",{roleList: ["老师"]}).then((res)=>{
      for (let teacher of res.data.result) {
        let teacherObj = {text: teacher.realname, value: teacher.id}
        this.teacherList.push(teacherObj)
      }
    })
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
.textA{
  width: 200px;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
}
</style>
