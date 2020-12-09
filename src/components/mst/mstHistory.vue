<template>
  <div>
    <van-nav-bar
      title="历史记录"
      left-text="返回"
      left-arrow
      @click-left="$router.go('-1')"
    />
    <!--  日期-->
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
      color="#1B8FFF"
      v-model="showDate"
      @confirm="onConfirmDate"
      :min-date="minDate"
      :max-date="maxDate"
    />
    <!--  历史记录 -->
    <div v-if="mstHistoryList.length!=0">
    <div
      class="content"
      v-for="(item, i) of mstHistoryList"
      :key="i"
      style="box-shadow: none"
    >
      <div class="text">
        <div class="time">
          课程编号{{ item.courseNumber }}/{{ item.product }}/{{
            item.student
          }}/{{ item.semester }}
        </div>
        <div>
          <van-tag type="primary" style="color: #fff">{{
            item.subject
          }}</van-tag>
        </div>
      </div>
      <div class="txt">{{ item.createDate }} 时间段:{{ item.timeRange }}</div>
      <div class="user">
        <div>
          <van-icon name="user-o" />
          <span>
            {{ item.teacher }}
            <van-tag type="primary" style="color: #fff">授新课</van-tag></span
          >
        </div>
       </div>
      </div>
    </div>
    <div v-else>
          <van-empty description="暂无历史记录"/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: this.$store.state.date,
      showDate: false,
      mstHistoryList: [],
      minDate: new Date(2020, 9, 12),
      maxDate: new Date(2050, 9, 31),
    };
  },
  methods: {
    formatDate(date) {
      const moment = require("moment")
      return  moment(date).format("YYYY-MM-DD");
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
      this.mstHistoryList =[];
      this.history();
    },
    //课程通知的历史记录
    history() {
      let data = {
        pageNo: "1",
        pageSize: "5",
        token:this.getLocalStorage("token"),
        createTime: this.date,
      };
      this.$toast.loading({
        message: "加载中...",
        duration: 0,
        closeOnClick: true,
      });
      this.axios.post("vx/classworkFinished/list", data).then((res) => {
        console.log(res);
        if (res.data.success) {
          for (let item of res.data.result.records) {
            this.mstHistoryList.push(item);
          }
          this.$toast.clear();
        } else {
          this.$toast("查询失败");
        }
        //console.log(this.mstHistoryList);
      });
    },
  },
  mounted() {
    this.history();
  },
};
</script>
<style scoped>
</style>