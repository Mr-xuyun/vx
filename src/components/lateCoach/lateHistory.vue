<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="晚辅历史记录" left-text="返回" left-arrow @click-left="$router.go('-1')">
      <template #right>
              <img src="../../assets/联合.png" width="20px" height="18px" @click="showActions=true">
      </template>
    </van-nav-bar>
    <div>
       <van-action-sheet
          v-model="showActions"
          :actions="actions"
          cancel-text="取消"
          close-on-click-action
          @select="onSelect"
        />
      <div style="color:#787878; font-size:14px;">本月辅导总时长：</div>
    </div>
    <div class="yuan">
      <van-circle
          :clockwise="false"
          v-model="currentRate"
          :rate="rate"
          :speed="1000"
          :color="gradientColor"
          :text="text"
      />
    </div>
    <div class="parent">
      <div @click="showStudent=true">
        <span style="color:#787878; font-size:14px;">学生</span>
        <img src="../../assets/down.png" alt="">
        <div style="color:#787878; font-size:12px;">{{ student }}</div>
      </div>
      <div @click="showDate=true">
        <span style="color:#787878; font-size:14px;">日期</span>
        <img src="../../assets/down.png" alt="">
        <div style="color:#787878; font-size:12px;">{{ date }}</div>
      </div>
      <div @click="showSubject = true">
        <span style="color:#787878; font-size:14px;">科目</span>
        <img src="../../assets/down.png" alt="">
        <div style="color:#787878; font-size:12px;">{{ subject }}</div>
      </div>
      <div @click="showTeacher=true" v-has-permission="['管理员']">
        <span style="color:#787878; font-size:14px;">老师</span>
        <img src="../../assets/down.png" alt="">
        <div style="color:#787878; font-size:12px;">{{ teacher }}</div>
      </div>
      <van-button round text="查询" @click="submit"></van-button>
    </div>
    <div class="list">
      <div >
        <mt-cell title="学生">
          <img slot="icon" src="../../assets/course/学生.png" width="20" height="20"/>
          <span style="font-size:14px"> {{ student }}</span>
        </mt-cell>
      </div>
      <!-- 辅导的时长 -->
      <div >
        <mt-cell title="辅导时长">
          <img slot="icon" src="../../assets/course/时间.png" width="20" height="20"/>
          <span style="font-size:14px"> {{ coachCount }}分钟</span>
        </mt-cell>
      </div>
      <!--  科目 -->
      <div>
        <mt-cell title="科目">
          <img slot="icon" src="../../assets/course/科目.png" width="20" height="20"/>
          <span style="font-size:14px"> {{ subject }}</span>
        </mt-cell>
      </div>
      <!--  讲解次数 -->
      <div >
        <mt-cell title="讲解题次">
          <img slot="icon" src="../../assets/late/讲解题次.png" width="20" height="20"/>
          <span style="font-size:14px"> {{ count }}次</span>
        </mt-cell>
      </div>
      <!-- 日期 -->
      <div >
        <mt-cell title="日期">
          <img slot="icon" src="../../assets/late/日期.png" width="20" height="20"/>
          <span style="font-size:14px"> {{ date }}</span>
        </mt-cell>
      </div>
    </div>
    <div v-for="item of history" :key="item.sbject">
      <div style="margin-left:10px">
        <h4> {{ item.createTime }}</h4>
        <img-preview
            :file="item.file"></img-preview>
      </div>
      <div style="margin-left:10px">
        <h4> 备注</h4>
        <van-field
            v-model="item.remarks"
            rows="1"
            autosize
            readonly
            type="textarea"
        />
      </div>
    </div>

    <van-calendar v-model="show" @confirm="onConfirm"/>
    <!-- 科目的弹出框 -->
    <van-popup v-model="showSubject " position="bottom">
      <van-picker
          show-toolbar
          :columns="subjectList"
          @confirm="onConfirmSubject"
          @cancel="showSubject = false"
      />
    </van-popup>

    <van-popup v-model="showTeacher" position="bottom">
      <van-picker
          show-toolbar
          :columns="teacherList"
          @confirm="onConfirmTeacher"
          @cancel="showTeacher = false"
      />
    </van-popup>

    <van-popup v-model="showStudent" position="bottom">
      <van-picker
          show-toolbar
          :columns="studentList"
          @confirm="onConfirmStudent"
          @cancel="showStudent = false"
      />
    </van-popup>

    <van-calendar
        color="#1B8FFF"
        v-model="showDate"
        @confirm="onConfirmDate"
    />

  </div>

