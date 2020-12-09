<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="统计项"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    >
      <template #right> </template>
    </van-nav-bar>
    <!-- 学生 -->
    <div @click="showStudent = true">
      <mt-cell title="学生" is-link>
        <img
          slot="icon"
          src="../../assets/course/学生.png"
          width="20"
          height="20"
        />
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
        <img
          slot="icon"
          src="../../assets/course/日期.png"
          width="20"
          height="20"
        />
        {{ date }}
      </mt-cell>
    </div>
    <van-calendar
      v-model="showDate"
      :min-date="minDate"
      color="#1B8FFF"
      type="range"
      @confirm="onConfirm"
    />

    <div class="listDay">
      <table style="margin: 0 auto">
        <tr class="tableStyle">
          <td>
            应出勤：<span>{{ sum }}</span>
          </td>
          <td>
            实出勤：<span>{{ actual }}</span>
          </td>
        </tr>
        <tr class="tableStyle">
          <td>
            出勤率：<span>{{ actualPercent }}</span>
          </td>
          <td>
            迟到次数：<span>{{ late }}</span>
          </td>
        </tr>
        <tr class="tableStyle">
          <td>
            共计在校时长:<span>{{ sumTime + "分钟" }}</span>
          </td>
          <td>
            平均每日时长:<span>{{ sumPer + "分钟" }}</span>
          </td>
        </tr>
      </table>
    </div>
    <div class="listDay">
      <table style="margin: 0 auto">
        <tr class="listTable">
          <td>科目</td>
          <td>答疑次数</td>
          <td>答疑老师</td>
        </tr>
        <tr class="detailsList" v-for="(item, i) of list" :key="i">
          <td>{{ item.subject }}</td>
          <td>{{ item.count }}</td>
          <td>{{ item.teacher }}</td>
        </tr>
      </table>
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
      date: "",
      minDate: new Date("2020/10/1"),
      student: "",
      showTags: false,
      showTagdate: false,
      studentId: "",
      actual: "",
      actualPercent: "",
      late: "",
      sum: "",
      sumTime: "",
      sumPer: "",
      list: [],
    };
  },
  methods: {
    onConfirmStudent(value) {
      this.showStudent = false;
      this.student = value.text;
      this.studentId = value.value;
    },
    formatDate(date) {
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.showDate = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;

      let data = {
        studentId: this.studentId,
        startDate: this.formatDate(start),
        endDate: this.formatDate(end),
      };

      if (this.studentId != "") {
        this.axios.post("vx/attendance/groupByStatus", data).then((res) => {
          if (res.data.result == null) {
            this.$toast("暂无数据");
          } else {
            this.actual = res.data.result.actual;
            //    出勤率
            this.actualPercent = res.data.result.actualPercent;
            //     迟到人数
            this.late = res.data.result.late;
            //    应出勤
            this.sum = res.data.result.sum;
            //    平均每日时长
            this.sumPer = res.data.result.sumPer;
            //总计时长
            this.sumTime = res.data.result.sumTime;

            for (let item of res.data.result.list) {
              this.list.push(item);
            }
            console.log(this.list);
          }
          //      实出勤
        });
      } else {
        this.$toast("请选择学生");
      }
    },
  },
  mounted() {
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
.listTable td {
  width: 150px;
  text-align: center;
  color: #1b8fffff;
}

.detailsList td {
  text-align: center;
  color: #707070ff;
  opacity: 0.5;
  font-size: 14px;
  padding-top: 8px;
}

.tableStyle span {
  color: #707070ff;
  font-size: 12px;
  opacity: 0.5;
}
.tableStyle td {
  font-weight: bold;
  font-size: 14px;
  padding: 5px 5px;
}
.listDay {
  margin-top: 8px;
  box-shadow: 5px 4px 7px #969799;
  border-radius: 10px;
}
</style>