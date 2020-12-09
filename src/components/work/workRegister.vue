<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="作业登记表" left-text="返回" left-arrow  @click-left="$router.push('/job')">
      <template #right>
        <div style="color:#999; " @click="$router.push('/workLoginHistory')">历史登记 ></div>
      </template>
    </van-nav-bar>
    <!-- 日期 -->
    <div @click="showDate = true">
      <mt-cell title="日期" is-link>
        <img slot="icon" src="../../assets/job/日期.png" width="20" height="20"/>
        {{ date }}
      </mt-cell>
    </div>
    <van-calendar
        color="#1B8FFFFF"
        v-model="showDate"
        @confirm="onConfirmDate"
    />
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


    <!-- 附件 -->
    <div>
      <sidebar> 作业登记上传:</sidebar>
      <div>
        <van-uploader style="margin:10px 10px;" v-model="fileList" multiple/>
      </div>
      <van-button type="info" block round @click="save" :disabled="btnShow"> 提交</van-button>
    </div>
  </div>
</template>
<script>
import sidebar from "../sidebar"

export default {
  components: {sidebar},
  data() {
    return {
      showStudent: false,//
      showSubject: false,
      showDate: false,//
      studentList: [],
      subjectList: [],
      studentName: "",
      subject: "",  //科目
      date: this.$store.state.date,//日期
      studentId: "",
      fileList: [],
      btnShow: false,
      id: ""
    }
  },
  methods: {
    //  学生的弹出框
    onConfirmStudent(value) {
      this.showStudent = false;
      this.studentName = value.text
      this.studentId = value.value
    },
    // 科目
    onConfirmSubject(value) {
      this.subject = value;
      this.showSubject = false
    },
    // 日期
    formatDate(date) {
      const moment = require("moment")
      return moment(date).format("YYYY-MM-DD");
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
    },
    async save() {
      let data = {};
      if (this.subject != '' && this.date != '' && this.studentName != '' && this.fileList.length != 0) {
        let fileData = new FormData();
        if (this.fileList.length != 0) {
          for (let item of this.fileList) {
            fileData.append("file", item.file)
          }
          await this.axios.post("sys/common/uploadBatch", fileData).then(res => {
             data = {
              token: this.getLocalStorage("token"),
              student: this.studentName,
              studentId: this.studentId,
              subject: this.subject,
              fileId: res.data.message,
            }
            if (this.id != "") {
              data.id = this.id;
            }
          })
        }
      } else {
        this.$toast("以上内容不能为空")
      }
      if (!this.btnShow) {
        this.btnShow = true
        this.axios.post("vx/homework/save", data).then(res => {
          this.$toast(res.data.message)
          setTimeout(() => {
            this.btnShow = false
          }, 1000)
        })
      }
    }
  },
  mounted: function () {
    //编辑回显
    const moment  = require("moment")
    let id = this.$route.query.id;
    if (id != undefined) {
      this.id = id;
      let data = JSON.parse(sessionStorage.getItem(id));
      this.studentName = data.studentName;
      this.subject = data.subject;
      this.date = moment(data.createTime).format("YYYY-MM-DD");
      let files = data.fileId.split(",");
      for (let item of files) {
        this.fileList.push({url: this.$store.state.imgURL + item})
      }
    }

    //科目
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

  }
}
</script>

<style scoped>
.font {
  text-align: center;
}

.font span:nth-child(1) {
  font-weight: bold;
}

.font span:nth-child(3) {
  color: #666;

  font-size: 15px;
}

</style>
<style>
.van-stepper--round .van-stepper__plus {
  background-color: #1b8fff;
}

.van-stepper--round .van-stepper__minus {
  border: 1px solid #1b8fff;
  color: #1b8fff;

}

</style>
<style>

.van-field__control {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
