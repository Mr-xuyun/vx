<template>
  <div>
    <van-nav-bar
      title="疑难错题登记表"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <van-tabs v-model="active" swipeable color="#1B8FFFFF">
      <van-tab title="错题登记表">
        <div @click="showDate = true">
          <mt-cell title="日期" is-link>
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
          v-model="showDate"
          @confirm="onConfirm"
          color="#1B8FFFFF"
        />
        <div>
          <div style="margin-left: 8px">
            <h4>上传文件:</h4>
            <van-uploader v-model="fileList" />
          </div>

          <van-field
            v-model="text"
            label="备注"
            placeholder="请输入备注"
            input-align="right"
          />
          <div
            style="
              display: flex;
              margin-top: 15px;
              justify-content: space-around;
            "
          >
            <div class="font" @click="showStudent = true">
              <span>姓名</span>
              <img src="../../assets/down.png" alt="" />
              <div>{{ student }}</div>
            </div>
            <div class="font" @click="showSubject = true">
              <span>科目</span>
              <img src="../../assets/down.png" alt="" />
              <div>{{ subject }}</div>
            </div>
            <div class="font" @click="showTime = true">
              <span>学期段</span>
              <img src="../../assets/down.png" alt="" />
              <div>{{ time }}</div>
            </div>
            <div class="font" @click="showSection = true">
              <span>章节</span>
              <img src="../../assets/down.png" alt="" />
              <div class="section">{{ section }}</div>
            </div>
            <van-popup
              v-model="showSection"
              position="bottom"
              closeable
              :style="{ height: '20%' }"
            >
              <van-field
                v-model="section"
                label="章节"
                placeholder="请输入章节"
              />
            </van-popup>
          </div>
          <van-popup v-model="showStudent" position="bottom">
            <van-picker
              show-toolbar
              :columns="studentList"
              @confirm="onConfirmStudent"
              @cancel="showStudent = false"
            />
          </van-popup>
          <!-- 科目 -->
          <van-popup v-model="showSubject" position="bottom">
            <van-picker
              show-toolbar
              :columns="subjectList"
              @confirm="onConfirmSubject"
              @cancel="showSubject = false"
            />
          </van-popup>
          <!-- 学期段 -->
          <van-popup v-model="showTime" position="bottom">
            <van-picker
              show-toolbar
              :columns="timeList"
              @confirm="onConfirmTime"
              @cancel="showTime = false"
            />
          </van-popup>
        </div>
        <van-button
          style="margin-top: 200px"
          type="info"
          :disabled="btnShow"
          round
          block
          @click="save"
          >提交</van-button
        >
      </van-tab>
      <van-tab title="疑难登记表">
        <div @click="showDate = true">
          <mt-cell title="日期" is-link>
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
          v-model="showDate"
          @confirm="onConfirm"
          color="#1B8FFFFF"
        />
        <div>
          <div style="margin-left: 8px">
            <h4>上传文件:</h4>
            <van-uploader v-model="fileList" />
          </div>

          <van-field
            v-model="text"
            label="备注"
            placeholder="请输入备注"
            input-align="right"
          />
          <div
            style="
              display: flex;
              margin-top: 15px;
              justify-content: space-around;
            "
          >
            <div class="font" @click="showStudent = true">
              <span>姓名</span>
              <img src="../../assets/down.png" alt="" />
              <div>{{ student }}</div>
            </div>
            <div class="font" @click="showSubject = true">
              <span>科目</span>
              <img src="../../assets/down.png" alt="" />
              <div>{{ subject }}</div>
            </div>
            <div class="font" @click="showTime = true">
              <span>学期段</span>
              <img src="../../assets/down.png" alt="" />
              <div>{{ time }}</div>
            </div>
            <div class="font" @click="showSection = true">
              <span>章节</span>
              <img src="../../assets/down.png" alt="" />
              <div class="section">{{ section }}</div>
            </div>
            <van-popup
              v-model="showSection"
              position="bottom"
              closeable
              :style="{ height: '20%' }"
            >
              <van-field
                v-model="section"
                label="章节"
                placeholder="请输入章节"
              />
            </van-popup>
          </div>
          <van-popup v-model="showStudent" position="bottom">
            <van-picker
              show-toolbar
              :columns="studentList"
              @confirm="onConfirmStudent"
              @cancel="showStudent = false"
            />
          </van-popup>
          <!-- 科目 -->
          <van-popup v-model="showSubject" position="bottom">
            <van-picker
              show-toolbar
              :columns="subjectList"
              @confirm="onConfirmSubject"
              @cancel="showSubject = false"
            />
          </van-popup>
          <!-- 学期段 -->
          <van-popup v-model="showTime" position="bottom">
            <van-picker
              show-toolbar
              :columns="timeList"
              @confirm="onConfirmTime"
              @cancel="showTime = false"
            />
          </van-popup>
        </div>
        <van-button
          style="margin-top: 200px"
           :disabled="btnShow"
          type="info"
          round
          block
          @click="save"
          >提交</van-button
        >
      
      </van-tab>
    </van-tabs>
    
  </div>
