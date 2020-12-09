<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="一日记录"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    >
      <template #right> </template>
    </van-nav-bar>
        <!-- 学生 -->
    <div @click="showStudent = true">
      <mt-cell title="学生" is-link>
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
      <mt-cell title="日期" is-link>
        <img slot="icon" src="../../assets/course/日期.png" width="20" height="20"/>
        {{ date }}
      </mt-cell>
    </div>
    <van-calendar v-model="showDate"  :min-date="minDate" color="#1B8FFF" @confirm="onConfirmDate"/>
        <!-- 科目 -->
    <div @click="showPicker = true">
      <mt-cell title="科目" is-link>
        <img slot="icon" src="../../assets/course/科目.png" width="24" height="24"/>
        {{ subject }}
      </mt-cell>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
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
          :columns="teacher"
          @confirm="onConfirmTeacher"
          @cancel="showTeacher = false"
      />
    </van-popup>
    <!--   -->
      <div style="margin-top:15px;">
           <van-tag v-if="showTags" closeable size="medium" type="primary" color="#ccc" style="margin-left:15px;" @close=" showTags = false; student=''">
          {{student}}
        </van-tag>
            <van-tag v-if="showTagdate" closeable size="medium" type="primary" color="#ccc" style="margin-left:15px;" @close="showTagdate=false; date=''">
            {{date}}
          </van-tag>
          <van-tag v-if="showTagSubject" closeable size="medium" type="primary" color="#ccc" style="margin-left:15px;" @close="showTagSubject=false;  subject=''">
            {{subject}}
          </van-tag>
          <!--  -->
            <van-tag v-if="showTagTeacher" closeable size="medium" type="primary" color="#ccc" style="margin-left:15px;" @close="showTagTeacher=false; teacherName=''">
            {{teacherName}}
          </van-tag>
      </div>
    <div v-if="listDay.length!=0">
    <div class="listDay" v-for="(item,i) of listDay " :key="i">
      <table  style="margin:0 auto;">
        <tr class="tableStyle">
          <td>学生：<span>{{student}}</span></td>
          <td>日期：<span>{{date}}</span></td>
          <td>
            <van-tag
              round
              color="#1B8FFFFF"
              style="color: #fff; opacity: 1; margin-left: 10px"
              >{{subject}}</van-tag
            >
          </td>
        </tr>
        <tr class="tableStyle">
          <td>到校时间：<span>{{item.actual_time}}</span></td>
          <td colspan="2">离校时间：<span>{{item.leave_time}}</span></td>
        </tr>
        <tr class="tableStyle">
          <td>答疑次数：<span>{{item.coachCount}}次</span></td>
          <td colspan="2">答疑老师：<span>{{teacherName}}</span></td>
        </tr>
      </table>
    </div>
      </div>
    <div v-else>
         <van-empty description="暂无数据" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showTags: false,
      showTagdate:false,
      showStudent:false,
      showTagTeacher:false,
      showTagSubject:false,
      showDate:false,
      columns: [],//科目的列表
      showPicker: false,
       teacherName: "", //老师,
        showTeacher: false,
         teacher: [ ],
      subject: "", //科目
      studentList:[],
      activeIndex: 0,
      student:"",
      minDate:new Date("2020/10/1"),
      date:"",
       studentId:"",
      teacherId:"",
      listDay:[]
     
    };
  },
  methods: {
    //   科目
    onConfirm(value) {
        console.log(value);
      this.subject = value
      this.showPicker = false;
      this.showTagSubject=true;
         this.save();
    },
      // 老师
    onConfirmTeacher(name) {
      this.teacherName = name.text;
      this.teacherId = name.value
      this.showTeacher = false
      this.showTagTeacher=true
      this.save();
    },
    onConfirmStudent(value) {
        console.log(value);
        this.showStudent = false;
        this.student = value.text
        this.studentId = value.value
        this.showTags=true
        this.save();

     },
    formatDate(date) {
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
      this.showTagdate=true
       this.save();
    },
    save(){
          this.listDay=[];
           let data = {
                    teacherId:this.teacherId,
                    studentId: this.studentId,
                    dueDate: this.date,
                    subject: this.subject
                }
               console.log(data);
               let state = false
               this.axios.post("vx/nightCoach/queryOneDayRecord",data).then(res=>{
                     console.log(res);
                      for(let item of res.data.result){
                             this.listDay.push(item)
                      }
               })
               console.log(this.listDay);
      
    }
    
  },
  mounted(){
     
       //学生
    this.axios.post("vx/task/getAllReceiver", {roleList: ["学生"]}).then((res => {
       // console.log(res);
      for (let student of res.data.result) {
         let studentObj = {text: student.realname, value: student.id}
        this.studentList.push(studentObj)
      }
    }))
        // 老师
    this.axios.post("vx/task/getAllReceiver", {roleList: ["老师"]}).then((res => {
      console.log(res);
      for (let teacher of res.data.result) {
        let obj = {text: teacher.realname, value: teacher.id}
        this.teacher.push(obj)

      }
    }))
      //科目
    this.axios.post("vx/coursePublish/findCategoryByName", {name: "科目"}).then((res => {
      for (let subject of res.data.result) {
        this.columns.push(subject.title)
      }
    }))
  }
};
</script>
<style scoped>
.tableStyle span {
  color: #707070ff;
  font-size: 13px;
  opacity: 0.5;
}
.tableStyle td {
  font-weight: bold;
  font-size: 15px;
  padding: 5px 5px;
}
.listDay {
  margin-top: 10px;
  padding: 10px 10px;
  box-shadow: 5px 5px 5px #666;
  border-radius: 10px;
}
</style>