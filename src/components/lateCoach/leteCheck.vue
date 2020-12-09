<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="出勤表查看"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    >
      <template #right> </template>
    </van-nav-bar>
    <div @click="$router.push('/lateAttendance')">
      <mt-cell title="查看" is-link> 去录入 </mt-cell>
    </div>
    <!--  日期-->
    <div @click="showDate = true">
      <mt-cell title="筛选日期区间" is-link>
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
      type="range"
      color="#1B8FFF"
      v-model="showDate"
      @confirm="onConfirmDate"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <div class="date">
      <!-- <div class="day">
        <div style=" ">
          <img
            src="../../assets/late/周一2.png"     width="40"  height="55"  />
          <div>周一</div>
          <div>10月19日</div>
        </div>
         <div style=" ">
          <img
            src="../../assets/late/周一2.png"     width="40"  height="55"  />
          <div>周一</div>
          <div>10月19日</div>
        </div>
      </div> -->
    </div>
    <!-- 筛选 -->
    <div class="saixuan">
      <div>
        <span style="color: #707070ff; font-size: 14px">筛选</span>
        <img src="../../assets/down.png" alt="" />
      </div>
      <div
        style="color: #1b8fff; font-size: 14px"
        @click="$router.push('/beLate')"
      >
        异动跟进表 >
      </div>
    </div>
    <div>
      <div class="attendance">
        <div>应出勤:{{ sum }}人</div>
        <div>实出勤:{{ count }}人</div>
      </div>
    </div>
    <div v-for="(item, i) of contentList" :key="i">
      <div class="username aa" @click="showAttendance(item)">
        <div>
          {{ item.student
          }}<span
            class="yuan"
            :style="{ backgroundColor: color(item.status) }"
          ></span>
        </div>
        <div>{{ item.dueTime }}</div>
        <div style="color: #666; font-size: 14px">
          {{ item.teacher }} <img src="../../assets/right.png" alt="" />
        </div>
      </div>

      <!-- 筛选的内容 -->
      <div
        class="all animate__animated animate__bounceInUp"
        v-show="item.id == id"
      >
        <div class="">
          <div class="parent">
            <div class="username">
              <div>学生</div>
              <div>
                {{ item.student }}
                <span
                  class="yuan"
                  :style="{ backgroundColor: color(item.status) }"
                ></span>
              </div>
            </div>
            <div class="username">
              <div>应到校时间</div>
              <div>{{ item.dueTime }}</div>
            </div>
            <div class="username">
              <div>关联老师</div>
              <div>{{ item.teacher }}</div>
            </div>
          </div>
          <!--  -->
          <div class="parent">
            <div class="username">
              <div>出勤类别</div>
              <div>{{ item.attendanceType }}</div>
            </div>
            <div class="username">
              <div>实到校时间</div>
              <div>{{ item.actualTime }}</div>
            </div>
            <div class="username">
              <div>离校时间</div>
              <div>{{ item.leaveTime }}</div>
            </div>
          </div>
          <div class="comColor" style="margin-left: 25px">
            情况说明:
            <div v-if="item.situation != null">{{ item.situation }}</div>
            <div v-else>无!!!</div>
          </div>
          <div class="comColor" style="margin-left: 25px; margin-top: 10px">
            备注:
            <div
              v-if="item.attendanceRemarks != null"
              class="attendanceRemarks"
            >
              {{ item.attendanceRemarks }}
            </div>
            <div class="attendanceRemarks">暂无备注!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDate: false,
      date: "",
      startDate: "",
      endDate: "",
      contentList: [],
      id: "-1",
      sum: 0,
      count: 0,
      minDate: new Date(2020, 9, 12),
      maxDate: new Date(2050, 9, 31),
    };
  },
  computed: {
    color() {
      return function (status) {
        switch (status) {
          case "0":
            return "gray";
          case "1":
            return "red";
          case "2":
            return "green";
          case "3":
            return "yellow";
          case "4":
            return "red";
        }
      };
    },
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirmDate(date) {
      const moment = require("moment");
      const [start, end] = date;
      this.showDate = false;
      this.date = `${moment(start).format("MM-DD")} - ${moment(end).format(
        "MM-DD"
      )}`;
      let data = {
        startDate: moment(start).format("YYYY-MM-DD"),
        endDate: moment(end).format("YYYY-MM-DD"),
      };
      this.axios.post("vx/attendance/listByCondition", data).then((res) => {
          if(res.data.result.length!=0){
              this.contentList = res.data.result;
              this.sum = res.data.result.length;
              for (let item of res.data.result) {
                if (item.status == 2 || item.status == 3) {
                  this.count++;
                }
              }
          }else{
              this.$toast("暂无数据")
          }
        
      });
    },
    showAttendance(obj) {
      if (obj.id == this.id) {
        this.id = "-1";
      } else {
        this.id = obj.id;
      }
    },
  },
  mounted() {
    const moment = require("moment");
    var now = new Date().getTime();
    let startDate = moment(now).format("YYYY-MM-DD");
    let endDate = moment(now + 1000 * 60 * 60 * 24).format("YYYY-MM-DD");
    this.date = `${moment(startDate).format("MM-DD")} - ${moment(
      endDate
    ).format("MM-DD")}`;
    let data = {
      startDate,
      endDate,
    };
    // console.log(data);
    this.axios.post("vx/attendance/listByCondition", data).then((res) => {
        if(res.data.result.length!=0){
              this.contentList = res.data.result;
              this.sum = res.data.result.length;
              for (let item of res.data.result) {
                if (item.status == 2 || item.status == 3) {
                  this.count++;
                }
              }
          }else{
              this.$toast("暂无数据")
          }
    });
  },
};
</script>
<style scoped>
.attendanceRemarks {
  margin-bottom: 10px;
}
.aa {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  border: 1px solid #f2f2f2ff;
}

.comColor > div {
  color: #707070ff;
  background-color: #f1f1f1ff;
  padding: 5px 0px;
  width: 250px;
  border-radius: 5px;
}

/* 出勤的人数 */
.attendance {
  display: flex;
  color: #c7c7ccff;
  justify-content: space-around;
  font-size: 14px;
  margin-top: 15px;
}
.all {
  border-radius: 15px;
  border: 10px solid #f2f2f2ff;
  margin-top: 15px;
}

.day {
  display: flex;
  justify-content: space-around;
}
.day div {
  color: #1b8fff;
  font-size: 10px;
  text-align: center;
}
.day div:nth-child(3) {
  opacity: 0.5;
}
.saixuan {
  display: flex;
  justify-content: space-between;

  margin-top: 15px;
  padding: 0px 10px;
}
.parent {
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin: 15px 15px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
}
.username div:nth-child(1) {
  font-size: 14px;
  margin: 5px 5px;
  color: #1b8fff;
}
.username div:nth-child(2) {
  font-size: 12px;
  margin: 5px 5px;
  color: #707070ff;
}
.yuan {
  display: inline-block;
  margin-left: 5px;
  width: 8px;
  height: 8px;
  background-color: chocolate;
  border-radius: 50%;
}
</style>