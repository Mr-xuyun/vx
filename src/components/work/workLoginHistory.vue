<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="历史登记"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    >
    </van-nav-bar>
    <!-- 日期 -->
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
      color="#1B8FFFFF"
      v-model="showDate"
      :min-date="new Date('2020-01-01')"
      @confirm="onConfirmDate"
    />
    <!-- 学生 -->
    <div @click="showStudent = true">
      <mt-cell title="学生" is-link>
        <img
          slot="icon"
          src="../../assets/course/学生.png"
          width="20"
          height="20"
        />
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
        <img
          slot="icon"
          src="../../assets/job/科目.png"
          width="20"
          height="20"
        />
        {{ subject }}
      </mt-cell>
    </div>
    <van-popup v-model="showSubject" position="bottom">
      <van-picker
        show-toolbar
        :columns="subjectList"
        @confirm="onConfirmSubject"
        @cancel="showSubject = false"
      />
    </van-popup>
    <div style="display: flex; margin: 10px 0px">
      <van-tag
        style="margin: 0px 15px"
        v-show="studentName"
        color="#b8b8b8ff"
        closeable
        size="large"
        @close="close(studentName)"
      >
        {{ studentName }}
      </van-tag>
      <van-tag
        v-show="subject"
        style="margin: 0px 15px"
        color="#b8b8b8ff"
        closeable
        size="large"
        @close="close(subject)"
      >
        {{ subject }}
      </van-tag>
    </div>
    <div v-if="this.homeworkList != 0">
      <div
        class="parent"
        v-for="(item, index) of this.homeworkList"
        :key="index"
      >
        <div style="display: flex; position: relative">
          <div>
            <img-preview :file="item.fileId"></img-preview>
            <div style="position: absolute; top: 0; right: 0">
              <van-tag round type="primary">{{ item.subject }}</van-tag>
            </div>
          </div>
          <div class="history">
            <div>{{ item.student }}</div>
            <div>{{ item.semester }}</div>
            <div><van-tag round type="primary">未标记</van-tag></div>
            <div>
              {{ item.createTime }}
              <span
                style="
                  position: absolute;
                  bottom: 12px;
                  right: 0;
                  color: #1b8fffff;
                  font-size: 13px;
                "
                @click="
                  edit(
                    item.id,
                    item.student,
                    item.createTime,
                    item.subject,
                    item.fileId
                  )
                "
                >修改 ></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imgPreview from "../../views/util/imgPreview";
export default {
  components: { imgPreview },
  data() {
    return {
      showStudent: false, //
      showSubject: false,
      showDate: false, //
      studentList: [],
      subjectList: [],
      studentName: "",
      subject: "", //科目
      date: this.$store.state.date, //日期
      studentId: "",
      fileList: [],
      btnShow: false,
      homeworkList: [], //历史记录
    };
  },
  methods: {
    close(value) {
      if (this.subject == value) {
        this.subject = "";
        this.history();
      } else if (this.studentName == value) {
        this.studentName = "";
        this.history();
      }
    },
    //  学生的弹出框
    onConfirmStudent(value) {
      this.showStudent = false;
      this.studentName = value.text;
      this.studentId = value.value;
      this.history(this.date, this.studentId, this.subject);
    },
    // 科目
    onConfirmSubject(value) {
      this.subject = value;
      this.showSubject = false;
      this.history(this.date, this.studentId, this.subject);
    },
    // 章节
    formatDate(date) {
      const moment = require("moment");
      return moment(date).format("YYYY-MM-DD");
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
      this.history(this.date, this.studentId, this.subject);
    },
    edit(id, studentName, createTime, subject, fileId) {
      let data = {
        id: id,
        studentName: studentName,
        createTime: createTime,
        subject: subject,
        fileId: fileId,
      };
      sessionStorage.setItem(id, JSON.stringify(data));
      this.$router.push("/workRegister?id=" + id);
    },
    history() {
      let data = {
        pageNo: "1",
        pageSize: "5",
        mark: "0",
        token: this.getLocalStorage("token"),
        type: "老师",
        createTime: this.date,
        studentId: this.studentId,
        subject: this.subject,
      };
      console.log(data);
      // 学校作业
      this.axios.post("vx/homework/list", data).then((res) => {
         console.log(res);
        this.homeworkList = [];
        for (let item of res.data.result.records) {
          this.homeworkList.push(item);
        }
      });
    },
  },
  mounted() {
    this.history(this.date, this.studentId, this.subject);
    //科目
    this.axios
      .post("vx/coursePublish/findCategoryByName", { name: "科目" })
      .then((res) => {
        for (let subject of res.data.result) {
          this.subjectList.push(subject.title);
        }
      });
    //学生
    this.axios
      .post("vx/task/getAllReceiver", { roleList: ["学生"] })
      .then((res) => {
        for (let student of res.data.result) {
          let studentObj = { text: student.realname, value: student.id };
          this.studentList.push(studentObj);
        }
      });
  },
};
</script>

<style scoped>
.history > div {
  margin: 5px 0px;
}
.history > div:nth-child(1) {
  color: #1b8fffff;
  font-size: 14px;
  font-weight: bold;
}
.history > div:nth-child(2) {
  font-size: 13px;
  color: #666;
}
.history > div:nth-child(4) {
  font-size: 13px;
  color: #c9c9c9ff;
}
.parent {
  margin-top: 10px;
  box-shadow: 1px 1px 4px #999;
  margin: 10px 8px;
  border-radius: 10px;
}
</style>
<style >
.taskImg img[data-v-cadb72f0] {
  width: 80px;
  height: 80px;
}
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
