<template>
  <div>
    <van-nav-bar title="签到表" left-text="返回" left-arrow @click-left="$router.go('-1')">
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
    <div class="date"> {{ date | date }}</div>

    <van-swipe @change="onChange">
      <van-swipe-item :loop="false">
        <div style="text-align:center">
          <img :src="src1" :class="[src1==require('../../assets/late/到校点击后.png')?'img-readonly':'']"  @click="goSchool()" width="150" height="150" alt="">
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div style="text-align:center">
          <img :src="src2" :class="[src2==require('../../assets/late/离校点击后.png')?'img-readonly':'']" @click="leaveSchool()" width="150" height="150" alt="">
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="parent" >
      <div class="student" @click="showClass=true">
        <span>当日未到校学生：</span>
        <img src="../../assets/right.png" width="16" height="16">
      </div>
      <router-link :to="{path:`/lateExplain?studentName=${ind.text}`}" v-for="ind of studentList" :key="ind.value" >{{ ind.status=="1"?ind.text:"" }}</router-link>
    </div>
    <!--  -->
    <div style="margin-left:10px;">
      <h4>上传文件</h4>
      <van-uploader v-model="fileList" multiple />
      <h4>备注:</h4>
      <van-field
          v-model="attendanceRemarks"
          rows="1"
          autosize
          type="textarea"
          placeholder="请输入备注"
      />
    </div>
    <van-button type="info" style="margin-top:10px;" @click="submit" round block>提交并通知</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      studentList: [],
      fileList: [],
      showStudent: false,
      studentName: "",
      id: "",
      attendanceRemarks: "", //备注
      schoolStatus: "",
      date: new Date(),
      src1: require("../../assets/late/到校可点击.png"),
      src2: require("../../assets/late/离校点击后.png"),
      listDesc:[],
      status:"",
    }
  },
  methods: {
    onConfirmStudent(value) {
      if (value!=undefined){
        this.showStudent = false;
        this.studentName = value.text;
        this.id = value.value;
        for (let item of this.listDesc){
          if (this.id == item.id){
            if (item.status == "1"){
              this.src1 = require("../../assets/late/到校可点击.png");
            }else if(item.status == "2" || item.status == "3"){
              this.src1 = require("../../assets/late/到校点击后.png");
              this.src2 = require("../../assets/late/离校可点击.png");
            }else {
              this.src1 = require("../../assets/late/到校点击后.png");
              this.src2 = require("../../assets/late/离校点击后.png");
            }
          }
        }
      }
    },
    // 切换轮播图来 触发的下标时间
    onChange(index) {

    },
    //提交
    submit(){
      if(this.fileList.length!=0){
        let file = new FormData();
        for(let fileObj of this.fileList){
          file.append("file",fileObj.file)
        }
        this.axios.post("sys/common/uploadBatch",file).then((re)=>{
          let data = {
            status: this.status,
            id: this.id,
            attendanceFile: re.data.message,
          }
          if (this.attendanceRemarks.length!=0){
            data.attendanceRemarks = this.attendanceRemarks;
          }
          this.axios.post("vx/attendance/saveOrUpdate", data).then((res) => {
            console.log(res);
            this.$toast("操作成功");
            this.$router.go(0);
          })
        })
      }else {
        let data = {
          status: this.status,
          id: this.id,
        }
        if (this.attendanceRemarks.length!=0){
          data.attendanceRemarks = this.attendanceRemarks;
        }
        this.axios.post("vx/attendance/saveOrUpdate", data).then((res) => {
          console.log(res);
          this.$toast("操作成功");
          this.$router.go(0);
        })
      }
    },
    goSchool() {
      if (this.studentName != "") {
        this.$dialog.confirm({
          message: `是否确定 '${this.studentName}'到校`,
          confirmButtonColor: "#0B8FFF"
        }).then(() => {
          this.src1 = require("../../assets/late/到校点击后.png");
          this.status = "2";
        })
      } else {
        this.$toast("请选择到校的学生")
      }
    },
    leaveSchool() {
      if (this.studentName != "") {
        this.$dialog.confirm({
          message: `是否确定 '${this.studentName}'离校`,
          confirmButtonColor: "#0B8FFF"
        }).then(() => {
          this.src2 = require("../../assets/late/离校点击后.png");
          this.status = "0";
        })
      } else {
        this.$toast("请选择离校的学生")
      }
    }
  },
  mounted() {
    let now = new Date();
    const moment =  require("moment")
    let dueDate =  moment(now).format("YYYY-MM-DD");
    let data = {
      dueDate: dueDate,
      status: "1,2,3",
    }
    this.axios.post("vx/attendance/list", data).then((res) => {
      console.log(res);
      this.listDesc = res.data.result;
      for (let student of this.listDesc) {
        let studentObj = {text: student.student, value: student.id, status:student.status}
        this.studentList.push(studentObj)
      }
    })
   // console.log(this.studentList);
  }
    
}
</script>
<style scoped>
.date {
  color: #707070;
  margin: 15px auto;
  text-align: center;
}

.parent {
  padding: 15px 10px;
}

.student {
  display: flex;
  justify-content: space-between;
}

.student span {
  color: #707070;
  margin-bottom: 8px;
}

.parent > div {
  color: #1B8FFF;

}
.img-readonly{
  pointer-events: none;
}
</style>