</template>
<script>
const moment = require("moment")
export default {
  data() {
    return {
      active: 0,
      fileList: [],
      btnShow: false,
      showStudent: false,
      showSubject: false,
      showTime: false,
      showSection: false,
      showDate: false, //日历的显示
      studentList: [],
      subjectList: [],
      timeList: [],
      time: "",
      subject: "",
      student: "",
      text: "",
      section: "",
      date: this.$store.state.date,
      studentId: "",
    };
  },
  methods: {
    //提交
    save() {
      let fileData = new FormData();
      for (let item of this.fileList) {
        fileData.append("file", item.file);
      }
      this.axios.post("sys/common/uploadBatch", fileData).then((res) => {
        let data = {
          token:this.getLocalStorage("token"),
          studentId: this.studentId,
          student: this.student,
          subject: this.subject,
          semester: this.time,
          chapter: this.section,
          createTime: this.date,
          type: this.active+1,
          fileId: res.data.message,
          remarks: this.text,
        };
        console.log(data);
        this.$toast.loading({
            message:"提交中",
            duration:0,
          
        })
        if (!this.btnShow) {
          this.btnShow = true;
          this.axios.post("vx/difficultyAndError/save", data).then((res) => {
               console.log(res);
            if (res.data.success) {
              this.btnShow=false
              this.$toast.success('提交成功');
              this.$toast.clear();
            } else {
                this.btnShow=false
               this.$toast.fail('提交失败');
               this.$toast.clear();
            }
          });
        }
      });
    },

    onConfirmStudent(value) {
      this.student = value.text;
      this.showStudent = false;
      this.studentId = value.value;
    },
    onConfirmSubject(value) {
      this.showSubject = false;
      this.subject = value;
    },
    onConfirmTime(value) {
      this.showTime = false;
      this.time = value;
    },
    formatDate(date) {
       
      return  moment(date).format("YYYY-MM-DD")
    },
    // 日期
    onConfirm(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
    },
  },
  watch: {
    active() {
      this.studentId="" 
      this.subject = "";
      this.time = "";
      this.section = "";
      this.text = "";
      this.student="";
      this.fileList=[]
    },
  },
  created() {
    //  学生
    this.axios
      .post("vx/task/getAllReceiver", { roleList: ["学生"] })
      .then((res) => {
        // console.log(res);
        for (let student of res.data.result) {
          let studentObj = { text: student.realname, value: student.id };
          this.studentList.push(studentObj);
          //  console.log(this.studentList);
        }
      });
    //  科目
    this.axios
      .post("vx/coursePublish/findCategoryByName", { name: "科目" })
      .then((res) => {
        for (let subject of res.data.result) {
          this.subjectList.push(subject.title);
        }
      });
    //学期段
    this.axios
      .post("vx/coursePublish/findCategoryByName", { name: "学期段" })
      .then((res) => {
        for (let classGrade of res.data.result) {
          this.timeList.push(classGrade.title);
        }
      });
  },
};
</script>
<style scoped>
.font span:nth-child(1) {
  font-weight: bold;
}
.font > div {
  margin-top: 5px;
  color: #666;
  font-size: 14px;
}
.section {
  width: 64px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>