</template>
<script>
import imgPreview from "../../views/util/imgPreview"

export default {
  components: {imgPreview},
  data() {
    return {
      show: false,
      showActions:false,
      actions: [
        { name: '一日记录' },
        { name: '统计项' },
      ],
      currentRate: 700,
      rate: 0,
      gradientColor: {
        '0%': '#AACEFF',
        '100%': '#0B8FFF',
      },
      message: "",//备注
      teacherList: [],
      studentList: [],
      subjectList: [],
      history:[],
      student: "",
      studentId: "",
      teacher: '',
      teacherId: '',
      date: '',
      subject: "",
      showStudent: false,
      showTeacher: false,
      showSubject: false,
      showDate: false,
      coachCount: 0,
      count: 0,
      coachTime:""
    }
  },
  computed: {
    text() {
         return  this.coachTime  ;
    },
  },
  methods: {
    onSelect(value){
         if(value.name=="一日记录"){
              this.$router.push("/lateDay")
         }else{
            this.$router.push("/lateStatistics")
         }
    },
    formatDate(date) {
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.option2[0].text = this.formatDate(date);

    },
    onConfirmSubject(value) {
      this.showSubject = false;
      this.subject = value;
    },
    onConfirmStudent(value) {
      this.showStudent = false;
      this.student = value.text;
      this.studentId = value.value;
    },
    onConfirmTeacher(value) {
      this.showTeacher = false;
      this.teacher = value.text;
      this.teacherId = value.value;
    },
    onConfirmDate(date) {
      this.date = `${date.getMonth() + 1}-${date.getDate()}`;
      this.showDate = false;
    },
    submit() {
      this.count = 0;
      this.coachCount = 0;
      let data = {
        token:this.getLocalStorage("token"),
        dueDate: this.date,
        teacherId: this.teacherId,
        studentId: this.studentId,
        subject: this.subject
      }
      if(this.getLocalStorage("token")==null){
            this.$toast("请先登录才能查询")
            return ;
      }
      this.axios.post("vx/nightCoach/queryByCondition", data).then((res) => {
    console.log(res);
         if(res.data.result.coachTime!=null){
              this.coachTime = res.data.result.coachTime;
                this.rate = parseInt(this.coachTime.slice(0,-2))/600*100
                console.log( this.rate);
              let history = res.data.result.history;
              this.history = history;
              for (let i of history) {
                this.coachCount += parseInt(i.coachTime);
                this.count++;
              }  
         }else{
            this.$toast("暂无数据")
         }
        
      
      })
    }
  },
  mounted() {
    this.axios.post("vx/coursePublish/findCategoryByName", {name: "科目"}).then((res => {
      for (let subject of res.data.result) {
        this.subjectList.push(subject.title)
      }
    }))
    //学生
    this.axios.post("vx/task/getAllReceiver", {roleList: ["学生"]}).then((res => {
      for (let student of res.data.result) {
        let studentObj = {text: student.realname, value: student.id}
        this.studentList.push(studentObj)
      }
    }))
    //老师
    this.axios.post("vx/task/getAllReceiver", {roleList: ["老师"]}).then((res => {
      for (let teacher of res.data.result) {
        let teacherObj = {text: teacher.realname, value: teacher.id}
        this.teacherList.push(teacherObj)
      }
    }))
     this.axios.post("vx/nightCoach/list",{token:this.getLocalStorage("token")}).then((res)=>{
       console.log(res);
        this.currentRate = res.data.result;
      })
  }
}
</script>
<style scoped>
.yuan {
  margin-left: 35%;
  margin-top: 10px;
}

.parent {
  display: flex;
  justify-content: space-around;
}

.list {
  border: 10px solid #F2F2F2;
}
</style>
<style>
/* .van-circle{
      top: 10px;
     left: 35%;
} */
</style>
