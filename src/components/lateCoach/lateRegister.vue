<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="晚辅登记表" left-text="返回" left-arrow @click-left="$router.go('-1')">
      <template #right>
        <img src="../../assets/late/历史记录.png" @click="$router.push('/lateHistory')" width="24" height="24">
      </template>
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
    <!-- '../../assets/job/时间.png' -->
   <div >
      <mt-cell title="时间" is-link>
        <img slot="icon" src="../../assets/job/时间.png" width="20" height="20"/>
           <van-field
              v-model="coachTime"
              rows="1"
              autosize
              type="textarea"
              placeholder="请输入时间"
              input-align="right"
            />
      </mt-cell>
    </div>
  
    <!-- 科目-->
    <div @click="showSubject = true">
      <mt-cell title="科目" is-link>
        <img slot="icon" src="../../assets/job/科目.png" width="20" height="20"/>
        {{ subject }}
      </mt-cell>
    </div>
    <van-popup v-model="showSubject " position="bottom">
      <van-picker
          show-toolbar
          :columns="subjectList"
          @confirm="onConfirmSubject"
          @cancel="showSubject = false"
      />
    </van-popup>
    <!-- 讲解题次 -->
    <div @click=" showNumber = true">
      <mt-cell title="讲解题次" is-link>
        <img slot="icon" src="../../assets/job/备注.png" width="20" height="20"/>
        {{ problemCount }}次
      </mt-cell>
    </div>
    <div class="demo"></div>

    <h4 style="padding:0px 10px;">拍照上传</h4>
    <van-uploader style="padding:0px 10px;" v-model="fileList" multiple/>

    <h4 style="padding:0px 10px;">备注</h4>
    <van-field
        v-model="remarks"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入备注"
    />
    <van-button style="margin-top:10px;" :disabled="btnShow" @click="submit" type="info" block round> 提交</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showStudent: false,
      showSubject: false,
      studentList: [],
      subjectList: [],
      fileList: [],
      remarks: "",
      student: "",
      studentId: "",
      subject: "",
      coachTime: '',
      problemCount: 0,
      btnShow:false,
      id:""
    }
  },
  methods: {
    onConfirmStudent(value) {
        console.log(111);
      if (value.text!=this.student){
        this.problemCount = 0;
      }
    
      this.showStudent = false;
      this.student = value.text;
      this.studentId = value.value;
      this.id = value.id;
    },
    onConfirmSubject(value) {
      this.showSubject = false;
      this.subject = value;
    },
    submit(){
      this.btnShow = true;
      if (this.student=="" || this.remarks=="" || this.fileList=="" || this.coachTime=="" || this.subject==""){
        this.$toast("以上内容不能为空!")
        this.btnShow = false;
        return ;
      }
      let tempFileList = new FormData();
      for (let item of this.fileList) {
        tempFileList.append("file", item.file);
      }
      this.axios.post("sys/common/uploadBatch", tempFileList).then((res) => {
        this.problemCount++;
        let data = {
          token:this.getLocalStorage("token"),
          remarks:this.remarks,
          student:this.student,
          studentId:this.studentId,
          subject:this.subject,
          coachTime:this.coachTime,
          file:res.data.message,
          attendanceId:this.id
        }
        this.axios.post("vx/nightCoach/saveNightCoach",data).then((r)=>{
            this.$toast("操作成功!")
          setTimeout(()=>{
            this.btnShow=false
          },1500);
        })
      })
    }
  },
  mounted() {
    this.axios.post("vx/coursePublish/findCategoryByName",{name:"科目"}).then((res)=>{
      let result = res.data.result;
      for(let i of result){
        this.subjectList.push(i.title);
      }
    })
    let now = new Date();
    let dueDate = now.getMonth() + 1 + "-" + now.getDate();
    let data = {
      dueDate: dueDate,
      status: "2,3",
    }
    this.axios.post("vx/attendance/list", data).then((res) => {
      console.log(res);
      this.listDesc = res.data.result;
      for (let student of this.listDesc) {
        let studentObj = {text: student.student, value: student.studentId, id:student.id}
        this.studentList.push(studentObj)
      }
    })
  }
}
</script>

<style scoped>

</style>
