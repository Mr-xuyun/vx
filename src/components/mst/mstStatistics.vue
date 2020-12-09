<template>
  <div>
    <van-nav-bar
      title="课程统计"
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

    <div class="content">
      <div class="text">
        <div class="time">课程编号02201/一对一/余丹婷/高三下</div>
        <div>
          <van-tag type="primary" style="color: #fff">历史</van-tag>
        </div>
      </div>
      <div class="txt">9月23日14：00-16：00</div>
      <div class="user">
        <div>
          <van-icon name="user-o" />
          <span> 张三 </span>
        </div>
      </div>
    </div>
    <van-calendar
      color="#1B8FFF"
      v-model="showDate"
      @confirm="onConfirmDate"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      showDate: false,
      statisticsList: [],
      minDate: new Date(2020, 9, 12),
      maxDate: new Date(2050, 9, 31),
    };
  },

  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirmDate(date) {
      this.showDate = false;
      this.date = this.formatDate(date);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>
